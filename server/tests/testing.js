/**
 * @license
 * Code City: Server Test Runner
 *
 * Copyright 2018 Google Inc.
 * https://github.com/NeilFraser/CodeCity
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
 * @fileoverview General-purpose test infrastructure.
 * @author cpcallen@google.com (Christopher Allen)
 */
'use strict';

const util = require('util');

///////////////////////////////////////////////////////////////////////////////

/**
 * Class that records benchmark results; much like Go's testing.B type.
 * @constructor
 */
function B() {
  this.results = {};
}

/**
 * Report a benchmark or test result.
 * @param {string} status The test result status (e.g., 'OK', 'FAIL', 'SKIP').
 * @param {string} name Name of test.
 * @param {string=} message Additional information to lot about result.
 */
B.prototype.result = function (status, name, message) {
  console.log('%s\t%s', status, name);
  if (message) {
    console.log(message);
  }
  this.results[status] = this.results[status] + 1 || 1;
};

/**
 * Report a benchmark start.
 * @param {string} name Name of test.
 * @param {number} run Which run is this?  (Run 0 is warm-up run.)
 */
B.prototype.start = function (name, run) {
  var r = (run === 0) ? 'WARMUP' : ('RUN ' + run);
  console.log('%s\t%s...', r, name);
  this.startTime = Date.now();
};

/**
 * Report a benchmark end.
 * @param {string} name Name of test.
 * @param {number} run Which run is this?  (Run 0 is warm-up run.)
 */
B.prototype.end = function (name, run) {
  this.endTime = Date.now();
  var r = (run === 0) ? 'WARMUP' : ('RUN ' + run);
  console.log('%s\t%s: %d ms', r, name, this.endTime - this.startTime);
};

/**
 * Report a benchmark or test failure due to crash.
 * @param {string} name Name of test.
 * @param {string=} message Additional info (e.g., stack trace) to log.
 */
B.prototype.crash = function(name, message) {
  this.result('CRASH', name, message);
};

/**
 * Report a bench or test skip.
 * @param {string} name Name of test.
 * @param {string=} message Additional info to log.
 */
B.prototype.skip = function(name, message) {
  this.result('SKIP', name, message);
};

/**
 * Return results as string.
 * @return {string}
 */
B.prototype.toString = function() {
  var lines = ['Totals:'];
  for (var status in this.results) {
    lines.push(util.format('%s\t%d tests', status, this.results[status]));
  }
  return lines.join('\n');
};

///////////////////////////////////////////////////////////////////////////////

/**
 * Class that records test results; much like Go's testing.T type.
 * @constructor
 */
function T() {
  B.call(this);
  this.results['OK'] = 0;
  this.results['FAIL'] = 0;
}

T.prototype = Object.create(B.prototype);
T.prototype.constructor = T;

/**
 * Report a test result.
 * @param {string} status The test result status (e.g., 'OK', 'FAIL', 'SKIP').
 * @param {string} name Name of test.
 * @param {string=} message Additional info to log.
 */
T.prototype.result = function (status, name, message) {
  status === 'OK' || console.log('%s:\t%s', status, name);
  if (message) {
    console.log(message);
  }
  this.results[status] = this.results[status] + 1 || 1;
};

/**
 * Report a test pass.
 * @param {string} name Name of test.
 * @param {string=} message Additional info to log.
 */
T.prototype.pass = function(name, message) {
  this.result('OK', name, message);
};

/**
 * Report a test failure.
 * @param {string} name
 * @param {string=} message
 */
T.prototype.fail = function(name, message) {
  this.result('FAIL', name, message);
};

exports.B = B;
exports.T = T;