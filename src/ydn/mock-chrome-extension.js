/**
 * @fileoverview Mock chrome extension api.
 */

goog.provide('ydn.testing.MockChromeExtension');


if (!goog.global['chrome']) {
  goog.global['chrome'] = {};
}


if (!goog.global.chrome.extension) {
  goog.global.chrome.extension = {
    'getURL': function(s) {
      return s;
    }
  };
}
