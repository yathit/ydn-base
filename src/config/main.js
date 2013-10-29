
goog.provide('ydn.base.exports');
goog.require('ydn.async.Deferred');

goog.exportProperty(goog.async.Deferred.prototype, 'done',
    goog.async.Deferred.prototype.addCallback);
goog.exportProperty(goog.async.Deferred.prototype, 'fail',
    goog.async.Deferred.prototype.addErrback);
goog.exportProperty(goog.async.Deferred.prototype, 'always',
    goog.async.Deferred.prototype.addBoth);
goog.exportProperty(ydn.async.Deferred.prototype, 'then',
    ydn.async.Deferred.prototype.then);

