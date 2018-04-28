const NMI = require('./nmi');

NMI.customer.create({
  redirectUrl: 'http://127.0.0.1/',
  billing: {
    firstName: 'some',
    lastName: 'guy'
  }
}).then((res) => {
  console.log(res);
}).catch((err) => {
  console.error(err);
});