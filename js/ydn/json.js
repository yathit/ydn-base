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
 * @fileoverview Robust JSON wrapper.
 */

goog.provide('ydn.json');
goog.require('goog.debug.Logger');


/**
 *
 * @define {boolean} enable debug to log erronous object.
 */
ydn.json.DEBUG = false;


/**
 * @final
 * @type {goog.debug.Logger}
 */
ydn.json.logger = goog.debug.Logger.getLogger('ydn');


/**
 * Parse JSON using native method if available.
 * This is necessary since closure-library do not use native method.
 *
 * @param {string} json_str string to parse.
 * @return {!Object} parse return object.
 */
ydn.json.parse = function(json_str) {
  if (!goog.isString(json_str) || goog.string.isEmpty(json_str)) {
    return {};
  }
  // compiler should remove try block in non-debug compilation.
  try {
    return /** @type {!Object} */ (JSON.parse(json_str));
  } catch (e) {
    if (ydn.json.DEBUG) {
      window.console.log(json_str);
    }
    throw e;
  }
};


/**
 * Parse JSON using native method if available.
 *
 * This is necessary since closure-library do not use native method.
 *
 * @param {Object} json object to stringify.
 * @return {string} result.
 */
ydn.json.stringify = function(json) {

  //try {
  return JSON.stringify(json);
//  } catch (e) {
//    ydn.json.logger.warning('stringify failed: ' + e);
//    if (ydn.json.DEBUG) {
//      window.console.log(json);
//    }
//    return '';
//  }
};
