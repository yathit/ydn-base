/**
 * @fileoverview Logging convienent function during debug.
 *
 * User: kyawtun
 * Date: 21/10/12
 */

goog.provide('ydn.debug');
goog.provide('ydn.debug.error.ArgumentException');
goog.provide('ydn.debug.error.NotSupportedException');

goog.require('goog.debug.Console');
goog.require('goog.debug.Logger');
goog.require('goog.debug.LogManager');
goog.require('goog.debug.DivConsole');


/**
 * General debug console
 * @type {goog.debug.Console}
 */
ydn.debug.logger_console = null;


/**
 *
 * @type {goog.debug.DivConsole}
 */
ydn.debug.logger_div = null;


/**
 * Show debug information, OFF = 0, INFO = 1, FINE = 2, FINEST = 3, ALL = 4
 * @param {number=} level default to INFO
 * @param {number=} output_type 0) console 1) div 3) funcy window
 * @deprecated use ydn.debug.log instead.
 */
ydn.debug.showDebug = function(level, output_type) {
  output_type = output_type || 0;

  var c;
  if (output_type == 3) {
    c = new goog.debug.FancyWindow();
    c.setEnabled(true);
  } else if (output_type == 2) {
    c = new goog.debug.DebugWindow();
    c.setEnabled(true);
  } else if (output_type == 1) {
    var div = document.createElement("div");
    div.id = 'div_console';
    div.setAttribute('style', 'clear: both');
    document.body.appendChild(div);
    c = new goog.debug.DivConsole(div);
  } else {
    c = new goog.debug.Console();
  }
  c.setCapturing(true);

  var debug_level = goog.debug.Logger.Level.INFO;
  if (level === 0) {
    debug_level = goog.debug.Logger.Level.OFF;
  } else if (level == 1) {
    debug_level = goog.debug.Logger.Level.INFO;
  } else if (level == 2) {
    debug_level = goog.debug.Logger.Level.FINE;
  } else if (level == 3) {
    debug_level = goog.debug.Logger.Level.FINEST;
  } else if (level == 4) {
    debug_level = goog.debug.Logger.Level.ALL;
  }
  goog.debug.LogManager.getRoot().setLevel(debug_level);
};



/**
 * Predefined level are: 'ALL' (0) 'FINEST' (300), 'FINER' (ALL), 'FINE' (500),
 * 'CONFIG' (700), 'INFO' (800), 'WARNING', (900)
 * @param {string=} scope eg: 'ydn.db'.
 * @param {string|number=} level
 * @param {Element=} ele display target DIV. If not provided, it log to console.
 */
ydn.debug.log = function (scope, level, ele) {

  scope = scope || 'ydn';
  var log_level = goog.isNumber(level) ? new goog.debug.Logger.Level('log', level) :
      goog.isString(level) ? goog.debug.Logger.Level.getPredefinedLevel(level.toUpperCase()) :
          goog.debug.Logger.Level.FINE;

  goog.debug.Logger.getLogger(scope).setLevel(log_level);


  if (goog.isDef(ele)) {
    if (!ydn.debug.logger_div) {
      ydn.debug.logger_div = new goog.debug.DivConsole(ele);
      ydn.debug.logger_div.setCapturing(true);
      goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.WARNING);
    }
  } else {
    if (!ydn.debug.logger_console && !ydn.debug.logger_div) {
      ydn.debug.logger_console = new goog.debug.Console();
      ydn.debug.logger_console.setCapturing(true);
      goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.WARNING);
    }
  }
};


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
ydn.debug.error.ArgumentException = function (opt_msg) {
  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ydn.debug.error.ArgumentException);
  } else {
    this.stack = new Error().stack || '';
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.name = 'ydn.ArgumentException';
};
goog.inherits(ydn.debug.error.ArgumentException, Error);


/**
 * Base class for custom error objects.
 * @param {*=} opt_msg The message associated with the error.
 * @constructor
 * @extends {Error}
 */
ydn.debug.error.NotSupportedException = function (opt_msg) {
  // Ensure there is a stack trace.
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, ydn.debug.error.NotSupportedException);
  } else {
    this.stack = new Error().stack || '';
  }

  if (opt_msg) {
    this.message = String(opt_msg);
  }
  this.name = 'ydn.NotSupportedException';
};
goog.inherits(ydn.debug.error.NotSupportedException, Error);