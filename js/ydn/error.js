/**
 * @fileoverview About this file.
 *
 * User: kyawtun
 * Date: 7/9/12
 */

goog.provide('ydn.error');
goog.provide('ydn.error.ArgumentException');




/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
ydn.error.ArgumentException = function(opt_msg) {

  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ydn.error.ArgumentException);
  } else {
    this.stack = new Error().stack || '';
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
};
goog.inherits(ydn.error.ArgumentException, Error);

/** @override */
ydn.error.ArgumentException.prototype.name = 'ArgumentException';



/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
ydn.error.InternalError = function(opt_msg) {

  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ydn.error.InternalError);
  } else {
    this.stack = new Error().stack || '';
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
};
goog.inherits(ydn.error.InternalError, Error);

ydn.error.InternalError.prototype.name = 'InternalError';
