

/**
 * @const
 */
var gapi = {};


/**
 * @const
 */
gapi.auth = {};


/**
 * @const
 */
gapi.signin = {};


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
 *
 * @param {Element} login_btn
 * @param {Object} options
 */
gapi.signin.render = function(login_btn, options) {};


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
 * @typedef {{
 *    path: string,
 *    method: (string|undefined),
 *    params: (Object.<string>|undefined),
 *    headers: (Object|undefined),
 *    body: (string|undefined),
 *    callback: (Function|undefined)
 *  }} HTTP request argument data.
 */
gapi.client.ReqData;


/**
 * @typedef {{
 *    body: *,
 *    headers: (Object.<string>|undefined),
 *    status: number,
 *    statusText: (string|undefined)
 *  }} HTTP raw respond data.
 */
gapi.client.RawResp;


/**
 *
 * @param {gapi.client.ReqData} args
 */
gapi.client.request = function(args) {};


/**
 * @param {string} method The method to be executed. For example,
 * plus.people.search from the G+ API.
 * @param {string} version The version of the API which defines the method
 * to be executed. Defaults to v1.
 * @param {Object} rpcParams
 */
gapi.client.rpcRequest = function(method, version, rpcParams) {};



/**
 *
 * @constructor
 */
gapi.client.RpcRequest = function() {};


/**
 * Executes the request and runs the supplied callback on response.
 * @param {function(Object, gapi.client.RawResp)} callback
 */
gapi.client.RpcRequest.prototype.execute = function(callback) {};



/**
 *
 * @constructor
 */
gapi.client.HttpRequest = function() {};


/**
 * Executes the request and runs the supplied callback on response.
 * @param {function(Object, gapi.client.RawResp)} callback
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


/**
 * Loads the client library interface to a particular API.
 * @param {string} lib
 * @param {string} ver
 * @param {Function} cb
 */
gapi.client.load = function(lib, ver, cb) {};


/**
 * @const
 * @type {Object}
 */
gapi.client.storage = {};


/**
 * @const
 * @type {Object}
 */
gapi.client.storage.objects = {};


/**
 * @param {Object} params
 * @return {gapi.client.RpcRequest}
 */
gapi.client.storage.objects.list = function(params) {};


