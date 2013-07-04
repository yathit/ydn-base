/**
 * @fileoverview Wrap Google Javascript Client.
 * @link https://developers.google.com/api-client-library/javascript/
 */


goog.provide('ydn.client.GapiClient');
goog.require('ydn.client');
goog.require('ydn.client.SimpleClient');



/**
 * Wrap Google Javascript Client.
 * @param {gapi.client} client
 * @constructor
 * @implements {ydn.client.Client}
 */
ydn.client.GapiClient = function(client) {
  goog.asserts.assert(client && 'request' in client, 'HTTP client must have' +
      ' a request method');
  this.client_ = client;
};


/**
 * @type {gapi.client}
 */
ydn.client.GapiClient.prototype.client_;


/**
 * @inheritDoc
 */
ydn.client.GapiClient.prototype.request = function(req_data) {
  var args;
  if (req_data instanceof ydn.client.HttpRequestData) {
    args = {
      'path': req_data.path,
      'method': req_data.method,
      'headers': req_data.headers,
      'params': req_data.params,
      'body': req_data.body
    };
  } else {
    args = req_data;
  }
  var callback = args['callback'] || goog.functions.NULL;
  var req = this.client_.request(args);
  if (req) {
    req.execute(callback);
  }
};


/**
 * Wrap GAPI client.
 * @param {*} client GAPI client, SimpleClient or null.
 * @return {ydn.client.Client}
 */
ydn.client.GapiClient.wrap = function(client) {
  if (client) {
    if (client instanceof ydn.client.SimpleClient) {
      return client;
    } else if (goog.isFunction(client)) {
      var request = client;
      var mock_client = {
        'request': function(args) {
          request(args);
        }
      };
      var mc = /** @type {*} */ (mock_client);
      return new ydn.client.GapiClient(/** @type {gapi.client} */ (mc));
    } else if ('request' in client) {
      return new ydn.client.GapiClient(client);
    } else {
      throw ydn.debug.error.ArgumentException(client +
          ' is not a valid HTTP Client');
    }
  } else {
    return null;
  }
};

