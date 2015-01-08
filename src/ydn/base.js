/**
 * @fileoverview About this file
 */

goog.provide('ydn.base');
goog.provide('ydn.time');
goog.require('goog.log');


/**
 * For JQuery output, deferred functions is slight different and adapt
 * the deferred to jquery style.
 * @define {boolean} true if target compile output is Jquery.
 */
ydn.base.JQUERY = false;


/**
 * Logs a message at the Level.Finest level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.finest = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.log(goog.debug.Logger.Level.FINEST, msg, opt_exception);
  }
};


/**
 * Logs a message at the Level.Finer level.
 * If the logger is currently enabled for the given message level then the
 * given message is forwarded to all the registered output Handler objects.
 * @param {goog.log.Logger} logger
 * @param {goog.debug.Loggable} msg The message to log.
 * @param {Error=} opt_exception An exception associated with the message.
 */
goog.log.finer = function(logger, msg, opt_exception) {
  if (goog.log.ENABLED && logger) {
    logger.log(goog.debug.Logger.Level.FINER, msg, opt_exception);
  }
};


/**
 * @const
 * @type {number}
 */
ydn.time.MINUTE = 60 * 1000;


/**
 * @const
 * @type {number}
 */
ydn.time.HOUR = 60 * ydn.time.MINUTE;


/**
 * @const
 * @type {number}
 */
ydn.time.DAY = 24 * ydn.time.HOUR;


/**
 * @const
 * @type {number}
 */
ydn.time.WEEK = 7 * ydn.time.DAY;


/**
 * Create a next nearest time slot, to make go to date.
 * For example, if current time is '11:09AM', this will return a time of
 * '12:00AM'. If current time is '03:56PM', this will return a time of
 * '05:00PM'.
 * @return {Date}
 */
ydn.time.getNextNominal = function() {
  var date = new Date();
  var y = date.getFullYear();
  var mo = date.getMonth();
  var d = date.getDate();
  var h = date.getHours();
  var m = date.getMinutes();
  if (m > 30) {
    h += 1;
  } else {
    h += 2;
  }
  // Note: when h becomes larger then 24, Date will automatically increment.
  return new Date(y, mo, d, h);
};


