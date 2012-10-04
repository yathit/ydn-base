// Copyright 2011 Google Inc. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


/** OAuth 2 core utilities. */
goog.provide('google.oauth2');
goog.provide('google.oauth2.core');
goog.require('google.oauth2.core.config');

google.oauth2.applicationUri = null;
google.oauth2.clientId = null;
/**
 *
 * @type {?string}
 */
google.oauth2.scopes = null;
google.oauth2.oauth2userHint = null;
/**
 *
 * @type {?string}
 */
google.oauth2.overrideSessionIndex = null;
/**
 *
 * @type {?string}
 */
google.oauth2.overrideHostedDomain = null;

goog.scope(function() {

  var oauth2 = google.oauth2;
  var config = oauth2.core.config;

  var applicationUri = google.oauth2.applicationUri;
  var clientId = google.oauth2.clientId;
  var scopes = google.oauth2.scopes;
  var oauth2userHint = google.oauth2.oauth2userHint;
  var overrideSessionIndex = google.oauth2.overrideSessionIndex;
  var overrideHostedDomain = google.oauth2.overrideHostedDomain;

  /**
   * Configure OAuth 2 client ID.
   * @param {?string} value The client ID. A null will be treated as
   *     an empty string which will then be omitted from an
   *     authorization URL.
   */
  oauth2.core.setClientId = function(value) {
    clientId = String((value == null) ? '' : value);
  };

  /**
   * Configure required authorization scopes.
   * @param {string|Array.<string>|null} value The list of required
   *     scopes; an array will be joined with spaces, and null will
   *     be treated as an empty string which will then be omitted
   *     from an authorization URL.
   */
  oauth2.core.setScopes = function(value) {
    if (typeof(value) != 'string') {
      if (value == null) {
        scopes = '';
      } else if (value.length >= 0) {
        scopes = value.join(' ');
      }
    } else {
      scopes = value;
    }
    scopes = String(scopes);
  };

  /**
   * Returns the current session index for Google's multiple sign-in
   * system.
   * @return {?string} The session index, or null.
   */
  oauth2.core.getSessionIndex = function() {
    if (overrideSessionIndex != null) {
      return overrideSessionIndex;
    }
    if (!applicationUri) {
      applicationUri = shindig.uri(window.location.href);
    }
    return applicationUri.getQP(config.SESSION_INDEX_PARAM);
  };

  /**
   * Sets the session index for Google's multiple sign-in system.
   * @param {?string} sessionIndex The session index, or null to
   *     reset to the default value based on the 'authuser' URL
   *     parameter.
   */
  oauth2.core.setSessionIndex = function(sessionIndex) {
    overrideSessionIndex = sessionIndex;
  };

  /**
   * Returns the Google Apps hosted domain.
   * @return {?string} The domain, or null.
   */
  oauth2.core.getHostedDomain = function() {
    if (overrideHostedDomain != null) {
      return overrideHostedDomain;
    }
    if (!applicationUri) {
      applicationUri = shindig.uri(window.location.href);
    }
    return applicationUri.getQP(config.HOSTED_DOMAIN_PARAM);
  };

  /**
   * Sets the Google Apps hosted domain.
   * @param {?string} hostedDomain The domain, or null to reset to
   *     the default value based on the 'hd' URL parameter.
   */
  oauth2.core.setHostedDomain = function(hostedDomain) {
    overrideHostedDomain = hostedDomain;
  };

  /**
   * Sets the user hint for subsequent immediate-mode authorization
   * flows.
   * @param {?string} userHint The user hint (e.g. an email
   *     address), or null to reset the hint.
   */
  oauth2.core.setUserHint = function(userHint) {
    oauth2userHint = userHint;
  };

  /**
   * Returns the current user hint for immediate-mode authorization
   * flows.
   * @return {?string} The user hint, or null if no hint is set.
   */
  oauth2.core.getUserHint = function() {
    return oauth2userHint;
  };

  /**
   * Generates the URL for an OAuth 2 end-user authorization flow.
   * @param {boolean} isImmediate If true, the authorization flow will use the
   *     "immediate" mode which is IFRAME-able and skips all user
   *     interface and either immediately succeeds (due to prior
   *     approval) or fails; otherwise user interface may be
   *     displayed and the flow is not IFRAME-able.
   * @return {string} The authorization URL.
   */
  oauth2.core.getAuthUrl = function(isImmediate) {
    var sessionIndex = oauth2.core.getSessionIndex();
    var hostedDomain = oauth2.core.getHostedDomain();
    var urlParts = [];
    // Request an access token.
    urlParts.push(
      config.AUTH_URL +
        '?' +
        encodeURIComponent(config.RESPONSE_TYPE_PARAM) +
        '=' +
        encodeURIComponent(config.RESPONSE_TYPE_ACCESS_TOKEN_PARAM_VALUE));
    if (clientId) {
      // Client ID.
      urlParts.push(
        encodeURIComponent(config.CLIENT_ID_PARAM) +
          '=' +
          encodeURIComponent(clientId));
    }
    if (scopes) {
      // Authorization scopes.
      urlParts.push(
        encodeURIComponent(config.SCOPE_PARAM) +
          '=' +
          encodeURIComponent(scopes));
    }
    // State to prevent replay and spoofing attacks.
    urlParts.push(
      encodeURIComponent(config.STATE_PARAM) +
        '=' +
        encodeURIComponent(config.AUTH_STATE));
    // Request postMessage result return
    urlParts.push(
      encodeURIComponent(config.POSTMESSAGE_PARAM) +
        '=' +
        encodeURIComponent(config.POSTMESSAGE_PARAM_VALUE));
    // Proxy IFRAME ID for postMessage result return.
    urlParts.push(
      encodeURIComponent(config.PROXY_PARAM) +
        '=' +
        encodeURIComponent(config.PROXY_ID));
    // Application URL origin for postMessage.
    urlParts.push(
      encodeURIComponent(config.ORIGIN_PARAM) +
        '=' +
        encodeURIComponent(config.ORIGIN));
    if (isImmediate) {
      urlParts.push(
        encodeURIComponent(config.IMMEDIATE_PARAM) +
          '=' +
          encodeURIComponent(config.IMMEDIATE_PARAM_VALUE));
      if (oauth2userHint) {
        urlParts.push(
          encodeURIComponent(config.USER_ID_PARAM) +
            '=' +
            encodeURIComponent(oauth2userHint));
        sessionIndex = null;
        hostedDomain = null;
      } else if (!(sessionIndex || hostedDomain)) {
        sessionIndex = '0';
      }
    }
    if (sessionIndex) {
      urlParts.push(
        encodeURIComponent(config.SESSION_INDEX_PARAM) +
          '=' +
          encodeURIComponent(sessionIndex));
    }
    if (hostedDomain) {
      urlParts.push(
        encodeURIComponent(config.HOSTED_DOMAIN_PARAM) +
          '=' +
          encodeURIComponent(hostedDomain));
    }
    return urlParts.join('&');
  };

});
