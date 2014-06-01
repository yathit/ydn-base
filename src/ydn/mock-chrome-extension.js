/**
 * @fileoverview Mock chrome extension api.
 */


/**
 * @define {string} extension origin
 */
_CHROME_EXTENSION_BASE_URL = '';


if (!chrome) {
  chrome = {};
}


if (!chrome.extension) {
  chrome.extension = {
    'getURL': function(s) {
      if (!s) {
        return _CHROME_EXTENSION_BASE_URL;
      } else if (!s.charAt(0) != '/' &&
          _CHROME_EXTENSION_BASE_URL.charAt(0) != '/') {
        s = '/' + s;
      } else if (s.charAt(0) == '/' &&
          _CHROME_EXTENSION_BASE_URL.charAt(0) == '/') {
        s = s.substring(1);
      }
      return _CHROME_EXTENSION_BASE_URL + s;
    }
  };
}
