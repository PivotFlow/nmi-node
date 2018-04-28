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
   * @param {*} str 
   */
  uglify(str) {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
  }

  /**
   * Camelize an ugly hypen string
   * @param {*} str 
   */
  deuglify(str) {
    return str.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
  }

  /**
   * Make all the keys in an object less ugly
   * @param {*} obj 
   */
  deuglifyObject(obj) {
    let newKey;
    Object.keys(obj).forEach((key) => {
      newKey = this.deuglify(key);

      // arrays
      if(Array.isArray(obj[key])) {
        if(key !== newKey) obj[newKey] = [];
        for(var i=0; i < obj[key].length; i++) {
          obj[newKey][i] = this.deuglifyObject(obj[key][i]);
        }
      } else if (typeof obj[key] === 'object') {
        obj[newKey] = this.deuglifyObject(obj[key]);
      } else {
        obj[newKey] = obj[key];
      }

      if(newKey !== key)  {
        delete obj[key];
      }

    });
    return obj;
  }

  /**
   * Convert json object to XML
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