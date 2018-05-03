const changeCase = require('change-case');
const xmlbuilder = require('xmlbuilder');
const xml2json = require('xml2json');
const request = require('request-promise');

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
   * @param {bool}   options.transform    disable key transformations
   * @param {string} options.currency     default currency (default USD)
   */
  configure(options) {
    this.config = {
      apiKey: options.apiKey || '',
      username: options.username || '',
      password: options.password || '',
      currency: options.currency || 'USD',
      transform: options.transform !== false
    };
  }

  /**
   * Make all the keys in an object less ugly
   * @private
   * @param {*} obj 
   */
  deuglifyObject(obj, transform = true) {
    
    // objects
    if(typeof obj === 'object') {
      let newKey, tmp = {};

      // objects without keys are null
      if(Object.keys(obj).length === 0) {
        return null;
      }

      // deuglify child keys
      Object.keys(obj).forEach((key) => {

        // transform key name
        if(this.config.transform) {
          newKey = changeCase.camel(key);
        } else {
          newKey = key;
        }

        // deuglify children
        tmp[newKey] = this.deuglifyObject(obj[key]);

        // clone some keys to improve consistency
        if(this.config.transform && cloneKeys[key]) {
          tmp[cloneKeys[key]] = tmp[newKey];
        }

      });

      return tmp;

    // arrays
    } else if(Array.isArray(obj)) {
      let tmp = [];
      for(var i=0; i < obj.length; i++) {
        tmp[i] = this.deuglifyObject(obj[i]);
      }
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
    let jsn = xml2json.toJson(xml, {
      object: true
    });

    // make it pretty
    return this.deuglifyObject(jsn);
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
    }).then((res) => {
      res = this.parseXML(res);
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