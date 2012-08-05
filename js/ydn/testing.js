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
 * @fileoverview Utilities useful in testing.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.testing');
goog.require('goog.math');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Console');
goog.require('goog.debug.FancyWindow');
goog.require('goog.debug.DebugWindow');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.Logger');
goog.require('goog.debug.Logger.Level');


/**
 * Show debug information, OFF = 0, INFO = 1, FINE = 2, FINEST = 3, ALL = 4
 * @param {number=} level default to INFO
 * @param {number=} output_type 0) console 1) div 3) funcy window
 */
ydn.testing.showDebug = function(level, output_type) {
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
 * Normal deviate function.
 * @see #randomNormal
 * @return {number} return a normally distributed pseudorandom numbers.
 */
ydn.testing.randn = function() {
  // base on jstat library
  var u, v, x, y, q, mat;

  do {
    u = Math.random();
    v = 1.7156 * (Math.random() - 0.5);
    x = u - 0.449871;
    y = Math.abs(v) + 0.386595;
    q = x * x + y * (0.19600 * y - 0.25472 * x);
  } while (q > 0.27597 && (q > 0.27846 || v * v > -4 * Math.log(u) * u * u));
  return v / u;
};


/**
 * Generate normally distributed random around given std and mean
 *
 * @param {number=} opt_mean mean value, default to 0.
 * @param {number=} opt_stdev standard deviation, default to 1.
 * @return {number} return a normally distributed pseudorandom numbers of given
 * standard deviation and mean.
 */
ydn.testing.randomNormal = function(opt_mean, opt_stdev) {
  var x = ydn.testing.randn();
  if (goog.isDef(opt_mean) || goog.isDef(opt_stdev)) {
    if (!goog.isDef(opt_mean)) {
      opt_mean = 0;
    }
    if (!goog.isDef(opt_stdev)) {
      opt_stdev = 1;
    }
    x = x * opt_stdev + opt_mean;
  }
  return x;
};


/**
 * Generate random string
 *
 * @param {number} len require length.
 * @param {string=} opt_charSet character set to be used.
 * @return {string} return random string.
 */
ydn.testing.randString = function(len, opt_charSet) {
  opt_charSet = opt_charSet ||
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * opt_charSet.length);
    randomString += opt_charSet.substring(randomPoz, randomPoz + 1);
  }
  return randomString;
};


/**
 * Generate random id
 *
 * @param {number=} opt_len require length.
 * @return {string} return random id.
 */
ydn.testing.randId = function(opt_len) {
  opt_len = opt_len || 17;
  return ydn.testing.randString(opt_len, 'abcde0123456789');
};


/**
 * Generate random digit string
 *
 * @param {number=} opt_len require length.
 * @return {string} return a random digit string.
 */
ydn.testing.randDigits = function(opt_len) {
  opt_len = opt_len || 8;
  return ydn.testing.randString(opt_len, '0123456789');
};


/**
 * Generate random word with all small letter
 *
 * @param {number=} opt_mean word length mean.
 * @param {number=} opt_max word length maximun.
 * @return {string} random word.
 */
ydn.testing.randWord = function(opt_mean, opt_max) {
  opt_mean = opt_mean || 5;
  opt_max = opt_max || opt_mean * 3;
  var len = goog.math.clamp(ydn.testing.randomNormal(opt_mean, opt_mean - 1), 1,
      opt_max);
  return ydn.testing.randString(len, 'abcdefghijklmnopqrstuvwxyz');
};


/**
 * Generate random name
 *
 * @return {string} return a random name.
 */
ydn.testing.randName = function() {
  return ydn.testing.randString(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') +
      ydn.testing.randWord(3);
};


/**
 * Generate a random email
 *
 * @return {string} return a random email.
 */
ydn.testing.randEmail = function() {
  var id = ydn.testing.randWord();
  return ydn.testing.randWord() + '@gmail.com';
};


