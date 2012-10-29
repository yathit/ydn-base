/**
 * @fileoverview Expression.
 *
 * User: kyawtun
 * Date: 28/10/12
 */


goog.provide('ydn.math.Expression');
goog.require('ydn.string');
goog.require('goog.string');
goog.require('ydn.object');


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


/**
 * Evaluate the expression.
 * @param {Object} with_object
 * @param {...} var_args
 * @return {*}
 */
ydn.math.Expression.prototype.evaluate = function (with_object, var_args) {
  var stack = [];

  for (var i = 0; i < this.tokens.length; i++) {
    var tok = this.tokens[i];
    var is_field_name = tok[0] === '"' && tok[tok.length - 1] === '"';
    var is_string_literal = tok[0] === "'" && tok[tok.length - 1] === "'";

    if (is_field_name) {
      stack.push(with_object[goog.string.stripQuotes(tok, '"')]);
    } else if (is_string_literal) {
      stack.push(goog.string.stripQuotes(tok, "'"));
    } else if (goog.isString(tok)) {
      if (tok === '+') {
        stack.push(stack.pop() + stack.pop());
      } else if (tok === '-') {
        stack.push(stack.pop() - stack.pop());
      } else if (tok === '*') {
        stack.push(stack.pop() * stack.pop());
      } else if (tok === '/') {
        stack.push(stack.pop() / stack.pop());
      } else if (tok === 'abs') {
        stack[stack.length - 1] = Math.abs(stack[stack.length - 1]);
      } else if (tok[0] == '$' && /^\$\d$/.test(tok)) {
        var pos = parseInt(tok.match(/^\$(\d)$/)[1], 10);
        stack.push(arguments[pos]);
      } else {
        stack.push(parseFloat(tok));
      }
    } else {
      stack.push(tok);
    }
  }
  return stack[0];
};


/**
 * Compile into function.
 * @return {Function}
 */
ydn.math.Expression.prototype.compile = function() {
  var tokens = this.tokens;
  return function(obj) {
    var args = arguments.length > 2 ?
      Array.prototype.slice(arguments, 2) : undefined;
    return ydn.math.Expression.prototype.evaluate.apply(null, obj, args);
  }
};


/**
 * @override
 * @return {Object}
 */
ydn.math.Expression.prototype.toJSON = function() {
  return {'Tokens': ydn.object.clone(this.tokens)};
};


/**
 * Parse reverse polish notation statement into expression.
 * @param {string} expression
 * @return {!ydn.math.Expression.parseRpn}
 */
ydn.math.Expression.parseRpn = function(expression) {
  return new ydn.math.Expression(ydn.string.split_space(expression));
};
