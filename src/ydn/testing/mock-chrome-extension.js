/**
 * @fileoverview Mock chrome extension api.
 */


goog.provide('ydn.testing.mockExtension');


/**
 * @define {string} extension origin
 */
ydn.testing.mockExtension.BASE_URL = '';


ydn.testing.mockExtension.storage_ = {
  'get': function(obj, cb) {
    cb({});
  },
  'set': function(obj, cb) {
    cb({});
  }
};


if (!window.chrome) {
  window.chrome = {};
}


if (!chrome.extension) {
  chrome.extension = {
    'getURL': function(s) {
      if (!s) {
        return ydn.testing.mockExtension.BASE_URL;
      } else if (s.charAt(0) != '/' &&
          ydn.testing.mockExtension.BASE_URL.charAt(0) != '/') {
        s = '/' + s;
      } else if (s.charAt(0) == '/' &&
          ydn.testing.mockExtension.BASE_URL.charAt(0) == '/') {
        s = s.substring(1);
      }
      return ydn.testing.mockExtension.BASE_URL + s;
    }
  };
}

if (!chrome.storage) {
  chrome.storage = {
    'sync': ydn.testing.mockExtension.storage_,
    'local': ydn.testing.mockExtension.storage_,
    'onChanged': {
      'addListener': function() {}
    }
  };
}

