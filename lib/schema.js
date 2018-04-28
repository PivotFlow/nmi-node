/**
 * @typedef {Object} AddBilling
 * @property {*} redirectUrl
 * @property {*} customerVaultId
 * 
 * @property {Billing} billing
 */

/**
 * @typedef {Object} AddCustomer
 * @property {*} redirectUrl
 * @property {*} customerVaultId
 * @property {*} sourceTransactionId
 * 
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} AddPlan
 * @property {*} name
 * @property {*} planId
 * @property {*} payments
 * @property {*} amount
 * @property {*} dayFrequency
 * @property {*} monthFrequency
 * @property {*} dayOfMonth
 */

/**
 * @typedef {Object} AddSubscription
 * @property {*} customerVaultId        customer vault id
 * @property {*} startDate              YYYYMMDD format
 * @property {*} amount                 charge amount
 * @property {*} orderId
 * @property {*} poNumber
 * @property {*} orderDescription
 * @property {*} currency
 * @property {*} taxAmount
 * @property {*} shippingAmount
 * @property {*} sourceTransactionId
 * 
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} Billing
 * @property {*} billingId
 * @property {*} firstName
 * @property {*} lastName
 * @property {*} address1
 * @property {*} address2
 * @property {*} city
 * @property {*} state
 * @property {*} postal
 * @property {*} country
 * @property {*} phone
 * @property {*} email
 * @property {*} company
 * @property {*} fax
 * @property {*} accountType
 * @property {*} entityType
 *
 */

/**
 * @typedef {Object} BillingExtended
 * @property {*} billingId
 * @property {*} firstName
 * @property {*} lastName
 * @property {*} address1
 * @property {*} address2
 * @property {*} city
 * @property {*} state
 * @property {*} postal
 * @property {*} country
 * @property {*} phone
 * @property {*} email
 * @property {*} company
 * @property {*} fax
 * @property {*} accountType
 * @property {*} entityType
 * @property {*} socialSecurityNumber
 * @property {*} driversLicenseNumber
 * @property {*} driversLicenseDob
 * @property {*} driversLicenseState
 * @property {*} ccNumber
 * @property {*} ccExp
 * @property {*} accountName
 * @property {*} accountNumber
 * @property {*} routingNumber
 * @property {*} accountType
 * @property {*} entityType
 * @property {*} priority
 */

/**
 * @typedef {Object} CaptureTransaction
 * @property {*} transactionId
 * @property {*} amount
 * @property {*} trackingNumber
 * @property {*} shippingCarrier
 * @property {*} orderId
 * @property {*} signatureImage
 */

/**
 * @typedef {Object} CompleteAction
 * @property {*} tokenId
 */

/**
 * @typedef {Object} DeleteBilling
 * @property {*} customerVaultId
 */

/**
 * @typedef {Object} DeleteCustomer
 * @property {*} customerVaultId
 */

/**
 * @typedef {Object} DeleteSubscription
 * @property {*} subscriptionId
 */

/**
 * @typedef {Object} CompletePartialPayment
 * @property {*} partialPaymentId
 */

/**
 * @typedef {Object} Plan
 * @property {*} planId           existing plan id, omit for new plans
 * @property {*} payments         number of payments until completed (0 for unlimited)
 * @property {*} amount           amount to be charged
 * @property {*} dayFrequency     how often, in days, to bill customer
 * @property {*} monthFrequency   how often, in months, to bill customer (1-24)
 * @property {*} dayOfMonth       day of month to bill customer (1-31)
 */

/**
 * @typedef {Object} Product
 * @property {*} productCode
 * @property {*} description
 * @property {*} commodityCode
 * @property {*} unitOfMeasure
 * @property {*} unitCost
 * @property {*} quantity
 * @property {*} totalAmount
 * @property {*} taxAmount
 * @property {*} taxRate
 * @property {*} discountAmount
 * @property {*} discountRate
 * @property {*} taxType
 * @property {*} alternateTaxId
 */

/**
 * @typedef {Object} RefundTransaction
 * @property {*} transactionId
 * @property {*} amount
 */

/**
 * @typedef {Object} Shipping
 * @property {*} shippingId
 * @property {*} firstName
 * @property {*} lastName
 * @property {*} address1
 * @property {*} city
 * @property {*} state
 * @property {*} postal
 * @property {*} country
 * @property {*} phone
 * @property {*} email
 * @property {*} company
 * @property {*} address2
 * @property {*} fax
 */

/**
 * @typedef {Object} Transaction
 * @property {*} redirectUrl
 * @property {*} amount
 * @property {*} surchargeAmount
 * @property {*} authorizationCode
 * @property {*} ipAddress
 * @property {*} industry
 * @property {*} billingMethod
 * @property {*} billingNumber
 * @property {*} billingTotal
 * @property {*} processorId
 * @property {*} secCode
 * @property {*} descriptor
 * @property {*} descriptorPhone
 * @property {*} descriptorAddress
 * @property {*} descriptorCity
 * @property {*} descriptorState
 * @property {*} descriptorPostal
 * @property {*} descriptorCountry
 * @property {*} descriptorMcc
 * @property {*} descriptorMerchantId
 * @property {*} descriptorUrl
 * @property {*} currency
 * @property {*} orderDescription
 * @property {*} customerId
 * @property {*} customerVaultId
 * @property {*} merchantReceiptEmail
 * @property {*} customerReceipt
 * @property {*} trackingNumber
 * @property {*} shippingCarrier
 * @property {*} orderId
 * @property {*} signatureImage
 * @property {*} poNumber
 * @property {*} taxAmount
 * @property {*} shippingAmount
 * @property {*} shipFromPostal
 * @property {*} summaryCommodityCode
 * @property {*} dutyAmount
 * @property {*} discountAmount
 * @property {*} nationalTaxAmount
 * @property {*} alternateTaxAmount
 * @property {*} alternateTaxId
 * @property {*} vatTaxAmount
 * @property {*} vatTaxRate
 * @property {*} vatInvoiceReferenceNumber
 * @property {*} customerVatRegistration
 * @property {*} merchantVatRegistration
 * @property {*} orderDate
 * @property {*} cardholderAuth
 * @property {*} eci
 * @property {*} cavv
 * @property {*} xid
 * @property {Billing} billing
 */

