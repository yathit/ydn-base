/**
 * @fileoverview Mock server for REST resource in JSON format.
 */


goog.provide('ydn.client.MockClient');

goog.require('goog.log');
goog.require('ydn.client.Client');
goog.require('ydn.client.SimpleHttpRequest');



/**
 * @param {number=} opt_delay server respond time, default to 0 for
 * synchronous respond.
 * @constructor
 * @implements {ydn.client.Client}
 * @struct
 */
ydn.client.MockClient = function(opt_delay) {

  this.delay = opt_delay || 0;

  this.hit_counts = {
    'GET': 0,
    'POST': 0,
    'PUT': 0,
    'DELETE': 0,
    'HEAD': 0
  };
};


/**
 * @define {boolean} debug flag.
 */
ydn.client.MockClient.DEBUG = false;


/**
 * @protected
 * @type {goog.log.Logger}
 */
ydn.client.MockClient.prototype.logger =
    goog.log.getLogger('ydn.client.MockClient');


/**
 * Response data is hash by encoded query string without '?'.
 * @typedef {{
 *  body: string,
 *  status: number
 * }}
 */
ydn.client.MockClient.ResponseData;


/**
 *
 * @type {number}
 */
ydn.client.MockClient.prototype.delay = 0;


/**
 * @type {number}
 */
ydn.client.MockClient.prototype.status = 200;


/**
 * @type {string}
 */
ydn.client.MockClient.prototype.status_text = 'OK';


/**
 * @type {Object}
 */
ydn.client.MockClient.prototype.body = {};


/**
 * @type {Object}
 */
ydn.client.MockClient.prototype.headers = {'content-type': 'applicatioin/json'};


/**
 * Get HTTP query count.
 * @param {string=} opt_mth HTTP method. By default return all queries count.
 * @return {number} number of query.
 */
ydn.client.MockClient.prototype.getHitCount = function(opt_mth) {
  if (opt_mth) {
    return this.hit_counts[opt_mth];
  } else {
    var n = 0;
    for (var key in this.hit_counts) {
      n += this.hit_counts[key];
    }
    return n;
  }
};


/**
 * @type {ydn.client.HttpRequestData}
 * @private
 */
ydn.client.MockClient.prototype.response = null;


/**
 * @inheritDoc
 */
ydn.client.MockClient.prototype.request = function(req) {

  var method = req.method ? req.method.toUpperCase() : 'GET';
  var content_type = 'application/json';

  var res = null;

  var uri = new goog.Uri(req.getUri());
  this.hit_counts[method]++;

  var response = new ydn.client.HttpRespondData(this.status, this.body,
      this.headers, this.status_text);

  goog.log.fine(this.logger, 'Responding ' + response.status + ' to ' +
      method + ' ' + uri);

  return new ydn.client.MockRequest(req, response, this.delay);
};



/**
 * @param {ydn.client.HttpRequestData} req
 * @param {ydn.client.HttpRespondData} resp
 * @param {number} delay
 * @constructor
 * @extends {ydn.client.SimpleHttpRequest}
 */
ydn.client.MockRequest = function(req, resp, delay) {
  goog.base(this, req, null);
  this.response = resp;
  this.delay = delay;
};
goog.inherits(ydn.client.MockRequest, ydn.client.SimpleHttpRequest);


/**
 * @override
 */
ydn.client.MockRequest.prototype.execute = function(cb, opt_scope) {
  if (this.delay > 0) {
    var me = this;
    setTimeout(function() {
      if (cb) {
        cb.call(opt_scope, me.response.body, me.response);
      }
    }, this.delay);
  } else {
    if (cb) {
      cb.call(opt_scope, me.response.body, me.response);
    }
  }
};


