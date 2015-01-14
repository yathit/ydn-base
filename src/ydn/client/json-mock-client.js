/**
 * @fileoverview Mock server for REST resource in JSON format.
 */

goog.provide('ydn.client.JsonMockClient');
goog.require('ydn.client.MockClient');



/**
 * <pre>
 *   client = new ydn.client.JsonMockClient(1);
 *   client.setResources([{
 *     method: 'GET',
 *     url: 'http://localhost/test',
 *     resp: {
 *       body: 'OK'
 *       status: 200
 *     }
 *   }]);
 * </pre>
 * Mock server for REST resource in JSON format.
 * @param {number=} opt_delay server respond time, default to 0 for
 * synchronous respond.
 * @constructor
 * @struct
 * @extends {ydn.client.MockClient}
 */
ydn.client.JsonMockClient = function(opt_delay) {
  ydn.client.JsonMockClient.base(this, 'constructor', opt_delay);
  /**
   * @type {Array<ydn.client.JsonMockClient.ReqObj>}
   */
  this.resources = [];
};
goog.inherits(ydn.client.JsonMockClient, ydn.client.MockClient);


/**
 * @typedef {{
 *   body: Object,
 *   status: number,
 *   statusText: (string|undefined)
 * }}
 */
ydn.client.JsonMockClient.RespObj;


/**
 * @typedef {{
 *   method: string,
 *   url: string,
 *   resp: ydn.client.JsonMockClient.RespObj
 * }}
 */
ydn.client.JsonMockClient.ReqObj;


/**
 * Set resources to respoind the request.
 * @param {Array<ydn.client.JsonMockClient.ReqObj>} res
 */
ydn.client.JsonMockClient.prototype.setResources = function(res) {
  this.resources = res;
};


/**
 * Set resource stored in JSON file in server.
 * @param {string} url
 */
ydn.client.JsonMockClient.prototype.setResourcesByUrl = function(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  var me = this;
  xhr.onload = function() {
    me.resources = JSON.parse(xhr.responseText);
  };
  xhr.send(null);
};


/**
 * Add a resource
 * @param {string} mth 'GET', 'POST'
 * @param {string} url
 * @param {ydn.client.JsonMockClient.RespObj} resp
 */
ydn.client.JsonMockClient.prototype.addResource = function(mth, url, resp) {
  this.resources.push({
    method: mth,
    url: url,
    resp: resp
  });
};


/**
 * Set a resource
 * @param {string} mth 'GET', 'POST'
 * @param {string} url
 * @param {ydn.client.JsonMockClient.RespObj} resp
 * @return {number} 1 if added, 0 if replace the resource.
 */
ydn.client.JsonMockClient.prototype.setResource = function(mth, url, resp) {
  for (var i = 0; i < this.resources.length; i++) {
    if (this.resources[i].method == mth && this.resources[i].url == url) {
      this.resources[i].resp = resp;
      return 0;
    }
  }
  this.resources.push({
    method: mth,
    url: url,
    resp: resp
  });
  return 1;
};


/**
 * @inheritDoc
 */
ydn.client.JsonMockClient.prototype.request = function(req) {
  var r = goog.base(this, 'request', req);
  var resp = r.response;
  resp.status = 404;
  resp.statusText = req.method + ' ' + req.path + ' Not Found';
  for (var i = 0; i < this.resources.length; i++) {
    var res = this.resources[i];
    if (res.method == req.method && res.url == req.path) {
      resp.status = res.resp.status;
      resp.statusText = res.resp.statusText || '';
      resp.body = res.resp.body;
      break;
    }
  }
  return r;
};
