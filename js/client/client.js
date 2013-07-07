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
 * @return {!Object} Get all headers.
 */
ydn.client.HttpRespondData.prototype.getHeaders = function(header) {
  this.ensureParse();
  return this.headers;
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
 */
ydn.client.HttpRequestData = function(path, opt_method,
                                      opt_params, opt_headers, opt_body) {
  this.path = path;
  this.method = opt_method ? opt_method.toUpperCase() : 'GET';
  this.params = opt_params || {};
  this.headers = opt_headers || {};
  this.body = opt_body;
};


/**
 * @type {string}
 */
ydn.client.HttpRequestData.prototype.path;


/**
 * @type {string}
 */
ydn.client.HttpRequestData.prototype.method;


/**
 * @type {!Object.<string>}
 */
ydn.client.HttpRequestData.prototype.params;


/**
 * @type {!Object.<string>}
 */
ydn.client.HttpRequestData.prototype.headers;


/**
 * @type {ArrayBuffer|Blob|Document|FormData|string|undefined}
 */
ydn.client.HttpRequestData.prototype.body;


/**]
 * @return {string}
 */
ydn.client.HttpRequestData.prototype.getUri = function() {
  return this.path;
};


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
 * @param {function(Object, ydn.client.HttpRespondData)?} cb
 */
ydn.client.HttpRequest.prototype.execute = function(cb) {};



/**
 * HTTP Request client.
 * @interface
 */
ydn.client.Client = function() {};


/**
 * Create a new HTTP request.
 * If callback is provided in the argument, the request is execute immediately.
 * @param {ydn.client.HttpRequestData} args
 * @return {!ydn.client.HttpRequest} Return request object if callback is not
 * provided in the argument.
 */
ydn.client.Client.prototype.request = function(args) {};

