/**
 * @fileOverview List panel for large items.
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
  var el = this.getElement();
  el.appendChild(dom.createDom('DIV', ydn.ui.LazyList.CSS_CLASS));
};


/**
 * Refresh list.
 */
ydn.ui.LazyList.prototype.refresh = function() {
  var cnt = this.getModel().getCount();
  var el = this.getElement().querySelector('.' + ydn.ui.LazyList.CSS_CLASS);
  if (cnt != el.childElementCount) {
    goog.style.setHeight(el, this.renderer_.getHeight() * cnt);
  }
};


/**
 * @override
 */
ydn.ui.LazyList.prototype.enterDocument = function() {
  ydn.ui.LazyList.base(this, 'enterDocument');
  this.refresh();
};
