/**
 * @license
 * Code City: Testing code.
 *
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Test the ES6 functions of the server.
 * @author fraser@google.com (Neil Fraser)
 */


tests.ObjectIs = function() {
  console.assert(Object.is('foo', 'foo'), 'equal strings');
  console.assert(Object.is(Array, Array), 'equal objects');

  console.assert(!Object.is('foo', 'bar'), 'unequal strings');
  console.assert(!Object.is([], []), 'unequal objects');

  var test = {a: 1};
  console.assert(Object.is(test, test), 'custom object');

  console.assert(Object.is(null, null), 'null');

  console.assert(!Object.is(0, -0), 'unequal zero');
  console.assert(Object.is(-0, -0), 'negative zero');
  console.assert(Object.is(NaN, 0/0), 'NaN');
};

tests.StringBooleanSearchFunctions = function() {
  var str = 'To be, or not to be, that is the question.';

  console.assert(str.includes('To be'), 'Includes "To be"');
  console.assert(str.includes('question'), 'Includes "question"');
  console.assert(!str.includes('nonexistent'), 'Includes "nonexistent"');
  console.assert(!str.includes('To be', 1), 'Includes "To be" (1)');
  console.assert(!str.includes('TO BE'), 'Includes "TO BE"');

  console.assert(str.startsWith('To be'), 'StartsWith "To be"');
  console.assert(!str.startsWith('not to be'), 'StartsWith "not to be"');
  console.assert(str.startsWith('not to be', 10), 'StartsWith "not to be" (10)');

  console.assert(str.endsWith('question.'), 'EndsWith "question."');
  console.assert(!str.endsWith('to be'), 'EndsWith "to be"');
  console.assert(str.endsWith('to be', 19), 'EndsWith "to be" (19)');
};

tests.StringRepeat = function() {
  try {
    'abc'.repeat(-1);
    console.assert(false, 'Repeat Negative');
  } catch (e) {
    console.assert(e.name === 'RangeError',
                   'Repeat Negative Error');
  }
  console.assert('abc'.repeat(0) === '', 'Repeat 0');
  console.assert('abc'.repeat(1) === 'abc', 'Repeat 1');
  console.assert('abc'.repeat(2) === 'abcabc', 'Repeat 2');
  console.assert('abc'.repeat(3.5) === 'abcabcabc', 'Repeat 3.5');
  try {
    'abc'.repeat(1 / 0);
    console.assert(false, 'RegExpPrototypeTestApplyNonRegExpThrows');
  } catch (e) {
    console.assert(e.name === 'RangeError',
                   'RegExpPrototypeTestApplyNonRegExpThrowsError');
  }
};

tests.NumberEpsilon = function() {
  console.assert(Number.EPSILON > 0, 'Epsilon > zero');
  console.assert(Number.EPSILON < 0.001, 'Epsilon < 0.001');
};

tests.NumberIsFinite = function() {
  console.assert(!Number.isFinite(Infinity), 'Number.isFinite Infinity');
  console.assert(!Number.isFinite(NaN), 'Number.isFinite NaN');
  console.assert(!Number.isFinite(-Infinity), 'Number.isFinite -Infinity');
  console.assert(Number.isFinite(0), 'Number.isFinite 0');
  console.assert(Number.isFinite(2e64), 'Number.isFinite 2e64');
  console.assert(!Number.isFinite('0'), 'Number.isFinite "0"');
  console.assert(!Number.isFinite(null), 'Number.isFinite null');
};

tests.NumberIsNaN = function() {
  console.assert(Number.isNaN(NaN), 'Number.isNaN NaN');
  console.assert(Number.isNaN(Number.NaN), 'Number.isNaN Number.NaN');
  console.assert(Number.isNaN(0 / 0), 'Number.isNaN 0 / 0');
  console.assert(!Number.isNaN('NaN'), 'Number.isNaN "NaN"');
  console.assert(!Number.isNaN(undefined), 'Number.isNaN undefined');
  console.assert(!Number.isNaN({}), 'Number.isNaN {}');
  console.assert(!Number.isNaN('blabla'), 'Number.isNaN "blabla"');
  console.assert(!Number.isNaN(true), 'Number.isNaN true');
  console.assert(!Number.isNaN(null), 'Number.isNaN null');
  console.assert(!Number.isNaN(37), 'Number.isNaN 37');
  console.assert(!Number.isNaN('37'), 'Number.isNaN "37"');
  console.assert(!Number.isNaN('37.37'), 'Number.isNaN "37.37"');
  console.assert(!Number.isNaN(''), 'Number.isNaN ""');
  console.assert(!Number.isNaN(' '), 'Number.isNaN " "');
};

tests.NumberIsSafeInteger = function() {
  console.assert(Number.isSafeInteger(3), 'Number.isSafeInteger 3');
  console.assert(!Number.isSafeInteger(Math.pow(2, 53)), 'Number.isSafeInteger 2^53');
  console.assert(Number.isSafeInteger(Math.pow(2, 53) - 1), 'Number.isSafeInteger 2^53-1');
  console.assert(!Number.isSafeInteger(NaN), 'Number.isSafeInteger NaN');
  console.assert(!Number.isSafeInteger(Infinity), 'Number.isSafeInteger Infinity');
  console.assert(!Number.isSafeInteger('3'), 'Number.isSafeInteger "3"');
  console.assert(!Number.isSafeInteger(3.1), 'Number.isSafeInteger 3.1');
  console.assert(Number.isSafeInteger(3.0), 'Number.isSafeInteger 3.0');
};
