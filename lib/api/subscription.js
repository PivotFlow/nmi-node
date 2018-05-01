const schema = require('../schema');

module.exports = {

  /**
   * Get a subscription
   * Returns null if subscription is not found
   * 
   * @name subscription.get
   * @param {string} subscriptionId
   * @returns {GetSubscription}
   */
  get: async function(subscriptionId) {
    let res = await this.query({
      subscription_id: subscriptionId,
      report_type: 'recurring',
      result_limit: 1
    });
    return this.getChild(res, 'nm_response.subscription');
  },

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