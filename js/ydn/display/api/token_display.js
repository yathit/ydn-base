goog.provide('ydn.display.api.TokenDisplay');



/**
 * @interface
 */
ydn.display.api.TokenDisplay = function() {};


/**
 * Set authorize url and show it. If null, hide it.
 * @param {string?} url
 */
ydn.display.api.TokenDisplay.prototype.setAuthorizeUrl = function (url) {};


/**
 * @return {EventTarget}
 */
ydn.display.api.TokenDisplay.prototype.getAuthorizeUrlClick = function() {};



