/**
 * @fileoverview Extern declaration for JsTestDriver that is not in closure testing suite.
 * User: mbikt
 * Date: 4/18/12
 * @see js_test_driver
 * @externs
 */

/**
 *
 * @param {string} name
 */
var TestCase = function(name) {};

/**
 *
 * @param {string} name
 */
var AsyncTestCase = function(name) {};


var assertException = function (msg, callback, error) { // in Closure test, it is assertThrows
};

var jstestdriver = {};


/**
 * http://code.google.com/p/google-api-javascript-client/wiki/ReferenceDocs
 * @constructor
 */
var GapiRequest = function() {};


/**
 * @type {string} The URL to handle the request.
 */
GapiRequest.prototype.path;

/**
 * @type {string} The HTTP request method to use. Default is 'GET'.
 */
GapiRequest.prototype.method;

/**
 * @type {Object} URL params in key-value pair form.
 */
GapiRequest.prototype.params;

/**
 * @type {Object}  Additional HTTP request headers.
 */
GapiRequest.prototype.headers;

/**
 * @type {string} The HTTP request body (applies to PUT or POST).
 */
GapiRequest.prototype.body;


/**
 * @const
 * @type {Object}
 */
var CryptoJS = {};


/**
 * @param {string} s
 * @return {string}
 */
CryptoJS.MD5 = function(s) {};




/**
 * https://developers.facebook.com/docs/javascript/reference/v2.3
 * @const Facebook SDK.
 */
var FB = {};



/**
 * @interface
 */
FB.AuthResponse = function() {};


/**
 * Enum of 'connected', 'not_authorized', or 'unknown'.
 * @type {string}
 */
FB.AuthResponse.prototype.status;


/**
 * @type {Object}
 */
FB.AuthResponse.prototype.photo;


/**
 * Returns the Facebook Login status of a user, with an authResponse object if
 * they are logged in.
 * @param {function(FB.AuthResponse)} callback
 */
FB.getLoginStatus = function(callback) {};



/**
 * @interface
 */
FB.Profile = function() {};


/**
 * @type {string}
 */
FB.Profile.prototype.id;


/**
 * @type {string}
 */
FB.Profile.prototype.first_name;


/**
 * @type {string}
 */
FB.Profile.prototype.name;


/**
 * @type {string}
 */
FB.Profile.prototype.link;


/**
 * Used to initialize and setup the SDK. All other SDK methods must be called after this one.
 * @param {Object} param A collection of initialization parameters that
 * control the setup of the SDK.
 */
FB.init = function(param) {};


/**
 * Make calls to the Graph API.
 * @param {string} path the Graph API endpoint
 * @param {Function} callback the API returns a response.
 */
FB.api = function(path, callback) {};










