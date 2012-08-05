/**
 * @fileoverview Async utilities on top of goog.async.
 *
 */


goog.provide('ydn.async');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');


/**
 * Reduce deferred list that return true result.
 * @param {goog.async.DeferredList} dfl
 * @return {!goog.async.Deferred}
 */
ydn.async.reduceAllTrue = function(dfl) {
  var df = new goog.async.Deferred();
  dfl.addCallback(function(list) {
    var all_ok = list.every(function(x) {
      return !!x;
    });
    if (all_ok) {
      df.callback(true);
    } else {
      df.errback(undefined);
    }
  });
  dfl.addErrback(function(x) {
    df.errback(x);
  });
  return df;
};
