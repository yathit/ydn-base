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
 * @fileoverview Deferred object having progress callback.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.async.Deferred');
goog.require('goog.async.Deferred');



/**
 * A Deferred with progress event.
 *
 * @param {Function=} opt_onCancelFunction A function that will be called if the
 *     Deferred is canceled. If provided, this function runs before the
 *     Deferred is fired with a {@code CanceledError}.
 * @param {Object=} opt_defaultScope The default object context to call
 *     callbacks and errbacks in.
 * @constructor
 * @extends {goog.async.Deferred}
 * @struct
 * @suppress {checkStructDictInheritance} suppress closure-library code.
 */
ydn.async.Deferred = function(opt_onCancelFunction, opt_defaultScope) {
  goog.base(this, opt_onCancelFunction, opt_defaultScope);
  /**
   * @type {!Array.<Array>} progress listener callbacks.
   */
  this.progbacks_ = [];
};
goog.inherits(ydn.async.Deferred, goog.async.Deferred);


/**
 * Register a callback function to be called for progress events.
 * @param {!function(this:T,?):?} fun The function to be called on progress.
 * @param {T=} opt_scope An optional scope to call the progback in.
 * @return {!goog.async.Deferred} This Deferred.
 * @template T
 */
ydn.async.Deferred.prototype.addProgback = function(fun, opt_scope) {
  this.progbacks_.push([fun, opt_scope]);
  return this;
};


/**
 * Notify to progress callback listers about the progress of the result.
 * @param {*=} opt_value The value.
 */
ydn.async.Deferred.prototype.notify = function(opt_value) {
  for (var i = 0; i < this.progbacks_.length; i++) {
    var progback = this.progbacks_[i][0];
    var scope = this.progbacks_[i][1];
    progback.call(scope, opt_value);
  }
};


/**
 * @inheritDoc
 */
ydn.async.Deferred.prototype.callback = function(opt_result) {
  this.progbacks_.length = 0;
  goog.base(this, 'callback', opt_result);
};


/**
 * @inheritDoc
 */
ydn.async.Deferred.prototype.errback = function(opt_result) {
  this.progbacks_.length = 0;
  goog.base(this, 'errback', opt_result);
};
