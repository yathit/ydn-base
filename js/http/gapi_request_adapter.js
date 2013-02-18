/**
 * @fileoverview GAPI request adapter.
 */

goog.provide('ydn.http.GapiRequestAdapter');
goog.require('ydn.http.Transport');


/**
 *
 * @param {Function} wrapper
 * @constructor
 * @implements {ydn.http.Transport}
 */
ydn.http.GapiRequestAdapter = function(wrapper) {
  this.wrapper = wrapper;
};



/**
 * Submit HTTP request.
 *
 * @param {string} url
 * @param {function(ydn.http.CallbackResult)=} opt_callback
 * @param {ydn.http.Transport.Options=} options
 * @return {goog.async.Deferred|undefined} if not provided, callback result
 * is return in the deferred function.
 * @override
 */
ydn.http.GapiRequestAdapter.prototype.send =  function(url, opt_callback, options) {
  options = ydn.http.getDefaultOptions(options);
  this.wrapper({
    'path': url,
    'method': options.method,
    'params': options.params,
    'headers': options.headers,
    'body': options.body,
    'callback': opt_callback
  })
};
