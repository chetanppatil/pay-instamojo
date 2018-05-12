const instamojo = require('./instamojoConnect').instamojo

/* GET LIST OF ALL PAYMENT REQUESTS */
instamojo.prototype.getRequestLists = function (input, callback) {
  let _this = this
  let options = {
    uri: this.host + this.baseUrl + 'payment-requests',
    method: 'GET',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* CREATE PAYMENT REQUEST */
instamojo.prototype.createRequest = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (input.allowRepeatedPayment && typeof input.allowRepeatedPayment !== 'boolean') {
    throw new Error('Invalid value for allowRepeatedPayment.')
  }
  if (!input.amount) {
    throw new Error('amount is mandatory.')
  }
  if (input.amount && isNaN(input.amount)) {
    throw new Error('Invalid amount.')
  }
  if (input.buyerName && typeof input.buyerName !== 'string') {
    throw new Error('Invalid buyer name.')
  }
  if (!input.purpose) {
    throw new Error('purpose is mandatory.')
  }
  if (input.redirectUrl && typeof input.redirectUrl !== 'string') {
    throw new Error('Invalid redirect url.')
  }
  if (input.webhook && typeof input.webhook !== 'string') {
    throw new Error('Invalid webhook.')
  }
  if (input.phone && !this.phoneRegx.test(input.phone)) {
    throw new Error('Invalid phone number.')
  }
  if (input.email && !this.emailRegx.test(input.email)) {
    throw new Error('Invalid email.')
  }
  if (input.sendSMS && typeof input.sendSMS !== 'boolean') {
    throw new Error('Invalid sendSMS value (boolean accepted).')
  }
  if (input.sendEmail && typeof input.sendEmail !== 'boolean') {
    throw new Error('Invalid sendEmail value (boolean accepted).')
  }
  if (input.sendSMS && !input.phone) {
    throw new Error('phone is mandatory when sendSMS is set to true.')
  }
  if (input.sendEmail && !input.email) {
    throw new Error('email is mandatory when sendEmail is set to true.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'payment-requests/',
    method: 'POST',
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // },
    form: {
      allow_repeated_payments: input.allowRepeatedPayment,
      amount: input.amount,
      buyer_name: input.buyerName,
      purpose: input.purpose,
      redirect_url: input.redirectUrl,
      phone: input.phone,
      send_email: input.sendEmail,
      webhook: input.webhook,
      send_sms: input.sendSMS,
      email: input.email
    },
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* GET PAYMENT REQUEST BY ID */
instamojo.prototype.getPaymentRequestById = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.paymentRequestId) {
    throw new Error('Missing paymentRequestId.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'payment-requests/' + input.paymentRequestId + '/',
    method: 'POST',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* CREATE A REFUND */
instamojo.prototype.createRefund = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.paymentId) {
    throw new Error('Missing paymentId.')
  }
  if (!input.type) {
    throw new Error('Missing refund type.')
  }
  if (input.refundAmount && isNaN(input.refundAmount)) {
    throw new Error('Invalid refund amount.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'refunds/',
    method: 'GET',
    form: {
      payment_id: input.paymentId,
      type: typeof input.type === 'string' ? input.type.toUpperCase() : input.type,
      refund_amount: input.refundAmount,
      body: input.body
    },
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* GET LIST OF ALL REFUNDS */
instamojo.prototype.getListOfRefunds = function (input, callback) {
  let _this = this
  let options = {
    uri: this.host + this.baseUrl + 'refunds/',
    method: 'GET',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* GET DETAILS OF REFUND BY ID */
instamojo.prototype.getRefundDetailsById = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.refundId) {
    throw new Error('Missing refundId.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'refunds/' + input.refundId + '/',
    method: 'GET',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* GET PAYMENT DETAILS BY ID */
instamojo.prototype.getPaymentDetailsById = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.paymentId) {
    throw new Error('Missing paymentId.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'payments/' + input.paymentId + '/',
    method: 'GET',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* DISABLE PAYMENT REQUEST BY ID */
instamojo.prototype.disablePaymentRequest = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.paymentRequestId) {
    throw new Error('Missing paymentId.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'payment-requests/' + input.paymentRequestId + '/disable/',
    method: 'POST',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}

/* ENABLE PAYMENT REQUEST BY ID */
instamojo.prototype.enablePaymentRequest = function (input, callback) {
  let _this = this

  if (!input) {
    throw new Error('Invalid request.')
  }
  if (!input.paymentRequestId) {
    throw new Error('Missing paymentId.')
  }

  let options = {
    uri: this.host + this.baseUrl + 'payment-requests/' + input.paymentRequestId + '/enable/',
    method: 'POST',
    json: true
  }

  this.doRequest(options, (error, response, body) => {
    _this.handleResponse(error, response, body, callback)
  })
}
