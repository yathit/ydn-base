// The MIT License (MIT)
// Copyright © 2013 Mechanobiology Institute, National University of Singapore.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the “Software”), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


/**
 * @fileoverview Google client authentication.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */


goog.provide('ydn.auth.GapiAuth');
goog.require('goog.Timer');
goog.require('mbi.web.base');



/**
 * Create Google client authentication app.
 * @constructor
 * @struct
 */
ydn.auth.GapiAuth = function() {
  /**
   * @type {Array.<string>}
   * @private
   */
  this.lib_ = this.getLib();
  var lbl = this.getApiKey() + ' ' + this.getClientId();
  this.log('gapi ' + lbl);
  /**
   * @type {boolean}
   * @private
   */
  this.auth_result_handled_ = false;
  this.ensureLoaded();
};


/**
 * @define {boolean} log process steps.
 */
ydn.auth.GapiAuth.LOG = false;


/**
 * Ensure handleClientLoad is called. In chrome extension on windows platform
 * handleClientLoad is not called.
 */
ydn.auth.GapiAuth.prototype.ensureLoaded = function() {

  var scripts = document.getElementsByTagName('script');
  var gapi_src = null;
  for (var i = scripts.length - 1; i >= 0; i--) {
    if (goog.string.startsWith(scripts[i].src,
        'https://apis.google.com/js/client:plusone.js') ||
        goog.string.startsWith(scripts[i].src,
            'https://apis.google.com/js/client.js')) {
      gapi_src = scripts[i];
    }
  }
  if (gapi_src) {
    var me = this;
    var tid = window.setInterval(function() {
      me.log('checking auth call');
      if (me.auth_result_handled_) {
        window.clearInterval(tid);
        return;
      }
      var processed = gapi_src.getAttribute('gapi_processed');
      if (processed) {
        window.clearInterval(tid);
      }
      if (processed == 'true') {
        me.log('trying login again');
        gapi.auth.authorize(
            {
              'client_id': me.getClientId(),
              'scope': me.getScope(),
              'immediate': true
            },
            goog.bind(me.handleAuthResult, me));
        /*
         var login_link = document.getElementById('user-login');
         gapi.signin.render(login_link, {
         'callback': goog.bind(this.handleAuthResult, this),
         'clientid': this.getClientId(),
         'cookiepolicy': 'single_host_origin',
         'scope': this.getScope()
         });
         */
      }
    }, 1000);
  } else {
    this.log('gapi script not found.');
  }
};


/**
 * Log if enable.
 * @param {string} msg
 */
ydn.auth.GapiAuth.prototype.log = function(msg) {
  if (ydn.auth.GapiAuth.LOG) {
    window.console.log('GapiAuth:' + msg);
  }
};


/**
 * Return scope.
 * @return {string}
 */
ydn.auth.GapiAuth.prototype.getScope = function() {
  return 'email';
};


/**
 * Get list of gapi client library to load.
 * Eg: ['plus', 'v1', 'storage', 'v1beta2']
 * @return {Array.<string>}
 */
ydn.auth.GapiAuth.prototype.getLib = function() {
  return [];
};


/**
 * @protected
 * @return {string}
 */
ydn.auth.GapiAuth.prototype.getApiKey = function() {
  return mbi.app.base.GAPI_KEY;
};


/**
 * @protected
 * @return {string}
 */
ydn.auth.GapiAuth.prototype.getClientId = function() {
  return '811363880127-5e353fbu63vmo2sug5qfste5go2a5ot1' +
      '.apps.googleusercontent.com';
};


/**
 * Start authenticate to Google.
 */
ydn.auth.GapiAuth.prototype.auth = function() {
  this.log('auth');
  gapi.client.setApiKey(this.getApiKey());
  goog.Timer.callOnce(this.checkAuth, 1, this);
};


/**
 * @protected
 */
ydn.auth.GapiAuth.prototype.checkAuth = function() {
  this.log('checkAuth');
  gapi.auth.authorize(
      {
        'client_id': this.getClientId(),
        'scope': this.getScope(),
        'immediate': true
      },
      goog.bind(this.handleAuthResult, this));
};


/**
 * @param {GapiAuthResult} authResult
 * @protected
 */
ydn.auth.GapiAuth.prototype.handleAuthResult = function(authResult) {
  this.log('handleAuthResult');
  var login_link = document.getElementById('user-login');
  if (ydn.auth.GapiAuth.LOG) {
    window.console.log(authResult);
  }
  this.auth_result_handled_ = true;
  if (authResult && !authResult.error) {
    login_link.textContent = 'logout';
    login_link.onclick = null;
    login_link.href = 'https://accounts.google.com/logout';
    login_link.style.display = 'none'; // don't show logout link
    this.makeApiCall();
  } else {
    login_link.style.display = '';
    login_link.href = '#';
    login_link.onclick = goog.bind(this.handleAuthClick, this);
    login_link.textContent = 'login';
    this.run();
  }
};


/**
 * @protected
 * @param {Event} event
 * @return {boolean}
 */
ydn.auth.GapiAuth.prototype.handleAuthClick = function(event) {
  this.log('handleAuthClick');
  gapi.auth.authorize(
      {
        'client_id': this.getClientId(),
        'scope': this.getScope(),
        'immediate': false
      },
      goog.bind(this.handleAuthResult, this));
  return false;
};


/**
 * @type {boolean}
 * @private
 */
ydn.auth.GapiAuth.prototype.runing_ = false;


/**
 * Run app after, authorization done.
 */
ydn.auth.GapiAuth.prototype.run = function() {
  if (this.runing_) {
    throw new Error('Already run');
  }
  this.runing_ = true;
};


/**
 * Load require library.
 * @param {function(this:ydn.auth.GapiAuth)} cb
 */
ydn.auth.GapiAuth.prototype.loadLibrary = function(cb) {
  this.log('loadLibrary');
  if (this.lib_.length == 0) {
    cb.call(this);
  } else {
    var lib = this.lib_.shift();
    var ver = this.lib_.shift();
    var me = this;
    gapi.client.load(lib, ver, function() {
      if (me.lib_.length == 0) {
        cb.call(me);
      } else {
        me.loadLibrary(cb);
      }
    });
  }
};


/**
 * @protected
 */
ydn.auth.GapiAuth.prototype.makeApiCall = function() {
  this.log('makeApiCall');
  var me = this;
  this.loadLibrary(function() {
    // console.log('lib loaded')
    gapi.client.request({
      'path': 'oauth2/v3/userinfo',
      'callback': function(data) {
        var ele_name = document.getElementById('user-name');
        ele_name.textContent = data['email']; // .replace(/@.+/, '');
        ele_name.style.display = '';
        me.run();
      }
    });
  });
};


/**
 * Handle GAPI load.
 */
ydn.auth.GapiAuth.handleClientLoad = function() {
  // exported on js on load.
  var app = /** @type {ydn.auth.GapiAuth} */ (goog.global['app']);
  app.auth();
};


goog.exportProperty(ydn.auth.GapiAuth.prototype, 'auth',
    ydn.auth.GapiAuth.prototype.auth);
goog.exportSymbol('handleClientLoad', ydn.auth.GapiAuth.handleClientLoad);

