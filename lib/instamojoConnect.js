const request = require('request')
const camelcase = require('camelcase-input').camelcase

function instamojo (config) {
  if (typeof config !== 'object') {
    throw new Error('Invalid config passed.')
  }
  if (config && !config.host) {
    throw new Error('Missing instamojo host.')
  }
  if (config && !config.apiKey) {
    throw new Error('Missing your instamojo api key.')
  }
  if (config && !config.authToken) {
    throw new Error('Missing your instamojo auth token.')
  }

  this.host = config.host.trim()
  this.apiKey = config.apiKey.trim()
  this.authToken = config.authToken.trim()
  this.baseUrl = '/api/1.1/'

  /* ERROR MESSAGES */
  this.badRequest = 'Bad Request'
  this.unauthorized = 'Unauthorized Access!'
  this.notFound = 'Not Found!'
  this.forbidden = 'Forbidden'
  this.instamojoConnectError = 'Instamojo Internal Server Error'

  this.phoneRegx = RegExp(/^[0]?[789]\d{9}$/)
  this.emailRegx = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

  this.doRequest = function (options, callback) {
    options.headers = options.headers ? options.headers : {}
    options.headers['X-Api-Key'] = this.apiKey
    options.headers['X-Auth-Token'] = this.authToken
    request(options, callback)
  }

  this.handleResponse = function (error, response, body, callback) {
    let err
    if (error) {
      callback(error, null)
      return
    }
    switch (response.statusCode) {
      // case 400:
      //   err = response.statusCode + ': ' + this.badRequest
      //   break
      case 401:
        err = response.statusCode + ': ' + this.unauthorized
        break
      case 403:
        err = response.statusCode + ': ' + this.forbidden
        break
      case 404:
        err = response.statusCode + ': ' + this.notFound
        break
      case 500:
        err = response.statusCode + ': ' + this.instamojoConnectError
        break
    }

    if (body === undefined) {
      err = 'Response body was undefined.'
    }

    body = (typeof body === 'object' || (Array.isArray(body) && typeof body[0] === 'object')) ? camelcase(body, {deep: true}) : body
    !err ? callback(null, body) : callback(err)
  }
}

module.exports.instamojo = instamojo
