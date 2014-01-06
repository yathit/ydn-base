/**
 * @fileoverview Proxy client respecting 'Retry-After' header. Request are
 * execute serially.
 */


goog.provide('ydn.client.Proxy');
goog.provide('ydn.client.SerialProxy');
goog.require('goog.async.Deferred');
goog.require('ydn.client.Client');
goog.require('ydn.client.SimpleHttpRequest');



/**
 * OAuth client.
 * @param {ydn.client.Client} client
 * @param {string} proxy_path xhr manager.
 * @constructor
 * @implements {ydn.client.Client}
 * @const
 */
ydn.client.Proxy = function(client, proxy_path) {
  /**
   * @protected
   * @type {ydn.client.Client}
   */
  this.client = client;
  /**
   * @protected
   * @type {string}
   */
  this.proxy_path = proxy_path;
  /**
   * @protected
   * @type {number}
   */
  this.next_retry = NaN;
  /**
   * @type {Array.<ydn.client.Proxy.Request>}
   * @private
   */
  this.reqs_ = [];
  /**
   * True in request.
   * @type {boolean}
   * @private
   */
  this.in_req_ = false;
};


/**
 * @inheritDoc
 */
ydn.client.Proxy.prototype.request = function(req) {
  return new ydn.client.Proxy.Request(req, this);
};



/**
 * Request data.
 * @param {ydn.client.HttpRequestData} args
 * @param {ydn.client.Proxy} parent xhr manager.
 * @constructor
 * @extends {ydn.client.SimpleHttpRequest}
 * @struct
 */
ydn.client.Proxy.Request = function(args, parent) {
  args.path = parent.proxy_path + args.path;
  /**
   * @protected
   * @final
   * @type {!ydn.client.HttpRequest}
   */
  this.req = parent.client.request(args);
  /**
   * @final
   * @type {ydn.client.Proxy}
   */
  this.parent = parent;
  /**
   * @type {Function}
   * @private
   */
  this.cb_ = null;
  this.scope_ = undefined;
};
goog.inherits(ydn.client.Proxy.Request, ydn.client.SimpleHttpRequest);


/**
 * @define {boolean} debug flag.
 */
ydn.client.Proxy.DEBUG = true;


/**
 * Execute the request.
 * @param {function(this: T, Object, ydn.client.HttpRespondData)?} cb
 * @param {T=} opt_scope scope.
 * @template T
 */
ydn.client.Proxy.Request.prototype.execute = function(cb, opt_scope) {
  if (this.parent.in_req_) {
    this.cb_ = cb;
    this.scope_ = opt_scope;
    this.parent.reqs_.push(this);
    return;
  }
  this.parent.in_req_ = true;
  /**
   * @this {ydn.client.Proxy.Request}
   * @param {Object} json
   * @param {ydn.client.HttpRespondData} raw
   */
  var handleRequest = function(json, raw) {
    var retry = raw.getHeader('retry-after');
    if (retry) {
      var is_numeric = !/[^0-9|\.]/.test(retry);
      if (is_numeric) {
        // retry after in second.
        this.parent.next_retry = parseFloat(retry) / 1000 + goog.now();
      } else {
        // retry after by date
        this.parent.next_retry = new Date(retry).getTime();
      }
    } else {
      this.parent.next_retry = NaN;
    }
    if (cb) {
      cb.call(opt_scope, json, raw);
    }
    this.parent.in_req_ = false;
    var req = this.parent.reqs_.pop();
    if (req) {
      req.execute(req.cb_, req.scope_);
      req.cb_ = null;
      req.scope_ = null;
    }
  };
  if (this.parent.next_retry && this.parent.next_retry > goog.now()) {
    var intv = this.parent.next_retry - goog.now();
    if (ydn.client.Proxy.DEBUG) {
      goog.global.console.info('Proxy will call after ' + intv + ' ms');
      goog.Timer.callOnce(function() {
        this.req.execute(handleRequest, this);
      }, intv, this);
    }
  } else {
    this.req.execute(handleRequest, this);
  }
};


