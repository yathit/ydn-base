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
 * @implements {ydn.client.HttpRequest}
 */
ydn.client.SimpleHttpRequest = function(args, opt_xm) {
  this.xm_ = goog.isDef(opt_xm) ? // use default only if not null.
      opt_xm : ydn.client.getXhrManager();
  /**
   * @final
   * @private
   */
  this.id_ = 'sr' + (ydn.client.SimpleHttpRequest.IdCount_++);
  /**
   * @final
   * @protected
   * @type {ydn.client.HttpRequestData}
   */
  this.req_data = args;
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
 * @param {function(this: T, Object, ydn.client.HttpRespondData)?} cb
 * @param {T=} opt_obj scope.
 * @template T
 */
ydn.client.SimpleHttpRequest.prototype.execute = function(cb, opt_obj) {
  goog.asserts.assert(this.xm_, this + ' already executed.');
  var data = this.req_data;
  var url = new goog.Uri(data.path);
  for (var key in data.params) {
    url.setParameterValue(key, data.params[key]);
  }
  var callback = function(e) {
    var xhr = /** @type {goog.net.XhrIo} */ (e.target);
    var body = xhr.getResponse();
    var json = null;
    var is_json = true; // todo
    if (is_json) {
      if (goog.isObject(body)) {
        json = body;
      } else if (goog.isString(body)) {
        try {
          json = ydn.json.parse(body);
        } catch (je) {
          json = body;
        }
      }
    }
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
    if (cb) {
      cb.call(opt_obj, /** @type {Object} */ (json), resp);
      cb = null;
    }
  };
  this.xm_.send(this.id_, url.toString(),
      data.method, data.body, data.headers, undefined, callback);
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
