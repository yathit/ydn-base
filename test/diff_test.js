goog.require('goog.testing.jsunit');
goog.require('ydn.string.diff');


var setUp = function() {

};

var tearDown = function() {

};

var flatLcs = function(f1, f2) {
  var result = [];
  for (var chain = ydn.string.diff.longest_common_subsequence(f1, f2);
       chain.chain !== null;
       chain = chain.chain) {
    result.push([chain.file1index, chain.file2index]);
  }
  result.reverse();
  return result;
};

var str1 = 'The red brown fox jumped over the rolling log';
var str2 = 'The brown spotted fox leaped over the rolling log';

var f1 = str1.split(/ /);
var f2 = str2.split(/ /);

var test_diff_common = function() {

  var result = ydn.string.diff.diff_comm(f1, f2);
  var exp = [
    {common: ['The']},
    {file1: ['red'], file2: []},
    {common: ['brown']},
    {file1: [], file2: ['spotted']},
    {common: ['fox']},
    {file1: ['jumped'], file2: ['leaped']},
    {common: ['over', 'the', 'rolling', 'log']}
  ];
  assertObjectEquals('have same', result, exp);
};

var test_diff_common_string = function() {

  var result = ydn.string.diff.diff_comm(str1, str2);
  var exp = [
    {common: ['T', 'h', 'e', ' ']},
    {file1: ['r', 'e', 'd', ' '], file2: []},
    {common: ['b', 'r', 'o', 'w', 'n', ' ']},
    {file1: [], file2: ['s', 'p', 'o', 't', 't', 'e', 'd', ' ']},
    {common: ['f', 'o', 'x', ' ']},
    {file1: ['j', 'u', 'm'], file2: ['l', 'e', 'a']},
    {common: ['p', 'e', 'd', ' ', 'o', 'v', 'e', 'r', ' ',
      't', 'h', 'e', ' ', 'r', 'o', 'l', 'l', 'i', 'n', 'g', ' ',
      'l', 'o', 'g']}
  ];
  assertObjectEquals('diff_comm string', result, exp);
};


var test_lcs = function() {
  assertArrayEquals('f1 f2', flatLcs(f1, f2),
      [
        [0, 0],
        [2, 1],
        [3, 3],
        [5, 5],
        [6, 6],
        [7, 7],
        [8, 8]
      ]);
  assertArrayEquals('bcbcacb', flatLcs('bcbcacb', 'acbcaca'),
      [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [5, 5]
      ]);

  assertArrayEquals('acba', flatLcs('acba', 'bcbb'), [
    [1, 1],
    [2, 2]
  ]);

  assertArrayEquals('abcabba', flatLcs('abcabba', 'cbabac'),
      [
        [2, 0],
        [3, 2],
        [4, 3],
        [6, 4]
      ]);

  assertArrayEquals('cbabac', flatLcs('cbabac', 'abcabba'),
      [
        [1, 1],
        [2, 3],
        [3, 4],
        [4, 6]
      ]);
};


var test_diff3_merge = function() {
  var o = 'AA ZZ 00 M 99';
  var a = 'AA a b c ZZ new 00 a a M 99';
  var b = 'AA a d c ZZ 11 M z z 99';
  o = o ? o.split(/ /) : [];
  a = a ? a.split(/ /) : [];
  b = b ? b.split(/ /) : [];
  var result = ydn.string.diff.diff3_merge(a, o, b);
  console.log(JSON.stringify(result, null, 2));
  var expected = [
    {
      'ok': [
        'AA'
      ]
    },
    {
      'conflict': {
        'a': [
          'a',
          'b',
          'c'
        ],
        'aIndex': 1,
        'o': [],
        'oIndex': 1,
        'b': [
          'a',
          'd',
          'c'
        ],
        'bIndex': 1
      }
    },
    {
      'ok': [
        'ZZ'
      ]
    },
    {
      'conflict': {
        'a': [
          'new',
          '00',
          'a',
          'a'
        ],
        'aIndex': 5,
        'o': [
          '00'
        ],
        'oIndex': 2,
        'b': [
          '11'
        ],
        'bIndex': 5
      }
    },
    {
      'ok': [
        'M',
        'z',
        'z',
        '99'
      ]
    }
  ];
  assertObjectEquals('diff3 merge', expected, result);
};
