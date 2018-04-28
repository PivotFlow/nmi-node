const schema = require('../schema');

module.exports = {

  /**
   * Create a transaction
   * @param {string} type             type of 'sale', 'auth', 'credit', 'validate', or 'offline'
   * @param {Transaction} transaction transaction object
   * @returns {CreateTransactionResponse}
   */
  create: function(type, transaction) {
    return this.request({[type]: transaction});
  },

  /**
   * Capture a transaction
   * @param {CaptureTransaction} capture capture object
   */
  capture: function(capture) {
    return this.request({'capture': capture});
  },

  /**
   * Update a transaction
   * @param {UpdateTransaction} update update object
   */
  update: function(update) {
    return this.request({'update': update});
  },

  /**
   * Execture a transaction given a token
   * @param {string} token transaction token
   * @returns {ExecuteTransactionResponse}
   */
  execute: function(token) {
    return this.request({'complete-action': {
      tokenId: token
    }});
  },

  /**
   * Void a transaction
   * @param {string} transactionId transaction id
   */
  void: function(transactionId) {
    return this.request({'void': {
      transactionId: transactionId
    }});
  },

  /**
   * Refund a transaction
   * @param {string} transactionId  transaction id
   * @param {string|number?} amount amount to be refunded, omit for a full refund
   */
  refund: function(transactionId, amount = false) {
    if(typeof amount === 'string') amount = parseFloat(amount);
    return this.request({'refund': {
      transactionId: transactionId,
      amount: amount ? amount.toFixed(2) : '0.00'
    }});
  },

  /**
   * Complete a partial payment
   * @param {string} partialPaymentId   partial payment id
   */
  completePartialPayment: function(partialPaymentId) {
    return this.request({'complete-partial-payment': {
      partialPaymentId: partialPaymentId
    }});
  }
  
};