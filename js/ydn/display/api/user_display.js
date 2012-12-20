goog.provide('ydn.display.api.UserDisplay');



/**
 * @interface
 */
ydn.display.api.UserDisplay = function() {};



/**
 *
 * @param {string} email
 * @param {boolean=} un_confirmed nickname is not yet confirmed from server, but extracted from the session.
 */
ydn.display.api.UserDisplay.prototype.setNickname = function (email, un_confirmed) {};
//
///**
// *
// * @param {string} label
// */
//ydn.display.api.UserDisplay.prototype.setLoginLabel = function (label) {};


/**
 * @return {EventTarget}
 */
ydn.display.api.UserDisplay.prototype.getLoginClick = function() {};


/**
* @param {string} url
*/
ydn.display.api.UserDisplay.prototype.setLoginUrl = function (url) {};

/**
*
* @param {string} url
*/
ydn.display.api.UserDisplay.prototype.setLogoutUrl = function (url) {};


