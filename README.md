Node SDK for Networking Merchants Inc's (NMI) Three Step Redirect API

# Installation
```
npm install nmi-node
```

# Notes

For specific guidelines, see [NMI's Three Step Redirect API docs](https://secure.networkmerchants.com/gw/merchants/resources/integration/integration_portal.php#3step_methodology). 

This library will convert `camelCase` to `hypen-case` when submitting contents to NMI. 

XML will be generated using [xmlbuilder](https://github.com/oozcitak/xmlbuilder-js/wiki/Conversion-From-Object).

# Usage
```
const NMI = require('nmi-node');

NMI.configure({
  apiKey: 'your-key-here',

  // only required for query
  username: 'your-username',
  password: 'your-password'

});

// create a sale
NMI.transaction.create('sale', {
  amount: 2.99,
  redirectUrl: 'http://127.0.0.1/example',
  billing: {
    firstName: 'John',
    lastName: 'Doe'
  },
}).then((res) => {
  // ...
});

// execute a token
NMI.transaction.execute('the-transaction-token').then((res) => {
  // ...
});

```

