/**
 * @fileoverview HTTP client.
 */


goog.provide('ydn.client');
goog.provide('ydn.client.Client');
goog.provide('ydn.client.HttpRequest');
goog.provide('ydn.client.HttpRequestData');
goog.provide('ydn.client.HttpRespondData');

goog.require('goog.net.XhrManager');


/**
 * @private
 * @type {Object.<ydn.client.Client>}
 */
ydn.client.clients_ = {};


/**
 * @private
 * @type {Array.<function(string=): string>}
 */
ydn.client.scope_resolvers_ = [];


/**
 *
 * @param {function(string=): string?} resolver
 */
ydn.client.setScopeResolver = function(resolver) {
  ydn.client.scope_resolvers_ = [resolver];
};


/**
 *
 * @param {function(string=): string?} resolver Resolver should resolve given
 * feed_uri to scope,
 * or return null when feed_uri is irrelevant to the resolver.
 */
ydn.client.addScopeResolver = function(resolver) {
  if (resolver) {
    ydn.client.scope_resolvers_.push(resolver);
  }
};


/**
 * Set whatever proxy
 *
 * @param {ydn.client.Client} transport
 * @param {string=} opt_scope
 */
ydn.client.setClient = function(transport, opt_scope) {
  opt_scope = opt_scope || ydn.http.Scopes.DEFAULT;
  ydn.client.clients_[opt_scope] = transport;
};


/**
 * Get whatever proxy transport set previously
 * If given proxy is not available, a default transport will be return instead
 * of null.
 * @see {@link ydn.http.Scopes}
 * @param {string=} uri
 * @return {ydn.client.Client} transport.
 */
ydn.client.getClient = function(uri) {
  if (!goog.isDef(uri)) {
    return ydn.client.clients_[ydn.http.Scopes.DEFAULT];
  }
  var scope = uri;
  for (var i = 0; i < ydn.client.scope_resolvers_.length; i++) {
    var resolver = ydn.client.scope_resolvers_[i];
    var out = resolver(uri);
    if (out) {
      scope = out;
      break;
    }
  }
  return ydn.client.clients_[scope] || null;
};


/**
 * Clear transport
 * @param {string=} opt_scope if not specified, all transports will be cleared.
 */
ydn.client.clearTransport = function(opt_scope) {
  if (goog.isDef(opt_scope)) {
    delete ydn.client.clients_[opt_scope];
  } else {
    ydn.client.clients_ = {};
    ydn.client.scope_resolvers_ = [];
  }
};


/**
 * @type {goog.net.XhrManager}
 * @private
 */
ydn.client.xhr_manager_;


/**
 * Get singleton xhr manager.
 * @return {goog.net.XhrManager}
 */
ydn.client.getXhrManager = function() {
  if (!ydn.client.xhr_manager_) {
    ydn.client.xhr_manager_ = new goog.net.XhrManager();
  }
  return ydn.client.xhr_manager_;
};



/**
 * Create HTTP Raw Response data.
 * This class exists so that it is easier to interpolate with GAPI library and
 * provide strong type, when use internally.
 * @param {number|string} status status or raw.
 * @param {*=} opt_body
 * @param {Object.<string>=} opt_headers
 * @param {string=} opt_status_text
 * @constructor
 * @struct
 */
ydn.client.HttpRespondData = function(status, opt_body, opt_headers,
                                      opt_status_text) {
  if (goog.isString(status)) {
    this.raw = status;
  } else {
    this.raw = null;
    this.status = status;
    this.body = opt_body;
    this.headers = opt_headers || {};
    this.statusText = opt_status_text;
  }
};


/**
 * Unparsed raw result.
 * @type {string?}
 * @protected
 */
ydn.client.HttpRespondData.prototype.raw;


/**
 * @type {*}
 * @protected
 */
ydn.client.HttpRespondData.prototype.body;


/**
 * @type {!Object.<string>}
 * @protected
 */
ydn.client.HttpRespondData.prototype.headers;


/**
 * @type {number}
 * @protected
 */
ydn.client.HttpRespondData.prototype.status;


/**
 * @type {string|undefined}
 * @protected
 */
ydn.client.HttpRespondData.prototype.statusText;


/**
 * @protected
 */
ydn.client.HttpRespondData.prototype.ensureParse = function() {
  if (this.raw) {
    var json = ydn.json.parse(this.raw);
    if (json['gapiRequest']) {
      json = json['gapiRequest']['data'];
    }
    this.status = json['status'];
    this.statusText = json['statusText'];
    this.headers = json['headers'];
    this.body = json['body'];
    this.raw = null;
  }
};


/**
 * @return {number}
 */
ydn.client.HttpRespondData.prototype.getStatus = function() {
  this.ensureParse();
  return this.status;
};


/**
 * Return true if status code is equal or more than 200 and less then 400.
 * @return {boolean}
 */
