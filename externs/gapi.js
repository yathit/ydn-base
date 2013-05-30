

/**
 * @const
 */
var gapi = {};


/**
 * @const
 */
gapi.auth = {};


/**
 * @typedef{{
 *   client_id: string,
 *   scope: (Array.<string>|string),
 *   immediate: boolean,
 *   response_type: (string|undefined)
 * }}
 */
var GapiClientDetails;



/**
 *
 * @constructor
 */
var GapiAuthResult = function() {};


/**
 * @type {string}
 */
GapiAuthResult.prototype.access_token;


/**
 * @type {string}
 */
GapiAuthResult.prototype.error;


/**
 * @type {string}
 */
GapiAuthResult.prototype.expires_in;


/**
 * @type {string}
 */
GapiAuthResult.prototype.state;


/**
 *
 * @typedef {{
 *   state: string,
 *   access_token: string,
 *   token_type: string,
 *   expires_in: string
 * }}
 */
var GapiToken;


/**
 *
 * @param {GapiClientDetails} options
 * @param {function(GapiAuthResult)} callback
 */
gapi.auth.authorize = function(options, callback) {};


/**
 * @return {GapiToken}
 */
gapi.auth.getToken = function() {};


/**
 * @const
 */
gapi.client = {};


/**
 *
 * @param {string} key
 */
gapi.client.setApiKey = function(key) {};


/**
 *
 * @param {{
 *    path: string,
 *    method: (string|undefined),
 *    params: (Object|undefined),
 *    headers: (Object|undefined),
 *    body: (string|undefined),
 *    callback: (Function|undefined)}
 *  } args
 */
gapi.client.request = function(args) {};



/**
 *
 * @constructor
 */
gapi.client.HttpRequest = function() {};


/**
 * Executes the request and runs the supplied callback on response.
 * @param {function(Object, string)} callback
 */
gapi.client.HttpRequest.prototype.execute = function(callback) {};



/**
 * https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiclientHttpBatch
 * @constructor
 * @extends {gapi.client.HttpRequest}
 */
gapi.client.HttpBatch = function() {};


/**
 *
 * @param {gapi.client.HttpRequest} httpRequest
 * @param {{
 *   id: string,
 *   callback: function(*, *)
 * }=} opt_params
 */
gapi.client.HttpBatch.prototype.add = function(httpRequest, opt_params) {};


/**
 * @return {!gapi.client.HttpBatch}
 */
gapi.client.newHttpBatch = function() {};
