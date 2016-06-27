/**
 * The MIT License (MIT)
 *
 * Copyright (C) 2013 Sergi Mansilla
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * @fileOverview List panel for large items.
 *
 * @link https://github.com/sergi/virtual-list
 */


goog.provide('ydn.ui.LazyList');
goog.require('goog.ui.Component');
goog.require('ydn.ui.LazyListModel');
goog.require('ydn.ui.LazyListRenderer');


/**
 *
 * @param {ydn.ui.LazyListModel} model
 * @param {ydn.ui.LazyListRenderer=} opt_renderrer
 * @param {goog.dom.DomHelper=} opt_dom
 * @constructor
 * @extends {goog.ui.Component}
 * @struct
 */
ydn.ui.LazyList = function(model, opt_renderrer, opt_dom) {
  ydn.ui.LazyList.base(this, 'constructor', opt_dom);
  /**
   * @type {ydn.ui.LazyListRenderer}
   * @private
   */
  this.renderer_ = opt_renderrer || new ydn.ui.LazyListRenderer();
  this.setModel(model);

};
goog.inherits(ydn.ui.LazyList, goog.ui.Component);


/**
 * @return {ydn.ui.LazyListModel}
 */
ydn.ui.LazyList.prototype.getModel = function() {
  return /** @type {ydn.ui.LazyListModel} */(ydn.ui.LazyList.base(this, 'getModel'));
};


/**
 * @const
 * @type {string}
 */
ydn.ui.LazyList.CSS_CLASS = 'ydn-lazy-list';


/**
 * @override
 */
ydn.ui.LazyList.prototype.createDom = function() {
  ydn.ui.LazyList.base(this, 'createDom');
  var dom = this.getDomHelper();
  var el = ydn.ui.LazyList.createContainer_('100%', '100%');
  this.setElementInternal(el);

  var scroller = ydn.ui.LazyList.createScroller_(this.renderer_.getHeight() * this.getModel().getCount());
  el.appendChild(scroller);


};


/**
 * Refresh list.
 */
ydn.ui.LazyList.prototype.refresh = function() {
  var cnt = this.getModel().getCount();
  var el = this.getElement().querySelector('.' + ydn.ui.LazyList.CSS_CLASS + ' .ydn-content');
  goog.style.setHeight(el, this.renderer_.getHeight() * cnt);

};


/**
 * @type {number}
 * @private
 */
ydn.ui.LazyList.prototype.lastRepaintY_ = 0;


/**
 * @type {number}
 * @private
 */
ydn.ui.LazyList.prototype.lastScrolled_ = 0;

/**
 * @param {goog.events.BrowserEvent} ev
 * @private
 */
ydn.ui.LazyList.prototype.onScroll_ = function(ev) {
  var el = this.getElement();
  var screenItemsLen = Math.ceil(el.clientHeight / this.renderer_.getHeight());
  var itemHeight = this.renderer_.getHeight();
  var maxBuffer = screenItemsLen * itemHeight;

  var scrollTop = ev.target.scrollTop; // Triggers reflow
  if (!this.lastRepaintY_ || Math.abs(scrollTop - this.lastRepaintY_) > maxBuffer) {
    var first = parseInt(scrollTop / itemHeight) - screenItemsLen;
    self.renderChunk_(this.getElement(), first < 0 ? 0 : first);
    this.lastRepaintY_ = scrollTop;
  }

  this.lastScrolled_ = Date.now();
  ev.preventDefault();
};


/**
 * @override
 */
ydn.ui.LazyList.prototype.enterDocument = function() {
  ydn.ui.LazyList.base(this, 'enterDocument');

  this.getHandler().listen(this.getElement(), 'scroll', this.onScroll_);
};


ydn.ui.LazyList.prototype.reset = function() {
  var el = this.getElement();
  var screenItemsLen = Math.ceil(el.clientHeight / this.renderer_.getHeight());
  // Cache 4 times the number of items that fit in the container viewport
  this.cachedItemsLen = screenItemsLen * 3;
  this.renderChunk_(el, 0);
};


ydn.ui.LazyList.prototype.createRow = function(i) {
  var div = document.createElement('DIV');
  this.renderer_.render(div, this.getModel().getItemAt(i));
  return div;
};


/**
 * Renders a particular, consecutive chunk of the total rows in the list. To
 * keep acceleration while scrolling, we mark the nodes that are candidate for
 * deletion instead of deleting them right away, which would suddenly stop the
 * acceleration. We delete them once scrolling has finished.
 *
 * @param {Node} node Parent node where we want to append the children chunk.
 * @param {Number} from Starting position, i.e. first children index.
 * @return {void}
 */
ydn.ui.LazyList.prototype.renderChunk_ = function(node, from) {
  var finalItem = from + this.cachedItemsLen;
  var totalRows = this.getModel().getCount();
  if (finalItem > totalRows) {
    finalItem = totalRows;
  }


  // Append all the new rows in a document fragment that we will later append to
  // the parent node
  var fragment = document.createDocumentFragment();
  for (var i = from; i < finalItem; i++) {
    fragment.appendChild(this.createRow(i));
  }

  // Hide and mark obsolete nodes for deletion.
  for (var j = 1, l = node.childNodes.length; j < l; j++) {
    node.childNodes[j].style.display = 'none';
    node.childNodes[j].setAttribute('data-rm', '1');
  }
  node.appendChild(fragment);
};


/**
 * @param {string} w
 * @param {string} h
 * @returns {Element}
 * @private
 */
ydn.ui.LazyList.createContainer_ = function(w, h) {
  var c = document.createElement('div');
  c.style.width = w;
  c.style.height = h;
  c.style.overflow = 'auto';
  c.style.position = 'relative';
  c.style.padding = 0;
  c.style.border = '1px solid black';
  return c;
};


/**
 * @private
 * @param {number} h
 * @returns {Element}
 */
ydn.ui.LazyList.createScroller_ = function(h) {
  var scroller = document.createElement('div');
  scroller.style.opacity = 0;
  scroller.style.position = 'absolute';
  scroller.style.top = 0;
  scroller.style.left = 0;
  scroller.style.width = '1px';
  scroller.style.height = h + 'px';
  return scroller;
};

