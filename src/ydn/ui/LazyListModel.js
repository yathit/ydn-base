/**
 * @fileOverview Lazy list data model.
 */


goog.provide('ydn.ui.LazyListModel');


/**
 * Lazy list data model.
 * @param {number=} opt_count number of items.
 * @constructor
 * @struct
 */
ydn.ui.LazyListModel = function(opt_count) {
  /**
   * @protected
   * @type {number}
   */
  this.count = opt_count || 0;
};


/**
 * @return {number}
 */
ydn.ui.LazyListModel.prototype.getCount = function() {
  return this.count;
};


/**
 * @param {number} at
 * @return {Object}
 */
ydn.ui.LazyListModel.prototype.getItemAt = function(at) {
  return {'id': at, 'name': 'Item ' + at};
};
