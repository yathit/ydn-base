goog.provide('ydn.json');
goog.require('ydn');

/**
 *
 * @define {boolean}
 */
ydn.json.DEBUG = false;

/**
 * Parse JSON using native method if available.
 * This is necessary since closure-library do not use native method.
 *
 * @param {string} json_str
 * @return {Object}
 */
ydn.json.parse = function(json_str) {
  if (!goog.isString(json_str) || goog.string.isEmpty(json_str)) {
    return {};
  }

    try {
      return /** @type {Object} */ (JSON.parse(json_str));
    } catch (e) {
      ydn.logger.warning('parse failed: ' + e);
      if (ydn.json.DEBUG) {
        window.console.log(json_str);
      }
      throw Error(e);
    }

};


/**
 * Parse JSON using native method if available.
 * This is necessary since closure-library do not use native method.
 *
 * @param {Object} json_str
 * @return {string}
 */
ydn.json.stringify = function (json_str) {

  try {
    return JSON.stringify(json_str);
  } catch (e) {
    ydn.logger.warning('stringify failed: ' + e);
    if (ydn.json.DEBUG) {
      window.console.log(json_str);
    }
    return '';
  }
};