/**
 * @typedef {Object} UpdateBilling
 * @property {*} redirectUrl
 * @property {*} customerVaultId
 * @property {Billing} billing
 */

/**
 * @typedef {Object} UpdateCustomer
 * @property {*} redirectUrl
 * @property {*} customerVaultId
 * @property {*} sourceTransactionId
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef {Object} UpdateSubscription
 * @property {*} redirectUrl
 * @property {*} subscriptionId
 * @property {*} customerVaultId
 * @property {*} startDate  YYYYMMDD
 * @property {*} orderId
 * @property {*} poNumber
 * @property {*} orderDescription
 * @property {*} currency
 * @property {*} taxAmount
 * @property {*} shippingAmount
 * @property {*} sourceTransactionId
 */

/**
 * @typedef {Object} UpdateTransaction
 * @property {*} transactionId
 * @property {*} trackingNumber
 * @property {*} shippingCarrier
 * @property {*} orderId
 * @property {*} signatureImage
 */

/**
 * @typedef {Object} VoidTransaction
 * @property {*} transactionId
 */

 /**
 * @typedef {Object} Query
 * @property {*} username                   account username
 * @property {*} password                   account password
 * @property {*} startDate                  YYYYMMDDhhmmss
 * @property {*} endDate                    YYYYMMDDhhmmss
 * @property {*} reportType                 'receipt', 'customer_vault', 'recurring', 'gateway_processors', 'account_updater'
 * @property {*} mobileDeviceLicense        a license id or 'any_mobile'
 * @property {*} mobildeDeviceNickname      device nickname
 * @property {*} customerVaultId            customer vault id, only used for `reportType`='customer_vault'
 * @property {*} dateSearch                 'created', 'updated' or 'created,updated', used for customer_vault
 * @property {*} resultLimit                limit
 * @property {*} pageNumber                 page  
 */

/**
 * @typedef {Object} CreateTransactionResponse
 * @property {*} result
 * @property {*} resultText
 * @property {*} transactionId
 * @property {*} resultCode
 * @property {*} formUrl
 */

 /**
 * @typedef {Object} ExecuteTransactionResponse
 * @property {*} result
 * @property {*} resultText
 * @property {*} transactionId
 * @property {*} resultCode
 * @property {*} authorizationCode
 * @property {*} avsResult
 * @property {*} cvvResult
 * @property {*} actionType
 * @property {*} amount
 * @property {*} amountAuthorized
 * @property {*} ipAddress
 * @property {*} industry
 * @property {*} billingMethod
 * @property {*} processorId
 * @property {*} secCode
 * @property {*} descriptor
 * @property {*} descriptorPhone
 * @property {*} descriptorAddress
 * @property {*} descriptorCity
 * @property {*} descriptorState
 * @property {*} descriptorPostal
 * @property {*} descriptorCountry
 * @property {*} descriptorMcc
 * @property {*} descriptorMerchantId
 * @property {*} descriptorUrl
 * @property {*} currency
 * @property {*} orderDescription
 * @property {*} customerId
 * @property {*} customerVaultId
 * @property {*} merchantReceiptEmail
 * @property {*} customerReceipt
 * @property {*} partialPaymentBalance
 * @property {*} partialPaymentId
 * @property {*} trackingNumber
 * @property {*} shippingCarrier
 * @property {*} orderId
 * @property {*} poNumber
 * @property {*} taxAmount
 * @property {*} shippingAmount
 * @property {*} shipFromPostal
 * @property {*} summaryCommodityCode
 * @property {*} dutyAmount
 * @property {*} discountAmount
 * @property {*} nationalTaxAmount
 * @property {*} alternateTaxAmount
 * @property {*} alternateTaxId
 * @property {*} vatTaxAmount
 * @property {*} vatTaxRate
 * @property {*} vatInvoiceReferenceNumber
 * @property {*} customerVatRegistration
 * @property {*} merchantVatRegistration
 * @property {*} orderDate
 * @property {*} cardholderAuth
 * @property {*} eci
 * @property {*} cavv
 * @property {*} xid
 * @property {*} dupSeconds
 * @property {*} avsReject
 * @property {*} cvvReject
 * 
 * @property {Billing} billing
 * @property {Shipping} shipping
 * @property {Product[]} product
 */

/**
 * @typedef {Object} CreateSubscriptionResponse
 * @property {*} result
 * @property {*} resultText
 * @property {*} subscriptionId
 * @property {*} resultCode
 * @property {*} formUrl
 */

/**
 * @typedef ExecuteSubscriptionResponse
 * @property {*} result
 * @property {*} resultText
 * @property {*} resultCode
 * @property {*} actionType
 * @property {*} subscriptionId
 * 
 * @property {Plan} plan
 * @property {Billing} billing
 * @property {Shipping} shipping
 */

/**
 * @typedef ExecuteCustomerResponse
 * @property {*} result
 * @property {*} resultText
 * @property {*} resultCode
 * @property {*} actionType
 * @property {*} customerVaultId
 * 
 * @property {BillingExtended} billing
 * @property {Shipping} shipping
 */