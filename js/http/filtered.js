/**
 * @fileoverview Filtered transport.
 *
 * Filtered transport allow optional pass through if certain cretitia are met.
 */


goog.provide('ydn.http.FilteredTransport');
goog.provide('ydn.http.DryrunTransport');
goog.provide('ydn.http.NoPreflightTransport');
goog.provide('ydn.http.GseTransport');
goog.require('ydn.http.Transport');
goog.require('ydn.http.MockHttpTransport');
goog.require('goog.Uri');
goog.require('goog.net.Jsonp');


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


/**
 * Other than GET request are print to console without sending to the server.
 * @extends {ydn.http.TransportFilter}
 * @param {ydn.http.Transport}  transport
 * @constructor
 */
ydn.http.DryrunTransport = function(transport) {

  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {ydn.http.Transport.Options=} options
   * @return {boolean}
   */
  var filter = function (url, method, options) {
    return method == 'GET';
  };

  var drop_transport = new ydn.http.MockHttpTransport();
  drop_transport.print_body = true;

  goog.base(this, filter, transport, drop_transport);
};
goog.inherits(ydn.http.DryrunTransport, ydn.http.TransportFilter);



/**
 * The request is rout to proxy_transport if option request required, otherwise go through direct channels.
 *
 * This is use for send request to GSE server. Currently GSE server do not response option request even though
 * it allow cross origin request from any host. Very strange.
 *
 * @extends {ydn.http.TransportFilter}
 * @param {ydn.http.Transport} direct_transport
 * @param {ydn.http.Transport} proxy_transport use when pre-flight request is required
 * @constructor
 */
ydn.http.NoPreflightTransport = function (direct_transport, proxy_transport) {
  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {ydn.http.Transport.Options=} options
   * @return {boolean}
   */
  var filter = function (url, method, options) {

    method = method || 'GET';

    var guri = new goog.Uri(url);
    var domain = guri.getDomain();
    var scheme = guri.getScheme();
    var port = guri.getPort();

    // here we have to choose which method to use
    var is_cross_post = !((!scheme || scheme == window.location.protocol) &&
        (!port || port == window.location.port) &&
        (!domain || domain == window.location.hostname));

    if (is_cross_post) {
      // only cross post require options request
      var is_simple_request = ydn.http.is_simple_request(method, options.headers);
      if (!is_simple_request) {
        return false;
      }
    }
    return true;
  };

  goog.base(this, filter, direct_transport, proxy_transport);
};
goog.inherits(ydn.http.NoPreflightTransport, ydn.http.TransportFilter);



/**
 * The request is rout to proxy_transport for POST and altom GET request, otherwise go through direct channels.
 *
 * This is use for send request to GSE server. GSE server response from cross origin for non ATOM format.
 *
 * @extends {ydn.http.TransportFilter}
 * @param {ydn.http.Transport} direct_transport
 * @param {ydn.http.Transport} proxy_transport use when pre-flight request is required
 * @constructor
 */
ydn.http.GseTransport = function (direct_transport, proxy_transport) {
  /**
   *
   * @param {string} url
   * @param {string} method
   * @param {ydn.http.Transport.Options=} options
   * @return {boolean}
   */
  var filter = function (url, method, options) {

    /**
     * GSE server only accept cross origin request for alternative format other than 'atom'.
     * Default is 'atom'. So 'alt' must set to enable cross origin 'GET' request.
     * @return {boolean}
     */
    var use_alt = function () {
      if (url.indexOf('alt=json') > 0 || url.indexOf('alt=json-in-script') > 0 ||
          url.indexOf('alt=atom-in-script') > 0) {
        return true;
      }
      for (var key in options.params) {
        if (options.params.hasOwnProperty(key) && key == 'alt' && goog.isString(options.params[key]) &&
          options.params[key].toLowerCase() != 'atom') {
          return true;
        }
      }
      return false;
    };

    return (method == 'GET' && use_alt());
  };

  goog.base(this, filter, direct_transport, proxy_transport);
};
goog.inherits(ydn.http.GseTransport, ydn.http.TransportFilter);
