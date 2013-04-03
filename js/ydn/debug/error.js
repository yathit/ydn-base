/**
 * @fileoverview Utilities function for debug.
 *
 * NOTE: these code are stripped using compiler prefix feature.
 * See more detail in tools/strip_debug.txt file.
 *
 * @author kyawtun@yathit.com <Kyaw Tun>
 */


goog.provide('ydn.debug.error.ArgumentException');
goog.provide('ydn.debug.error.NotSupportedException');
goog.provide('ydn.debug.error.NotImplementedException');
goog.provide('ydn.debug.error.InvalidOperationException');
goog.provide('ydn.debug.error.InternalError');

goog.require('goog.debug.Error');


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {goog.debug.Error}
 */
ydn.debug.error.ArgumentException = function (opt_msg) {
  goog.base(this, opt_msg);
  this.name = 'ydn.error.ArgumentException';
};
goog.inherits(ydn.debug.error.ArgumentException, goog.debug.Error);


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {goog.debug.Error}
 */
ydn.debug.error.NotSupportedException = function (opt_msg) {
  goog.base(this, opt_msg);
  this.name = 'ydn.error.NotSupportedException';
};
goog.inherits(ydn.debug.error.NotSupportedException, goog.debug.Error);


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {goog.debug.Error}
 */
ydn.debug.error.NotImplementedException = function(opt_msg) {
  goog.base(this, opt_msg);
  this.name = 'ydn.error.NotImplementedException';
};
goog.inherits(ydn.debug.error.NotImplementedException, goog.debug.Error);


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {goog.debug.Error}
 */
ydn.debug.error.InvalidOperationException = function(opt_msg) {
  goog.base(this, opt_msg);
  this.name = 'ydn.error.InvalidOperationException';
};
goog.inherits(ydn.debug.error.ArgumentException, goog.debug.Error);


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
ydn.debug.error.InternalError = function(opt_msg) {

  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ydn.debug.error.InternalError);
  } else {
    this.stack = new Error().stack || '';
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.name = 'ydn.error.InternalError';
};
goog.inherits(ydn.debug.error.InternalError, Error);

ydn.debug.error.InternalError.prototype.name = 'ydn.error.InternalError';
