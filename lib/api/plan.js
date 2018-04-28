module.exports = {

  /**
   * Create a plan
   * @param {AddPlan} plan plan object
   */
  create: function(plan) {
    return this.request({'add-plan': plan});
  }
  
};