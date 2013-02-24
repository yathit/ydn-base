/**
 * @fileoverview GAPI request adapter.
 */

goog.provide('ydn.http.GapiRequestAdapter');
goog.require('ydn.http.ITransport');


/**
 *
 * @param {gapi.client} gapi_client GAPI client object.
 * @constructor
 * @implements {ydn.http.ITransport}
 */
ydn.http.GapiRequestAdapter = function(gapi_client) {
  this.gapi_client = gapi_client;
};


/**
 * @type {gapi.client}
 */
ydn.http.GapiRequestAdapter.prototype.gapi_client;


ydn.http.GapiRequestAdapter.wrap = function(gapi_client) {

}



/**
 * Submit HTTP request.
 *
 * @param {string} url
 * @param {function(ydn.http.CallbackResult)=} opt_callback
 * @param {ydn.http.ITransport.Options=} options
 * @return {goog.async.Deferred|undefined} if not provided, callback result
 * is return in the deferred function.
 * @override
 */
ydn.http.GapiRequestAdapter.prototype.send =  function(url, opt_callback, options) {
  options = ydn.http.getDefaultOptions(options);
  this.gapi_client.request({
    'path': url,
    'method': options.method,
    'params': options.params,
    'headers': options.headers,
    'body': options.body,
    'callback': opt_callback
  })
};
