
goog.require('ydn.geohash');
goog.require('goog.testing.jsunit');




var setUp = function () {


};

var tearDown = function() {
};


var test_hash = function(pos) {
  pos = pos || [37.8324, 112.5584, 12];
  var precision = pos[2];
  var exp_err = 1 / Math.pow(2, 4 * precision / 2) * 180;
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

var test_ordering = function() {
  var lat = -89;
  var lon = -179;
  var start = ydn.geohash.encode([lat, lon]);
  var prev = ydn.geohash.encode([lat + 1, lon + 1]);
  for (var i = 1; i < 170; i++) {
    var t1 = ydn.geohash.encode([lat + i + 1, lon + (i) * 2]);
    var t01 = ydn.geohash.encode([lat + i, lon + (i + 1) * 2]);
    var t11 = ydn.geohash.encode([lat + i + 1, lon + (i + 1) * 2]);
    assertTrue(t1 + ' > ' + start, t1 > start);
    assertTrue(t01 + ' > ' + start, t01 > start);
    assertTrue(t11 + ' > ' + start, t11 > start);
    assertTrue(t1 + ' > ' + prev, t1 > prev);
    assertTrue(t01 + ' > ' + prev, t01 > prev);
    assertTrue(t11 + ' > ' + prev, t11 > prev);
    prev = t11;
  }
};
