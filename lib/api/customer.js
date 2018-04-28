const schema = require('../schema');

module.exports = {

  /**
   * Create a customer profile
   * @param {AddCustomer} customer customer object
   */
  create: function(customer) {
    return this.request({'add-customer': customer});
  },

  /**
   * Update a customer profile
   * @param {string} customerVaultId customer vault id
   * @param {UpdateCustomer} customer customer object
   */
  update: function(customerVaultId, customer) {
    customer.customerVaultId = customerVaultId;
    return this.request({'update-customer': customer});
  },

  /**
   * Execture a customer given a token
   * @param {string} token subscription token
   * @returns {ExecuteCustomerResponse}
   */
  execute: function(token) {
    return this.request({'complete-action': {
      tokenId: token
    }});
  },

  /**
   * Add billing to a customer profile
   * @param {string} customerId   customer vault id
   * @param {string} returnUrl    return url
   * @param {Billing} billing     Billing schema
   */
  addBilling: function(customerId, returnUrl, billing) {
    return this.request({'add-billing': {
      customerVaultId: customerId,
      returnUrl: returnUrl,
      billing: billing
    }});
  },
  
  /**
   * Update billing for a customer profile
   * @param {string} customerId   customer vault id
   * @param {Billing} billing     Billing schema
   */
  updateBilling: function(customerId, billing) {
    return this.request({'update-billing': {
      customerVaultId: customerId,
      billing: billing
    }});
  },

  /**
   * Delete billing for a customer profile
   * @param {string} customerId   customer vault id
   * @param {string} billingId    billing id
   */
  deleteBilling: function(customerId, billingId) {
    return this.request({'delete-billing': {
      customerVaultId: customerId,
      billing: {
        billingId: billingId
      }
    }});
  },

  /**
   * Delete a customer profile
   * @param {string} customerId customer vault id
   */
  delete: function(customerId) {
    return this.request({'delete-customer': {
      customerVaultId: customerId
    }});
  }

};