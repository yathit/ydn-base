
goog.require('ydn.geohash');
goog.require('goog.testing.jsunit');




var setUp = function () {


};

var tearDown = function() {
};


var test_hash = function(pos) {
  pos = pos || [37.8324, 112.5584, 12];
  var precision = pos[2];
  var exp_err = 1 / Math.pow(2, 4 * precision/2) * 180;
  var s = ydn.geohash.encode(pos);
  // console.log(s);
  var result = ydn.geohash.decode(s);
  // console.log(pos);
  // console.log(result);
  assertRoughlyEquals('latitude', pos[0], result[0], exp_err);
  assertRoughlyEquals('longitude', pos[1], result[1], exp_err);
};


var test_reg = function() {
  for (var i = 0; i < 100; i++) {
    var lat = Math.random() * 180 - 90;
    var lon = Math.random() * 360 - 180;
    test_hash([lat, lon, 12]);
  }
};

var test_precision = function() {
  // NOTE: this test always pass in chrome, but fail in Firefox
  for (var i = 4; i < 32; i++) {
    var lat = Math.random() * 180 - 90;
    var lon = Math.random() * 360 - 180;
    test_hash([lat, lon, i]);
  }
};
