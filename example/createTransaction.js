const NMI = require('./nmi');

NMI.transaction.create('sale', {
  amount: 9.97,
  redirectUrl: 'http://127.0.0.1/'
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});