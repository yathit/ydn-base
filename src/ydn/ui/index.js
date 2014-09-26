// Copyright 2012 YDN Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Base utilities for YDN-UI module.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.ui');


/**
 * @type {Document} default template document
 * @private
 */
ydn.ui.template_doc_ = null;


/**
 * @type {?string} default template document URL.
 * @private
 */
ydn.ui.template_url_ = null;


/**
 * Set default template document.
 * @param {Document|string} doc Document or URL of the document to load. Note:
 * Document will be load synchronously.
 */
ydn.ui.setTemplateDocument = function(doc) {
  if (goog.isString(doc)) {
    ydn.ui.template_url_ = doc;
  } else {
    ydn.ui.template_doc_ = doc;
  }
};


/**
 * Load template synchronously.
 * @return {Document}
 * @private
 */
ydn.ui.getTemplateDocument_ = function() {
  if (!ydn.ui.template_doc_) {
    if (goog.DEBUG && !ydn.ui.template_url_) {
      throw new Error('default template document not set.');
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ydn.ui.template_url_, false);
    xhr.onload = function() {
      var parser = new DOMParser();
      ydn.ui.template_doc_ = parser.parseFromString(xhr.responseText, 'text/html');
      xhr = null;
    };
    xhr.send();
  }
  return ydn.ui.template_doc_;
};


/**
 * @param {string} id get template element by id from template document.
 * @param {Document=} opt_doc template document. Default to default template
 * document.
 * @return {Element}
 */
ydn.ui.getTemplateById = function(id, opt_doc) {
  var doc = opt_doc || ydn.ui.getTemplateDocument_();
  var el = doc.documentElement.querySelector('#' + id);
  if (!document.body.contains(el)) {
    el = document.importNode(el, true);
    document.body.appendChild(el);
  }
  return /** @type {Element} */ (el);
};

