/**
 * @fileoverview Default HTTP client.
 */


goog.provide('ydn.client.SimpleClient');
goog.require('ydn.client');



/**
 * Singleton simple client.
 * @param {goog.net.XhrManager=} opt_xm xhr manager.
 * @constructor
 * @implements {ydn.client.Client}
 */
ydn.client.SimpleClient = function(opt_xm) {
  this.xm_ = goog.isDef(opt_xm) ? // use default only if not null.
      opt_xm : ydn.client.getXhrManager();
};


/**
 * @type {goog.net.XhrManager}
 * @private
 */
ydn.client.SimpleClient.prototype.xm_;


/**
 * Create a new HTTP request.
 * If callback is provided in the argument, the request is execute immediately.
 * @param {ydn.client.HttpRequestData|gapi.client.ReqData} args
 * @return {ydn.client.HttpRequest} Return request object if callback is not
 * provided in the argument.
 */
ydn.client.SimpleClient.prototype.request = function(args) {
  args = ydn.client.HttpRequestData.wrap(args);
  var req = new ydn.client.SimpleHttpRequest(args, this.xm_);
  if (args.callback) {
    req.execute(args.callback);
    return null;
  } else {
    return req;
  }
};


/**
 * Get singleton simple client.
 * @return {!ydn.client.SimpleClient}
 */
ydn.client.SimpleClient.getInstance = function() {
  if (!ydn.client.SimpleClient.instance_) {
    ydn.client.SimpleClient.instance_ = new ydn.client.SimpleClient();
  }
  return ydn.client.SimpleClient.instance_;
};


