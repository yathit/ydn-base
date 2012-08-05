// Copyright 2012 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Async utilities on top of goog.async.
 *
 */


goog.provide('ydn.async');
goog.require('goog.async.Deferred');
goog.require('goog.async.DeferredList');


/**
 * Reduce deferred list that return true result.
 * @param {goog.async.DeferredList} dfl input deferred list.
 * @return {!goog.async.Deferred} reduced deferred.
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
