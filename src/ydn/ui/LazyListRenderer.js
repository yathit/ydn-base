/**
 * @fileOverview Lazy list data model.
 */


goog.provide('ydn.ui.LazyListRenderer');


/**
 * Lazy list data model.
 * @param {number=} opt_height item height.
 * @constructor
 * @struct
 */
ydn.ui.LazyListRenderer = function(opt_height) {
  /**
   * @protected
   * @type {number}
   */
  this.height = opt_height || 24;
};


/**
 * @return {number}
 */
ydn.ui.LazyListRenderer.prototype.getHeight = function() {
  return this.height;
};


/**
 * Render on given element.
 * @param {Element} el
 * @param {Object} data
 */
ydn.ui.LazyListRenderer.prototype.render = function(el, data) {
  el.textContent = data['id'] + '. ' + data['name'];
  el.setAttribute('data-id', data['id']);
  goog.style.setHeight(el, this.height);
};