ydn.client.HttpRespondData.prototype.isSuccess = function() {
  this.ensureParse();
  return this.status >= 200 && this.status < 400;
};


/**
 * @return {string}
 */
ydn.client.HttpRespondData.prototype.getStatusText = function() {
  this.ensureParse();
  return this.statusText || '';
};


/**
 * @return {*}
 */
ydn.client.HttpRespondData.prototype.getBody = function() {
  this.ensureParse();
  return this.body;
};


/**
 * @param {string} header Header name.
 * @return {string|undefined}
 */
ydn.client.HttpRespondData.prototype.getHeader = function(header) {
  this.ensureParse();
  return this.headers[header];
};


/**
 * @return {!Object} Get all headers. Treat as read-only object.
 */
ydn.client.HttpRespondData.prototype.getHeaders = function() {
  this.ensureParse();
  return this.headers; // should we clone?
};


/**
 * Check or sniff respond data is JSON or not.
 * @return {boolean}
 */
ydn.client.HttpRespondData.prototype.isJson = function() {
  this.ensureParse();
  if (this.getHeader('content-type') == 'application/json') {
    return true;
  } else {
    var text = this.body;
    if (goog.isString(text) && !goog.string.isEmpty(text)) {
      return (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
          replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
          replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
    } else {
      return false;
    }
  }
};


/**
 * @return {Object}
 */
ydn.client.HttpRespondData.prototype.getJson = function() {

  if (this.isJson() && goog.isString(this.body)) {
    return /** @type {Object} */ (JSON.parse(this.body));
  } else {
    return /** @type {Object} */ (this.body);
  }
};


/**
 * @param {gapi.client.RawResp|ydn.client.HttpRespondData|string} args
 * @return {!ydn.client.HttpRespondData}
 */
ydn.client.HttpRespondData.wrap = function(args) {
  return args instanceof ydn.client.HttpRespondData ? args :
      goog.isString(args) ? new ydn.client.HttpRespondData(args) :
      new ydn.client.HttpRespondData(args['status'], args['body'],
          args['headers'], args['statusText']);
};



/**
 * Create HTTP Request data.
 * This class exists so that it is easier to interpolate with GAPI library and
 * provide strong type, when use internally.
 * @param {string} path
 * @param {string=} opt_method
 * @param {Object.<string>=} opt_params
 * @param {Object.<string>=} opt_headers
 * @param {ArrayBuffer|Blob|Document|FormData|string=} opt_body
 * @constructor
 * @struct
 * @implements {ydn.client.HttpRequest}
 */
ydn.client.HttpRequestData = function(path, opt_method,
                                      opt_params, opt_headers, opt_body) {
  /**
   * @type {string}
   */
  this.path = path;
  /**
   * Upper case HTTP method. Default to 'GET'.
   * @type {string}
   */
  this.method = opt_method ? opt_method.toUpperCase() : 'GET';
  /**
   * @type {!Object}
   */
  this.params = opt_params || {};
  /**
   * @type {!Object}
   */
  this.headers = opt_headers || {};
  /**
   * @type {ArrayBuffer|Blob|Document|FormData|string|undefined}
   */
  this.body = opt_body;
};


/**
 * @return {string}
 */
ydn.client.HttpRequestData.prototype.getUri = function() {
  return this.path;
};


/**
 * Return true if the request is write request.
 * @return {boolean}
 */
ydn.client.HttpRequestData.prototype.isWriteRequest = function() {
  return this.method == 'POST' || this.method == 'PUT' ||
      this.method == 'DELETE';
};


/**
 * @inheritDoc
 */
ydn.client.HttpRequestData.prototype.execute = goog.abstractMethod;


/**
 * Wrap request data.
 * Note: callback is not used in ydn.client.HttpRequestData.
 * @param {gapi.client.ReqData|ydn.client.HttpRequestData} args
 * @return {!ydn.client.HttpRequestData}
 */
ydn.client.HttpRequestData.wrap = function(args) {
  return args instanceof ydn.client.HttpRequestData ? args :
      new ydn.client.HttpRequestData(args['path'],
          args['method'], args['params'], args['headers'], args['body']);
};



/**
 * HTTP Request.
 * @interface
 */
ydn.client.HttpRequest = function() {};


/**
 * Execute the request.
 * @param {function(this: T, Object, ydn.client.HttpRespondData)?} cb
 * @param {T=} opt_obj scope.
 * @template T
 */
ydn.client.HttpRequest.prototype.execute = function(cb, opt_obj) {};



/**
 * HTTP Request client.
 * @interface
 */
ydn.client.Client = function() {};


/**
 * Create a new HTTP request.
 * If callback is provided in the argument, the request is execute immediately.
 * @param {ydn.client.HttpRequestData} req
 * @return {!ydn.client.HttpRequest} Return request object if callback is not
 * provided in the argument.
 */
ydn.client.Client.prototype.request = function(req) {};

