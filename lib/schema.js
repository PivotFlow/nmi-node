/**
 * @typedef {Object} AddBilling
 * @property {Billing} billing
 * @property {string} redirectUrl
 * @property {string} customerVaultId
 */

/**
 * @typedef {Object} AddCustomer
 * @property {Billing} billing
 * @property {Shipping} shipping
 * @property {string} redirectUrl
 * @property {string} customerVaultId
 * @property {string} sourceTransactionId
 */

/**
 * @typedef {Object} AddPlan
 * @property {string} name
 * @property {string} planId
 * @property {string} payments
 * @property {string} amount
 * @property {string} dayFrequency
 * @property {string} monthFrequency
 * @property {string} dayOfMonth
 */

/**
 * @typedef {Object} AddSubscription
 * @property {Billing} billing
 * @property {Shipping} shipping
 * @property {string} customerVaultId        customer vault id
 * @property {string} startDate              "YYYYMMDD format
 * @property {string} amount                 charge amount
 * @property {string} orderId
 * @property {string} poNumber
 * @property {string} orderDescription
 * @property {string} currency
 * @property {string} taxAmount
 * @property {string} shippingAmount
 * @property {string} sourceTransactionId
 * 

 */

/**
 * @typedef {Object} Billing
 * @property {string} billingId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} state
 * @property {string} postal
 * @property {string} country
 * @property {string} phone
 * @property {string} email
 * @property {string} company
 * @property {string} fax
 * @property {string} accountType
 * @property {string} entityType
 *
 */

/**
 * @typedef {Object} BillingExtended
 * @property {string} billingId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} address1
 * @property {string} address2
 * @property {string} city
 * @property {string} state
 * @property {string} postal
 * @property {string} country
 * @property {string} phone
 * @property {string} email
 * @property {string} company
 * @property {string} fax
 * @property {string} accountType
 * @property {string} entityType
 * @property {string} socialSecurityNumber
 * @property {string} driversLicenseNumber
 * @property {string} driversLicenseDob
 * @property {string} driversLicenseState
 * @property {string} ccNumber
 * @property {string} ccExp
 * @property {string} accountName
 * @property {string} accountNumber
 * @property {string} routingNumber
 * @property {string} accountType
 * @property {string} entityType
 * @property {string} priority
 */

/**
 * @typedef {Object} CaptureTransaction
 * @property {string} transactionId
 * @property {string} amount
 * @property {string} trackingNumber
 * @property {string} shippingCarrier
 * @property {string} orderId
 * @property {string} signatureImage
 */

/**
 * @typedef {Object} CompleteAction
 * @property {string} tokenId
 */

/**
 * @typedef {Object} DeleteBilling
 * @property {string} customerVaultId
 */

/**
 * @typedef {Object} DeleteCustomer
 * @property {string} customerVaultId
 */

/**
 * @typedef {Object} DeleteSubscription
 * @property {string} subscriptionId
 */

/**
 * @typedef {Object} CompletePartialPayment
 * @property {string} partialPaymentId
 */

/**
 * @typedef {Object} Plan
 * @property {string} planId           existing plan id, omit for new plans
 * @property {string} payments         number of payments until completed (0 for unlimited)
 * @property {string} amount           amount to be charged
 * @property {string} dayFrequency     how often, in days, to bill customer
 * @property {string} monthFrequency   how often, in months, to bill customer (1-24)
 * @property {string} dayOfMonth       day of month to bill customer (1-31)
 */

/**
 * @typedef {Object} Product
 * @property {string} productCode
 * @property {string} description
 * @property {string} commodityCode
 * @property {string} unitOfMeasure
 * @property {string} unitCost
 * @property {string} quantity
 * @property {string} totalAmount
 * @property {string} taxAmount
 * @property {string} taxRate
 * @property {string} discountAmount
 * @property {string} discountRate
 * @property {string} taxType
 * @property {string} alternateTaxId
 */

/**
 * @typedef {Object} RefundTransaction
 * @property {string} transactionId
 * @property {string} amount
 */

/**
 * @typedef {Object} Shipping
 * @property {string} shippingId
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} address1
 * @property {string} city
 * @property {string} state
 * @property {string} postal
 * @property {string} country
 * @property {string} phone
 * @property {string} email
 * @property {string} company
 * @property {string} address2
 * @property {string} fax
 */

/**
 * @typedef {Object} Transaction
 * @property {string} redirectUrl
 * @property {string} amount
 * @property {string} surchargeAmount
 * @property {string} authorizationCode
 * @property {string} ipAddress
 * @property {string} industry
 * @property {string} billingMethod
 * @property {string} billingNumber
 * @property {string} billingTotal
 * @property {string} processorId
 * @property {string} secCode
 * @property {string} descriptor
 * @property {string} descriptorPhone
 * @property {string} descriptorAddress
 * @property {string} descriptorCity
 * @property {string} descriptorState
 * @property {string} descriptorPostal
 * @property {string} descriptorCountry
 * @property {string} descriptorMcc
 * @property {string} descriptorMerchantId
 * @property {string} descriptorUrl
 * @property {string} currency
 * @property {string} orderDescription
 * @property {string} customerId
 * @property {string} customerVaultId
 * @property {string} merchantReceiptEmail
 * @property {string} customerReceipt
 * @property {string} trackingNumber
 * @property {string} shippingCarrier
 * @property {string} orderId
 * @property {string} signatureImage
 * @property {string} poNumber
 * @property {string} taxAmount
 * @property {string} shippingAmount
 * @property {string} shipFromPostal
 * @property {string} summaryCommodityCode
 * @property {string} dutyAmount
 * @property {string} discountAmount
 * @property {string} nationalTaxAmount
 * @property {string} alternateTaxAmount
 * @property {string} alternateTaxId
 * @property {string} vatTaxAmount
 * @property {string} vatTaxRate
 * @property {string} vatInvoiceReferenceNumber
 * @property {string} customerVatRegistration
 * @property {string} merchantVatRegistration
 * @property {string} orderDate
 * @property {string} cardholderAuth
 * @property {string} eci
 * @property {string} cavv
 * @property {string} xid
 * @property {Billing} billing
 */

