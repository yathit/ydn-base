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

goog.provide('ydn.object');


/**
 * Deep object cloning by JSON stringify/parse
 *
 * @param {Object|Array} obj
 * @return {Object|Array}
 */
ydn.object.clone = function(obj) {
  return ydn.json.parse(ydn.json.stringify(obj));
};



/**
 * compare two objects
 *
 * @param {*} obj1
 * @param {*} obj2
 * @param {Object=} ignore_fields
 * @return {boolean}
 */
ydn.object.isSame = function (obj1, obj2, ignore_fields) {
  ignore_fields = ignore_fields || {};
  if (!goog.isDefAndNotNull(obj1) || !goog.isDefAndNotNull(obj2)) {
    return false;
  } else if (goog.isArray(obj1) && goog.isArray(obj2)) {
    if (obj1.length != obj2.length) {
      return false;
    }
    for (var i = 0; i < obj1.length; i++) {
      var idx = goog.array.find(obj2, function(ele) {
        return ydn.object.isSame(ele, obj1[i]);
      });
      if (idx == -1) {
        //console.log('obj2 do not have ' + obj1[i]);
        return false;
      }
    }
    return true;
  } else if (goog.isArray(obj1)) {
    return obj1.length == 1 && ydn.object.isSame(obj1[0], obj2);
  } else if (goog.isArray(obj2)) {
    return obj2.length == 1 && ydn.object.isSame(obj2[0], obj1);
  } else if (goog.isObject(obj1) && goog.isObject(obj1)) {
    for (var key in obj1) {
      if (obj1.hasOwnProperty(key) && !ignore_fields[key]) {
        var same = ydn.object.isSame(obj1[key], obj2[key]);
        if (!same) {
          return false;
        }
      }
    }
    for (var key in obj2) {
      if (obj2.hasOwnProperty(key) && !ignore_fields[key]) {
        var same = ydn.object.isSame(obj1[key], obj2[key]);
        if (!same) {
          return false;
        }
      }
    }
    return true;
  } else {
    return obj1 === obj2;
  }
};



/**
 * Length of array-like object. If it define {@code length} number field, it return that value.
 *
 * @param {Object} obj
 * @return {number}
 */
ydn.object.length = function(obj) {
  if (obj && obj['length'] && goog.isNumber(obj['length'])) {
    return obj.length;
  }
  var count = 0;
  for (var id in obj) {
    count++;
  }
  return count;
};


/**
 * @see {@link goog.object.extend}
 * @param {Object} target  The source object.
 * @param {...Object} var_args The objects from which values will be copied.
 * @return {Object} extended object
 */
ydn.object.extend = function(target, var_args) {
  var out = ydn.object.clone(target);
  for (var key in var_args) {
    if (var_args.hasOwnProperty(key)) {
      out[key] = var_args[key];
    }
  }
  return out;
};

