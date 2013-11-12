
goog.require('ydn.geohash');
goog.require('goog.testing.jsunit');




var setUp = function () {


};

var tearDown = function() {
};


var test_hash = function(s, x) {
  var s = ydn.geohash.encode(37.8324, 112.5584);
  console.log(s);
  var result = ydn.geohash.decode(s);
  console.log(result);
};
