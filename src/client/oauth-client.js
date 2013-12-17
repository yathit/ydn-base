/**
 * @fileoverview OAuth client.
 *
 */


goog.provide('ydn.client.OAuthClient');
goog.provide('ydn.client.OAuthProvider');
goog.require('goog.async.Deferred');
goog.require('ydn.client.Client');



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
 * @constructor
 * @implements {ydn.client.Client}
 * @const
 */
ydn.client.OAuthClient = function(provider, xm) {
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
};
goog.inherits(ydn.client.OAuthClient.Request, ydn.client.SimpleHttpRequest);


/**
 * @const
 * @type {boolean}
 */
ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER = true;


/**
 * @inheritDoc
 */
ydn.client.OAuthClient.Request.prototype.execute = function(cb, opt_scope, opt_no_retry) {
  var token = this.parent.token;
  if (token && token.expires < goog.now()) {
    if (ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER) {
      this.req_data.headers['Authorization'] = 'Bearer ' + token.access_token;
    } else {
      this.req_data.params['access_token'] = token.access_token;
    }
    goog.base(this, 'execute', cb, opt_scope);
    return;
  } else if (opt_no_retry) {
    cb.call(opt_scope, null, new ydn.client.HttpRespondData(0));
    return;
  }
  this.parent.provider.getOAuthToken().addCallbacks(function(x) {
    this.parent.token = /** @type {YdnApiToken} */ (x);
    this.execute(cb, opt_scope, true);
  }, function(e) {
    this.parent.token = null;
    cb.call(opt_scope, null, new ydn.client.HttpRespondData(0));
  }, this);
};



