/**
 * @fileoverview About this file
 */

goog.provide('ydn.chrome.alarms');


/**
 *
 * @param {string} name
 * @return {Alarm}
 */
ydn.chrome.alarms.create = function(name) {
  if (goog.global.chrome && goog.global.chrome.alarms) {
    return chrome.alarms.create(name);
  } else {
    return null;
  }
};


ydn.chrome.setTimeout = function(cb, delay, opt) {

};
