/**
 * @fileoverview HTTP request object.
 */




goog.provide('ydn.client.SimpleHttpRequest');
goog.require('goog.Uri');
goog.require('ydn.client');



/**
 * Create a new request.
 * @param {ydn.client.HttpRequestData} args
 * @param {goog.net.XhrManager=} opt_xm xhr manager.
 * @constructor
 * @struct
 */
ydn.client.SimpleHttpRequest = function(args, opt_xm) {
  this.xm_ = goog.isDef(opt_xm) ? // use default only if not null.
      opt_xm : ydn.client.getXhrManager();
  /**
   * @final
   * @private
   */
  this.id_ = 'r' + (ydn.client.SimpleHttpRequest.IdCount_++);
};


/**
 * Count request create for id purpose.
 * @type {number}
 * @private
 */
ydn.client.SimpleHttpRequest.IdCount_ = 0;


/**
 * @type {string}
 * @private
 */
ydn.client.SimpleHttpRequest.prototype.id_;


/**
 * @return {string}
 */
ydn.client.SimpleHttpRequest.prototype.getId = function() {
  return this.id_;
};


/**
 * @type {goog.net.XhrManager}
 * @private
 */
ydn.client.SimpleHttpRequest.prototype.xm_;


/**
 * Execute the request.
 * @param {function(Object, ydn.client.HttpRespondData)} cb
 */
ydn.client.SimpleHttpRequest.prototype.execute = function(cb) {
  goog.asserts.assert(this.xm_, this + ' already executed.');
  var url = new goog.Uri();
  url.setPath(this.path);
  for (var key in this.params) {
    url.setParameterValue(key, this.params[key]);
  }
  var callback = function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    var body = xhr.getResponse();
    var is_json = true; // todo
    var json = is_json && goog.isObject(body) ? body : false;
    var header_lines = xhr.getAllResponseHeaders().split('\n');
    var headers = {};
    for (var i = 0; i < header_lines.length; i++) {
      var idx = header_lines[i].indexOf(':');
      if (idx > 0) {
        var name = header_lines[i].substr(0, idx).toLowerCase();
        headers[name] = header_lines[i].substr(idx + 1).trim();
      }
    }
    var resp = new ydn.client.HttpRespondData(xhr.getStatus(), body, headers,
        xhr.getStatusText());
    cb(json, resp);
    cb = null;
  };
  this.xm_.send(this.id_, url.toString(),
      this.method, this.body, this.headers, undefined, callback);
  this.xm_ = null;
};


if (goog.DEBUG) {
  /**
   * @inheritDoc
   */
  ydn.client.SimpleHttpRequest.prototype.toString = function() {
    return 'HTTPRequest:' + this.id_;
  };
}
