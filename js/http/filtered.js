/**
 * @fileoverview Filtered transport.
 *
 * Filtered transport allow optional pass through if certain cretitia are met.
 */


goog.provide('ydn.http.FilteredTransport');
goog.require('ydn.http.Transport');
goog.require('goog.Uri');


/**
 * Filter transport. By default only allow GET request
 * @param {function(string, string, ydn.http.Transport.Options=): boolean} filter Return
 * true to use {@code pass_transport}, otherwise {@code fail_transport} will be used, if provided.
 * @implements {ydn.http.Transport}
 * @param {ydn.http.Transport}  pass_transport
 * @param {ydn.http.Transport=}  fail_transport
 * .each argument represent uri, method, body, header, uri_params
 * @constructor
 */
ydn.http.TransportFilter = function(filter, pass_transport, fail_transport) {
  this.pass_transport = pass_transport;
  this.fail_transport = fail_transport;
  this.filter = filter;
  this.allow_request = ['GET'];
};


/**
 * @protected
 * @type {goog.debug.Logger}
 */
ydn.http.TransportFilter.prototype.logger = goog.debug.Logger.getLogger('ydn.http.TransportFilter');



/**
 * @inheritDoc
 */
ydn.http.TransportFilter.prototype.send = function(uri, callback, options) {

  options = ydn.http.getDefaultOptions(options);

  if (this.filter(uri, /** @type {string} */ (options.method), options)) {
    this.logger.finest('pass transport selected.');
    this.pass_transport.send(uri, callback, options);
  } else if (this.fail_transport) {
    this.logger.finest('fail transport selected.');
    this.fail_transport.send(uri, callback, options);
  } else {
    this.logger.info('Drop ' + options.method + ' request: ' + uri);
    if (goog.isString(options.body)) {
      this.logger.finest(options.body);
    }
  }
};

/**
 * Simple filtered transport, allowing only GET request. Set {@code allow_request} as necessary.
 * @extends {ydn.http.TransportFilter}
 * @param {ydn.http.Transport}  transport
 * @param {Array.<string>=}  allow_request default to {@code ['GET']}
 * @constructor
 */
ydn.http.FilteredTransport = function(transport, allow_request) {
  allow_request = allow_request || ['GET'];

  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {ydn.http.Transport.Options=} options
   * @return {boolean}
   */
  var filter = function (url, method, options) {
    return allow_request.indexOf(method) >= 0;
  };

  goog.base(this, filter, transport);
};
goog.inherits(ydn.http.FilteredTransport, ydn.http.TransportFilter);


