
goog.provide('ydn.base.exports');
goog.require('ydn.async.Deferred');
goog.require('ydn.base');

goog.exportProperty(goog.async.Deferred.prototype, 'done',
    goog.async.Deferred.prototype.addCallback);
goog.exportProperty(goog.async.Deferred.prototype, 'fail',
    goog.async.Deferred.prototype.addErrback);
if (ydn.base.JQUERY) {
  goog.exportProperty(ydn.async.Deferred.prototype, 'then',
      ydn.async.Deferred.prototype.then);
} else {
  goog.exportProperty(goog.async.Deferred.prototype, 'then',
      goog.async.Deferred.prototype.addCallbacks);
}

goog.exportProperty(goog.async.Deferred.prototype, 'always',
    goog.async.Deferred.prototype.addBoth);

