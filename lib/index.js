const changeCase = require('change-case');
const xmlbuilder = require('xmlbuilder');
const request = require('request-promise');
const xmlParseString = require('xml2js').parseString;

const API = require('./api');
require('./schema');

const urlRequest = 'https://secure.networkmerchants.com/api/v2/three-step';
const urlQuery = 'https://secure.networkmerchants.com/api/query.php';

const cloneKeys = {
  'orderid': 'order_id',
  'postal_code': 'postal',
  'address_1': 'address1',
  'address_2': 'address2',
};

class NMI {

  constructor() {
    this.customer = API.Customer;
    this.plan = API.Plan;
    this.transaction = API.Transaction;
    this.subscription = API.Subscription;

    // bind `this` context
    ['transaction', 'subscription', 'customer', 'plan'].forEach((cat) => {
      Object.keys(this[cat]).forEach((key) => {
        this[cat][key] = this[cat][key].bind(this);
      });
    });

  }

  /**
   * Check an object has a child given object path
   * Keys will be transformed!
   * 
   * @param {object} obj              object to search
   * @param {string|array} keys       string or array of keys
   * @param {bool} overrideTransform  overrides transform config
   */
  getChild(obj, keys, overrideTransform = null) {
    let key;

    // split dots if string
    if(typeof keys === 'string') {
      keys = keys.split('.');
    }

    // loop keys
    for(var i=0; i < keys.length; i++) {
      key = keys[i];

      // transform key
      if(overrideTransform || (overrideTransform === null && this.config.transform)) {
        key = changeCase.camel(key);
      }

      // step or terminate
      if(obj[key]) {
        obj = obj[key];
      } else {
        return null;
      }

    }

    return obj;
  }

  /**
   * Configure NMI client
   * @name configure
   * @param {Object} options 
   * @param {string} options.apiKey       api key
   * @param {string} options.username     username
   * @param {string} options.password     password
   * @param {bool}   options.transform    disable transformations
   * @param {bool}   options.debug        output verbose debug information
   */
  configure(options) {
    this.config = {
      apiKey: options.apiKey || '',
      username: options.username || '',
      password: options.password || '',
      transform: options.transform !== false,
      debug: options.debug || false
    };
  }

  /**
   * Transform json input (before XML builder)
   * @param {*} obj 
   */
  transformJson(obj, key = null) {

    if(!this.config.transform) {
      return obj;
    }

    if(obj !== null && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        if(key === 'merchantDefinedField') {
          let mdf = obj[key];
          delete obj[key];
          Object.keys(mdf).forEach((mkey) => {
            obj['merchant-defined-field-' + mkey] = mdf[mkey];
          });
        } else {
          obj[key] = this.transformJson(obj[key], key);
        }
      });
    }

    return obj;

  }

  /**
   * Make all the keys in an object less ugly
   * @private
   * @param {*} obj 
   */
  deuglifyObject(obj, oKey = null, nKey = null) {

    // null
    if(obj === null) return null;

    // handle merchant defined values (for Query)
    if(nKey === 'merchantDefinedField' && this.config.transform) {
      if(!Array.isArray(obj)) {
        obj = [obj];
      }
      let mdf = {};
      for(var k=0; k < obj.length; k++) {
        if(obj[k]['$'] && obj[k]['$']['id'] && obj[k]['_']) {
          mdf[obj[k]['$']['id']] = obj[k]['_'];
        }
      }
      return mdf;

    // arrays first (arrays are objects too)
    } else if(Array.isArray(obj)) {
      let tmp = [];
      for(var i=0; i < obj.length; i++) {
        tmp[i] = this.deuglifyObject(obj[i]);
      }
      return tmp;

    // objects
    } else if(typeof obj === 'object') {
      let newKey, tmp = {};

      // objects without keys are null
      if(Object.keys(obj).length === 0) {
        return null;
      }

      // deuglify child keys
      Object.keys(obj).forEach((key) => {

        // transform key name (protect attributes)
        if(this.config.transform && key !== '$') {
          newKey = changeCase.camel(key);
        } else {
          newKey = key;
        }

        // deuglify children
        tmp[newKey] = this.deuglifyObject(obj[key], key, newKey);

        // clone some keys to improve consistency
        if(this.config.transform) {

          if(cloneKeys[key]) {
            tmp[cloneKeys[key]] = tmp[newKey];
          }

          // map merchant fields into one object
          if(newKey.indexOf('merchantDefinedField_') === 0) {
            let mid = newKey.substr(21);
            if(typeof tmp['merchantDefinedField'] === 'undefined') {
              tmp['merchantDefinedField'] = {};
            }
            tmp['merchantDefinedField'][mid] = tmp[newKey];
            delete tmp[newKey];
          }

        }



      });

      return tmp;

    // exit (strings, numbers, bools, etc)
    } else {
      return obj;
    }

  }

  /**
   * Convert json object to XML
   * @private
   * @param {*} json 
   */
  toXML(json, pretty = true) {

    // pre-xml transformation
    json = this.transformJson(json);

    return xmlbuilder.create(json, {
      stringify: {
        eleName: (key) => {
          if(this.config.transform) {
            return changeCase.param(key);
          } else {
            return key;
          }
        }
      }
    }).end({pretty: pretty});
  }

  /**
   * Parse XML to JSON
   * @private
   * @param {*} xml 
   */
  parseXML(xml) {
    let self = this;
    return new Promise(function(resolve, reject) {
      xmlParseString(xml, {
        emptyTag: null,
        explicitArray: false,
        async: true
      }, function(err, json) {
        if(err) {
          reject(err);
        } else {
          json = self.deuglifyObject(json);
          resolve(json);
        }
      });
    });
  }

  /**
   * Perform a request.
   * @name request
   * @param {*} body as json
   */
  request(body = {}) {

    // attach keys to root element
    let rootKey = Object.keys(body)[0];
    body[rootKey].apiKey = body[rootKey].apiKey || this.config.apiKey;

    // to xml
    body = this.toXML(body);

    // request
    return request({
      method: 'POST',
      url: urlRequest,
      strictSSL: true,
      body: body,
      headers: {
        'content-type': 'text/xml'
      }
    }).then((body) => {
      return this.parseXML(body);
    }).then((res) => {
      if(res.response) {
        if(res.response.result) res.response.result = parseInt(res.response.result);
        if(res.response.resultCode) res.response.resultCode = parseInt(res.response.resultCode);
        if(res.response.amount) res.response.amount = parseFloat(res.response.amount);
      }
      if(res.response.result && res.response.result !== 1) {
        res.isNMI = true;
        throw res;
      } else {
        return res;
      }
    });
  }

  /**
   * Query for data
   * @name query
   * @param {Query} qs query string
   */
  query(qs = {}) {
    qs.username = qs.username || this.config.username;
    qs.password = qs.password || this.config.password;
    return request({
      method: 'GET',
      url: urlQuery,
      qs: qs,
      strictSSL: true
    }).then((res) => {
      return this.parseXML(res);
    });
  }

}

module.exports = new NMI();