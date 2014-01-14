/**
 * @fileoverview OAuth client.
 *
 */


goog.provide('ydn.client.OAuthClient');
goog.provide('ydn.client.OAuthProvider');
goog.require('goog.async.Deferred');
goog.require('ydn.client.Client');
goog.require('ydn.client.SimpleHttpRequest');



/**
 * @interface
 */
ydn.client.OAuthProvider = function() {};


/**
 * @return {goog.async.Deferred}
 */
ydn.client.OAuthProvider.prototype.getOAuthToken = goog.abstractMethod;



/**
 * OAuth client.
 * @param {ydn.client.OAuthProvider} provider
 * @param {goog.net.XhrManager} xm xhr manager.
 * @param {boolean=} opt_use_header user authroization header, otherwise use
 * token in parameter.
 * @constructor
 * @implements {ydn.client.Client}
 * @const
 */
ydn.client.OAuthClient = function(provider, xm, opt_use_header) {
  /**
   * @protected
   * @type {ydn.client.OAuthProvider}
   */
  this.provider = provider;
  /**
   * @protected
   * @type {goog.net.XhrManager}
   */
  this.xm = xm;
  /**
   * @protected
   * @type {YdnApiToken}
   */
  this.token = null;
  this.use_header_authorization = goog.isDef(opt_use_header) ? opt_use_header :
      ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER;
};


/**
 * @inheritDoc
 */
ydn.client.OAuthClient.prototype.request = function(req) {
  return new ydn.client.OAuthClient.Request(req, this);
};



/**
 * Request data.
 * @param {ydn.client.HttpRequestData} args
 * @param {ydn.client.OAuthClient} parent xhr manager.
 * @constructor
 * @extends {ydn.client.SimpleHttpRequest}
 */
ydn.client.OAuthClient.Request = function(args, parent) {
  goog.base(this, args, parent.xm);
  /**
   * @final
   * @type {ydn.client.OAuthClient}
   */
  this.parent = parent;
  this.no_retry_ = false;
};
goog.inherits(ydn.client.OAuthClient.Request, ydn.client.SimpleHttpRequest);


/**
 * @define {boolean} debug flag.
 */
ydn.client.OAuthClient.DEBUG = false;


/**
 * @const
 * @type {boolean}
 */
ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER = true;


/**
 * @const
 * @type {ydn.client.HttpRespondData}
 */
ydn.client.OAuthClient.Request.ERR_RESP =
    new ydn.client.HttpRespondData(0, null, null, 'No access token');


/**
 * Execute the request.
 * @param {function(this: T, Object, ydn.client.HttpRespondData)?} cb
 * @param {T=} opt_scope scope.
 * @template T
 */
ydn.client.OAuthClient.Request.prototype.execute = function(cb, opt_scope) {

  var me = this;

  var hasValidToken = function() {
    return me.parent.token && me.parent.token.expires > goog.now();
  };

  var insertHeader = function() {
    if (this.use_header_authorization) {
      me.req_data.headers['Authorization'] = 'Bearer ' + me.parent.token.access_token;
    } else {
      me.req_data.params['access_token'] = me.parent.token.access_token;
    }
  };

  // start
  if (hasValidToken()) {
    insertHeader();
    ydn.client.OAuthClient.Request.superClass_.execute.call(this, function(data, raw) {
      if (raw.getStatus() == 401) { // (Unauthorized)
        if (ydn.client.OAuthClient.DEBUG) {
          window.console.log(me.parent.token);
          window.console.log('Although not expires, refreshing token due to ' + raw.getStatus() + ' ' +
              raw.getStatusText());
        }
        me.parent.provider.getOAuthToken().addCallbacks(function(x) {
          me.parent.token = /** @type {YdnApiToken} */ (x);
          insertHeader();
          ydn.client.OAuthClient.Request.superClass_.execute.call(me, cb, opt_scope);
        }, function(e) {
          me.parent.token = null;
          cb.call(opt_scope, null, ydn.client.OAuthClient.Request.ERR_RESP);
        }, me);
      } else {
        cb.call(opt_scope, data, raw);
      }
    }, this);
  } else {
    this.parent.provider.getOAuthToken().addCallbacks(function(x) {
      me.parent.token = /** @type {YdnApiToken} */ (x);
      insertHeader();
      ydn.client.OAuthClient.Request.superClass_.execute.call(this, cb, opt_scope);
    }, function(e) {
      me.parent.token = null;
      cb.call(opt_scope, null, ydn.client.OAuthClient.Request.ERR_RESP);
    }, this);
  }
};



