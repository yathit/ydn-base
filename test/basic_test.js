
goog.require('ydn.string');
goog.require('ydn.math.Expression');
goog.require('goog.testing.jsunit');




var setUp = function () {


};

var tearDown = function() {
};


var split_test = function(s, x) {
  assertArrayEquals(s, x, ydn.string.split_space(s));
};

var test_11_split = function() {
  split_test('"a" 1 +', ['"a"', '1', '+']);
  split_test('"a" $1 +', ['"a"', '$1', '+']);
  split_test('"a b" $1 +', ['"a b"', '$1', '+']);
  split_test('\'a b\' "a" +', ["'a b'", '"a"', '+']);
};


var exp_test = function(exp, x, obj, p1) {
  var e = ydn.math.Expression.parseRpn(exp);
  assertEquals(exp, x, e.evaluate(obj, p1));
};

var test_21_expression_rpn_logic = function() {
  exp_test('1 1 ==', true);
  exp_test('1 2 ==', false);
  exp_test('1 \'1\' ==', true);
  exp_test('1 \'1\' ===', false);
  exp_test('1 2 !=', true);
  exp_test('1 \'1\' !==', true);
  exp_test('1 \'1\' !=', false);

  exp_test('1 2 >', true);
  exp_test('1 2 >=', true);
  exp_test('1 1 >=', true);

  exp_test('2 1 <', true);
  exp_test('2 1 <=', true);
  exp_test('1 1 <=', true);

  exp_test('0 !', true);
  exp_test('0 ! !', false);

  exp_test('2 1 < !', false);
};

var test_22_expression_rpn_math = function() {
  exp_test('4 2 +', 6);
  exp_test('1 4 -', 3);
  exp_test('4 2 *', 8);
  exp_test('2 4 /', 2);
};

var test_23_expression_rpn_arguments = function() {

  exp_test('1 $1 +', 3, null, 2);
  exp_test('"a" 3 +', 5, {a: 2});
  exp_test('"a" 3 $1 + +', 6, {a: 2}, 1);
  exp_test("'a' 'b' +", 'ba');
};
