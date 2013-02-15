/**
 * @fileoverview Proxy transport.
 */

goog.provide('ydn.http.MockHttpTransport');
goog.require('ydn.http.Transport');



/**
 *
 * @constructor
 * @implements {ydn.http.Transport}
 */
ydn.http.MockHttpTransport = function() {
  this.sent_uris = [];
  this.sent_methods = [];
  this.print_body = false;
};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.http.MockHttpTransport.prototype.logger = goog.debug.Logger.getLogger('ydn.http.MockHttpTransport');


/**
 *
 * @type {Array.<string>}
 */
ydn.http.MockHttpTransport.prototype.sent_uris;

/**
 *
 * @type {Array.<string>}
 */
ydn.http.MockHttpTransport.prototype.sent_methods;

/**
 *
 * @inheritDoc
 */
ydn.http.MockHttpTransport.prototype.send = function(uri, callback, options) {

  var method = options.method;
  var body = options.body;
  var header = options.headers;
  var uri_params = options.params;

  this.logger.info('Mocking HTTP ' + method + ': ' + uri);
  if (this.print_body && goog.isDef(body)) {
    window.console.info(body);
  }
  this.sent_uris.push(uri);
  this.sent_methods.push(method);
  if (goog.isFunction(callback)) {
    callback(new ydn.http.CallbackResult('', '', uri, 200));
  }
};

