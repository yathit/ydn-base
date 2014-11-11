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
 * @fileoverview Some utilities on top of goog.object module.
 *
 */

goog.provide('ydn.string');


/**
 * Split comma sperated tokens. Token can be possibly double quoted token.
 * @param {string} str string to split.
 * @return {Array.<string>} list of tokens.
 */
ydn.string.split_comma_seperated = function(str) {
  return str.match(/(?:"[^"]*"|[^,])+/g);
};


/**
 * Split string by space separated, possibly double quoted, string.
 * @param {string} str string to be split.
 * @return {Array.<string>} resulting split string.
 */
ydn.string.split_space_seperated = function(str) {
  return str.match(/\w+|"[^"]+"/g);
};


/**
 * Split string by space separated, possibly single or double quoted, string.
 * @param {string} str string to be split.
 * @return {Array.<string>} quote preserved tokens.
 */
ydn.string.split_space = function(str) {
  return str.match(/[^\s"']+|"[^"]*"|'[^']*'/g);
};


/**
 * Normalize phone number.
 * @param {string} ph
 * @return {string?} null if not a valid email.
 */
ydn.string.normalizePhone = function(ph) {
  if (!goog.isString(ph)) {
    return null;
  }
  return ph.replace(/\D/g, '').replace(/^0+/, '');
};


/**
 * Normalize email address.
 * @param {string|*} email
 * @return {string?} null if not a valid email.
 */
ydn.string.normalizeEmail = function(email) {
  if (!goog.isString(email)) {
    return null;
  }
  if (!/[\w\+]+@\w+\.\w+/.test(email)) {
    return null;
  }
  // remove name from email label, such as 'brandi steel <brandiengage@gmail.com>'
  email = email.replace(/.*</, '').replace(/>.*/, '');
  email = email.toLowerCase();
  // remove + and . before @ sign
  // http://gmailblog.blogspot.sg/2008/03/2-hidden-ways-to-get-more-from-your.html
  email = email.replace(/\+\w*?@/, '@'); // normalize for gmail using +
  // should we be using regexp?
  for (var i = email.indexOf('@'); i >= 0; i--) {
    if (email.charAt(i) == '.') {
      email.slice(i, 1);
    }
  }
  return email;
};


/**
 * Join list of string by comma and lastly by word 'and'.
 * @param {Array.<string>} items
 * @return {string} string joining all items by comma separated and and.
 */
ydn.string.joinWithCommaAnd = function(items) {
  var n = items.length;
  if (n == 0) {
    return '';
  } else if (n == 1) {
    return items[0];
  } else if (n == 2) {
    return items[0] + ' and ' + items[1];
  } else {
    var city_name = items.slice(0, n - 2).join(', ');
    return city_name + ', ' + items[n - 2] + ' and ' + items[n - 1];
  }
};





