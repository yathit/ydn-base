/**
 * @fileoverview HTTP Transport.
 *
 * Provide HTTP request.
 */

goog.provide('ydn.http.Transport');
goog.provide('ydn.http.CallbackResult');


/**
 *
 * @constructor
 * @param {string} content_type
 * @param {string} text
 * @param {string} uri
 * @param {number} status
 * @param {Object=} json
 */
ydn.http.CallbackResult = function (content_type, text, uri, status, json) {
  /** @final */
  this.status = status;
  /** @final */
  this.content_type = content_type;
  /** @final */
  this.text = text;
  /** @final */
  this.uri = uri;
  /* final */
  this.json = json || null;
};


/**
 * @type {number}
 */
ydn.http.CallbackResult.prototype.status;

/**
 * @type {string}
 */
ydn.http.CallbackResult.prototype.content_type;

/**
 * @type {string}
 */
ydn.http.CallbackResult.prototype.text;

/**
 * @type {string}
 */
ydn.http.CallbackResult.prototype.uri;

/**
 * @type {Object}
 */
ydn.http.CallbackResult.prototype.json;

/**
 *
 * @return {string}
 */
ydn.http.CallbackResult.prototype.getResponse = function() {
  return this.text;
};


/**
 *
 * @return {!Object}
 */
ydn.http.CallbackResult.prototype.getResponseJson = function() {
  if (!this.json) {
    this.json = ydn.json.parse(this.text);
  }
  return this.json;
};

/**
 *
 * @return {number}
 */
ydn.http.CallbackResult.prototype.getStatus = function() {
  return this.status;
};

/**
 *
 * @return {string}
 */
ydn.http.CallbackResult.prototype.getUrl = function() {
  return this.uri;
};

/**
 *
 * @return {boolean}
 */
ydn.http.CallbackResult.prototype.isSuccessStatusCode = function() {
  return this.status >= 200 && this.status < 400;
};


/**
 * Return status and shortened text from the result.
 * @return {string}
 */
ydn.http.CallbackResult.prototype.getMessage = function() {
  var txt = goog.isString(this.text) ? this.text.substring(0, 200) : '';
  return this.status + ': ' + txt;
};


/**
 *
 * @return {boolean} if content_type is json
 */
ydn.http.CallbackResult.prototype.isContentJson = function() {
  return /application\/json/.test(this.content_type);
};

/**
 *
 * @return {boolean} if content_type is javascript
 */
ydn.http.CallbackResult.prototype.isContentJavascript = function() {
  return /text\/javascript/.test(this.content_type);
};



/**
 * @return {string}
 */
ydn.http.CallbackResult.prototype.toString = function() {
  if (goog.DEBUG) {
    var msg = this.message ? this.message : this.text;
    return this.status + ' ' + this.uri + ' ' + msg;
  } else {
    return goog.base(this, 'toString');
  }
};



/**
 *
 * @interface
 */
ydn.http.Transport = function() {};


/**
 * @typedef {{
 * method: (string|undefined),
 * body: (string|undefined),
 * headers: (Object.<string>|undefined),
 * params: (Object.<string>|undefined)
 * }}
 */
ydn.http.Transport.Options;


/**
 *
 * @param {Object=} options given option
 * @return {!ydn.http.Transport.Options} return given options if not
 * default options. input argument is not modified.
 */
ydn.http.getDefaultOptions = function(options) {
  var default_options = {
    method: 'GET',
    body: undefined,
    headers: {},
    params: {}

  };
  if (goog.isDefAndNotNull(options)) {
    return {
      method: options.method || default_options.method,
      body: options.body,
      headers: options.headers || {},
      params: options.params || {}
    }
  } else {
    return default_options;
  }
};


/**
 * Submit HTTP request.
 *
 * @param {string} url
 * @param {function(ydn.http.CallbackResult)=} opt_callback
 * @param {ydn.http.Transport.Options=} opt_options
 * @return {goog.async.Deferred|undefined} if not provided, callback result
 * is return in the deferred function.
 */
ydn.http.Transport.prototype.send =  function(url, opt_callback, opt_options) {

};




