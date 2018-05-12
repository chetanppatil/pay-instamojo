# NPM Package For Instamojo Payment Gateway REST API

<!-- [![Build Status](https://travis-ci.org/Chetan07j/pay-instamojo.svg?branch=master)](https://travis-ci.org/Chetan07j/pay-instamojo) -->
[![HitCount](http://hits.dwyl.io/chetan07j/pay-instamojo.svg)](http://hits.dwyl.io/chetan07j/pay-instamojo)
[![Generic badge](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://standardjs.com)
[![GitHub license](https://img.shields.io/github/license/chetan07j/pay-instamojo.svg)](https://github.com/Chetan07j/pay-instamojo/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/chetan07j/pay-instamojo.svg)](https://github.com/Chetan07j/pay-instamojo/graphs/contributors/)
[![GitHub issues](https://img.shields.io/github/issues/chetan07j/pay-instamojo.svg)](https://github.com/Chetan07j/pay-instamojo/issues/)
[![GitHub issues-closed](https://img.shields.io/github/issues-closed/chetan07j/pay-instamojo.svg)](https://github.com/Chetan07j/pay-instamojo/issues?q=is%3Aissue+is%3Aclosed)

[![NPM](https://nodei.co/npm/pay-instamojo.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/pay-instamojo/)

A node.js module, which provides an object oriented wrapper for the Instamojo REST API.

This library is built to support version `1.1` of the Instamojo API.

Instamojo API documentation can be found [here](https://docs.instamojo.com/docs/create-a-request)

[All About Instamojo](https://docs.instamojo.com/v1.1/docs)

## Installation

Install with the node package manager [npm](http://npmjs.org):

```shell
$ npm install pay-instamojo
```

## How To Use?

### Create the Instamojo client

```javascript
const InstamojoApi = require('pay-instamojo').instamojo;

const instamojo = new InstamojoApi({
  host: <instamojo-host>,
  apiKey: <instamojo-x-api-key>,
  authToken: <instamojo-x-auth-token>
});
```

### Get List of All Payment Requests

```javascript
/* For getRequestLists input is not required, hence first parameter is null in this call. */

instamojo.getRequestLists(null, (error, body) => {
  console.log('RESPONSE: ', error, body);
});
```

### Create Payment Request

```javascript

let input = {
  allowRepeatedPayment: <your-choice>, // true or false (boolean)
  amount: <amount-to-pay>, // e.g., 10
  buyerName: <buyer-name>,
  purpose: <purpose-of-payment>,
  redirectUrl: <redirectUrl-if-any>,
  phone: <phone-number>, // 10 digit valid phone number if any
  sendSMS: <your-choice>, // true or false (if true then phone is mandatory)
  email: <email-id-to-send-payment-link>, // valid email if any
  sendEmail: <your-choice>, // true or false (if true then email is mandatory)
  webhook: <webhook-url>
}
instamojo.createRequest(input, function (error, body) {
  console.log('RESPONSE:', error, body)
})
```

### Get Payment Request By Id

```javascript

let input = {
  paymentRequestId: <payment-request-id>
}
instamojo.getPaymentRequestById(input, function (error, body) {
  console.log('RESPONSE:', error, body)
})
```

### Create A Refund Request
Find input parameter values definition [here](https://docs.instamojo.com/docs/creating-a-refund)

```javascript

let input = {
  paymentId: <payment-id>, // Id you got as payment acknowledgment
  type: <code-to-identify-reason-for-this>,
  refundAmount: <paid-amount>, // not mandatory (if preset then valid amount)
  body: <text-explaining-refund> // not mandatory
}
instamojo.createRefund(input, function (error, body) {
  console.log('RESPONSE:', error, body)
})
```

### Get List of Refunds

```javascript
/* For getListOfRefunds input is not required, hence first parameter is null in this call. */

instamojo.getListOfRefunds(null, (error, body) => {
  console.log('RESPONSE: ', error, body);
});
```

### _Work In Progress, More Is Comming......_

## Options

InstamojoApi options:

- `host<string>`: The hostname for instamojo
- `apiKey<string>`: Instamojo X-Api-Key
- `authToken<string>`: Instamojo X-Auth-Token

## Implemented APIs

- Get List of All Payment Requests
- Create Payment Request
- Get Payment Request By Id
- Create Refund
- Get List Of Refunds

## Changelog

- _1.0.2 get payment request by id, create refund function added_
- _1.0.1 request dependency missing (added in package.json)_
- _1.0.0 Initial version_
