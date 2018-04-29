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
