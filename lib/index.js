const xmlbuilder = require('xmlbuilder');
const xml2json = require('xml2json');
const request = require('request-promise');

const API = require('./api');
require('./schema');

const urlRequest = 'https://secure.networkmerchants.com/api/v2/three-step';
const urlQuery = 'https://secure.networkmerchants.com/api/query.php';

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
   * Configure NMI client
   * @name configure
   * @param {Object} options 
   * @param {string} options.apiKey       api key
   * @param {string} options.username     username
   * @param {string} options.password     password
   * @param {string} options.currency     default currency
   */
  configure(options) {
    this.config = {
      apiKey: options.apiKey || '',
      username: options.username || '',
      password: options.password || '',
      currency: options.currency || 'USD'
    };
  }

  /**
   * Hyphenize camelCase
   * @private
   * @param {*} str 
   */
  uglify(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  }

  /**
   * Camelize an ugly hypen string
   * @private
   * @param {*} str 
   */
  deuglify(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  /**
   * Make all the keys in an object less ugly
   * @private
   * @param {*} obj 
   */
  deuglifyObject(obj) {
    
    // objects
    if(typeof obj === 'object') {
      let newKey, tmp = {};
      Object.keys(obj).forEach((key) => {
        newKey = this.deuglify(key);
        tmp[newKey] = this.deuglifyObject(obj[key]);
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
  toXML(json, pretty = true, uglify = true) {
    return xmlbuilder.create(json, {
      stringify: {
        eleName: (str) => {
          return uglify ? this.uglify(str) : str;
        }
      }
    }).end({pretty: pretty});
  }

  /**
   * Parse XML to JSON
   * @private
   * @param {*} xml 
   */
  parseXML(xml, deuglify = true) {
    let jsn = xml2json.toJson(xml, {
      object: true
    });
    if(deuglify) {
      jsn = this.deuglifyObject(jsn);
    }
    return jsn;
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
    }).then(function(res) {
      return this.parseXML(res);
    });
  }

}

module.exports = new NMI();