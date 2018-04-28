const NMI = require('./nmi');

NMI.subscription.create({
  redirectUrl: 'http://127.0.0.1/',
  plan: {
    payments: 0,
    amount: 5.99,
    dayFrequency: 30
  }
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});