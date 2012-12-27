
goog.provide('ydn.base');
goog.require('goog.async.Deferred');
goog.require('goog.events.EventTarget');

goog.exportProperty(goog.async.Deferred.prototype, 'done',
  goog.async.Deferred.prototype.addCallback);
goog.exportProperty(goog.async.Deferred.prototype, 'fail',
  goog.async.Deferred.prototype.addErrback);
goog.exportProperty(goog.async.Deferred.prototype, 'then',
  goog.async.Deferred.prototype.addCallbacks);

goog.exportProperty(goog.events.EventTarget.prototype, 'addEventListener',
  goog.events.EventTarget.prototype.addEventListener);