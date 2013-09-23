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





