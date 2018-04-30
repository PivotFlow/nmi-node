const NMI = require('./nmi');

(async() => {

  // step 1
  let res = await NMI.transaction.create('sale', {
    amount: 9.97,
    redirectUrl: 'http://127.0.0.1/'
  });
  console.log(res);

  // step 2
  // client-side

  // step 3
  let token = 'transaction-token';
  let payment = await NMI.transaction.execute(token);
  console.log(payment);

})().catch((err) => {
  console.error(err);
});