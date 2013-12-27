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
  this.no_retry_ = false;
};
goog.inherits(ydn.client.OAuthClient.Request, ydn.client.SimpleHttpRequest);


/**
 * @const
 * @type {boolean}
 */
ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER = false;


/**
 * Insert oauth header.
 * @param {function(this: T, boolean, ydn.client.HttpRespondData)} cb
 * @param {T=} opt_scope scope.
 * @template T
 */
ydn.client.OAuthClient.Request.prototype.insertHeader_ = function(cb, opt_scope) {
  var token = this.parent.token;
  // window.console.log(token);
  if (!token || token.expires < goog.now()) {
    if (this.no_retry_) {
      cb.call(opt_scope, false, new ydn.client.HttpRespondData(0, null, null,
          'refreshing token fail'));
    } else {
      this.no_retry_ = true;
      // window.console.log('refreshing token');
      this.parent.provider.getOAuthToken().addCallbacks(function(x) {
        this.parent.token = /** @type {YdnApiToken} */ (x);
        if (ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER) {
          this.req_data.headers['Authorization'] = 'Bearer ' +
              this.parent.token.access_token;
        } else {
          this.req_data.params['access_token'] = this.parent.token.access_token;
        }
        cb.call(opt_scope, true, null);
      }, function(e) {
        this.parent.token = null;
        cb.call(opt_scope, false, new ydn.client.HttpRespondData(0, null, null,
            'refreshing token fail'));
      }, this);
    }

  } else {
    if (ydn.client.OAuthClient.USE_AUTHORIZATION_HEADER) {
      this.req_data.headers['Authorization'] = 'Bearer ' + token.access_token;
    } else {
      this.req_data.params['access_token'] = token.access_token;
    }
    cb.call(opt_scope, true, null);
  }
};


/**
 * Execute the request.
 * @param {function(this: T, Object, ydn.client.HttpRespondData)?} cb
 * @param {T=} opt_scope scope.
 * @template T
 */
ydn.client.OAuthClient.Request.prototype.execute = function(cb, opt_scope) {
  this.insertHeader_(function(ok, raw) {
    if (ok) {
      ydn.client.OAuthClient.Request.superClass_.execute.call(this, cb, opt_scope);
    } else {
      if (cb) {
        cb.call(opt_scope, null, raw);
      }
    }
  }, this);
};