/**
 * @typedef {Object} UpdateBilling
 * @property {string} redirectUrl
 * @property {string} customerVaultId
 * @property {Billing} billing
 */

/**
 * @typedef {Object} UpdateCustomer
 * @property {string} redirectUrl
 * @property {string} customerVaultId
 * @property {string} sourceTransactionId
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} UpdateSubscription
 * @property {string} redirectUrl
 * @property {string} subscriptionId
 * @property {string} customerVaultId
 * @property {string} startDate  YYYYMMDD
 * @property {string} orderId
 * @property {string} poNumber
 * @property {string} orderDescription
 * @property {string} currency
 * @property {string} taxAmount
 * @property {string} shippingAmount
 * @property {string} sourceTransactionId
 */

/**
 * @typedef {Object} UpdateTransaction
 * @property {string} transactionId
 * @property {string} trackingNumber
 * @property {string} shippingCarrier
 * @property {string} orderId
 * @property {string} signatureImage
 */

/**
 * @typedef {Object} VoidTransaction
 * @property {string} transactionId
 */

 /**
 * @typedef {Object} Query
 * @property {string} username                   account username
 * @property {string} password                   account password
 * @property {string} startDate                  YYYYMMDDhhmmss
 * @property {string} endDate                    YYYYMMDDhhmmss
 * @property {string} reportType                 'receipt', 'customer_vault', 'recurring', 'gateway_processors', 'account_updater'
 * @property {string} mobileDeviceLicense        a license id or 'any_mobile'
 * @property {string} mobildeDeviceNickname      device nickname
 * @property {string} customerVaultId            customer vault id, only used for `reportType`='customer_vault'
 * @property {string} dateSearch                 'created', 'updated' or 'created,updated', used for customer_vault
 * @property {string} resultLimit                limit
 * @property {string} pageNumber                 page  
 */

/**
 * @typedef {Object} CreateTransactionResponse
 * @property {string} result
 * @property {string} resultText
 * @property {string} transactionId
 * @property {string} resultCode
 * @property {string} formUrl
 */

 /**
 * @typedef {Object} ExecuteTransactionResponse
 * @property {string} result
 * @property {string} resultText
 * @property {string} transactionId
 * @property {string} resultCode
 * @property {string} authorizationCode
 * @property {string} avsResult
 * @property {string} cvvResult
 * @property {string} actionType
 * @property {string} amount
 * @property {string} amountAuthorized
 * @property {string} ipAddress
 * @property {string} industry
 * @property {string} billingMethod
 * @property {string} processorId
 * @property {string} secCode
 * @property {string} descriptor
 * @property {string} descriptorPhone
 * @property {string} descriptorAddress
 * @property {string} descriptorCity
 * @property {string} descriptorState
 * @property {string} descriptorPostal
 * @property {string} descriptorCountry
 * @property {string} descriptorMcc
 * @property {string} descriptorMerchantId
 * @property {string} descriptorUrl
 * @property {string} currency
 * @property {string} orderDescription
 * @property {string} customerId
 * @property {string} customerVaultId
 * @property {string} merchantReceiptEmail
 * @property {string} customerReceipt
 * @property {string} partialPaymentBalance
 * @property {string} partialPaymentId
 * @property {string} trackingNumber
 * @property {string} shippingCarrier
 * @property {string} orderId
 * @property {string} poNumber
 * @property {string} taxAmount
 * @property {string} shippingAmount
 * @property {string} shipFromPostal
 * @property {string} summaryCommodityCode
 * @property {string} dutyAmount
 * @property {string} discountAmount
 * @property {string} nationalTaxAmount
 * @property {string} alternateTaxAmount
 * @property {string} alternateTaxId
 * @property {string} vatTaxAmount
 * @property {string} vatTaxRate
 * @property {string} vatInvoiceReferenceNumber
 * @property {string} customerVatRegistration
 * @property {string} merchantVatRegistration
 * @property {string} orderDate
 * @property {string} cardholderAuth
 * @property {string} eci
 * @property {string} cavv
 * @property {string} xid
 * @property {string} dupSeconds
 * @property {string} avsReject
 * @property {string} cvvReject
 * 
 * @property {Billing} billing
 * @property {Shipping} shipping
 * @property {Product[]} product
 */

/**
 * @typedef {Object} CreateSubscriptionResponse
 * @property {string} result
 * @property {string} resultText
 * @property {string} subscriptionId
 * @property {string} resultCode
 * @property {string} formUrl
 */

/**
 * @typedef {Object} ExecuteSubscriptionResponse
 * @property {string} result
 * @property {string} resultText
 * @property {string} resultCode
 * @property {string} actionType
 * @property {string} subscriptionId
 * 
 * @property {Plan} plan
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} ExecuteCustomerResponse
 * @property {string} result
 * @property {string} resultText
 * @property {string} resultCode
 * @property {string} actionType
 * @property {string} customerVaultId
 * 
 * @property {BillingExtended} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} GetTransaction
 */

/**
 * @typedef {Object} GetCustomer
 */

 /**
 * @typedef {Object} GetSubscription
 */