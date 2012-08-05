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
 * User: kyawtun
 * Date: 5/8/12
 */

goog.provide('ydn.testing');
goog.require('goog.math');


/**
 * Normal deviate function.
 *
 * @return {number} return a normally distributed pseudorandom numbers
 */
ydn.testing.randn = function() {
  // base on jstat library
  var u, v, x, y, q, mat;

  do {
    u = Math.random();
    v = 1.7156 * ( Math.random() - 0.5 );
    x = u - 0.449871;
    y = Math.abs( v ) + 0.386595;
    q = x*x + y * ( 0.19600 * y - 0.25472 * x );
  } while( q > 0.27597 && ( q > 0.27846 || v*v > -4 * Math.log( u ) * u*u ));
  return v / u;
};


/**
 * Generate normally distributed random around given std and mean
 *
 * @param {number=} stdev default to 1
 * @param {number=} mean default to 0
 * @return {number}
 */
ydn.testing.randomNormal = function (mean, stdev) {
  var x = ydn.testing.randn();
  if (goog.isDef(mean) || goog.isDef(stdev)) {
    if (!goog.isDef(mean)) {
      mean = 0;
    }
    if (!goog.isDef(stdev)) {
      stdev = 1;
    }
    x = x * stdev + mean;
  }
  return x;
};


/**
 * Generate random string
 *
 * @param {number} len
 * @param {string=} charSet
 */
ydn.testing.randString = function(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
    var randomPoz = Math.floor(Math.random() * charSet.length);
    randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
};


/**
 * Generate random string
 *
 * @param {number=} len
 */
ydn.testing.randId = function(len) {
  len = len || 17;
  return ydn.testing.randString(len, 'abcde0123456789');
};

/**
 * Generate random digit string
 *
 * @param {number=} len
 */
ydn.testing.randDigits = function(len) {
  len = len || 8;
  return ydn.testing.randString(len, '0123456789');
};


/**
 * Generate random word with all small letter
 *
 * @param {number=} mean
 * @param {number=} max
 * @return {string}
 */
ydn.testing.randWord = function(mean, max) {
  mean = mean || 5;
  max = max || mean*3;
  var len = goog.math.clamp(ydn.testing.randomNormal(mean, mean-1), 1, max);
  return ydn.testing.randString(len, 'abcdefghijklmnopqrstuvwxyz');
};



/**
 * Generate random name
 *
 * @return {string}
 */
ydn.testing.randName = function() {
  return ydn.testing.randString(1, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') + ydn.testing.randWord(3);
};


/**
 * Generate a random email
 *
 * @return {string}
 */
ydn.testing.randEmail = function() {
  var id = ydn.testing.randWord();
  return ydn.testing.randWord() + '@gmail.com';
};


