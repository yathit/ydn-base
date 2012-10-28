/**
 * @fileoverview Expression.
 *
 * User: kyawtun
 * Date: 28/10/12
 */


goog.provide('ydn.math.Expression');


/**
 * Create a expression by tokesn.
 * @param {Array} tokens
 * @constructor
 */
ydn.math.Expression = function(tokens) {
  /**
   * @final
   * @type {Array}
   */
  this.tokens = tokens;
};


/**
 *
 * @type {Array}
 */
ydn.math.Expression.prototype.tokens = [];
