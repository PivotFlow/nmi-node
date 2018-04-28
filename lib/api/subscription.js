const schema = require('../schema');

module.exports = {

  /**
   * Create a subscription
   * @name subscription.create
   * @param {AddSubscription} subscription subscription object
   * @returns {CreateSubscriptionResponse}
   */
  create: function(subscription) {
    return this.request({'add-subscription': subscription});
  },

  /**
   * Update a subscription
   * @name subscription.update
   * @param {UpdateSubscription} subscription  UpdateSubscription schema
   */
  update: function(subscription) {
    return this.request({'update-subscription': subscription});
  },

  /**
   * Execture a subscription given a token
   * @name subscription.execute
   * @param {string} token subscription token
   * @returns {ExecuteSubscriptionResponse}
   */
  execute: function(token) {
    return this.request({'complete-action': {
      tokenId: token
    }});
  },

  /**
   * Delete a subscription, customer will no longer be charged
   * @name subscription.delete
   * @param {string} subscriptionId subscription id
   */
  delete: function(subscriptionId) {
    return this.request({'delete-subscription': {
      subscriptionId: subscriptionId
    }});
  }

};