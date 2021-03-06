// Copyright (c) 2015 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var test = require('tape');

var captureStdio = require('./lib/capture-stdio.js');
var ConsoleLogger = require('./lib/console-logger.js');

test('can .error("message", new Error())', function (assert) {
    var logger = ConsoleLogger();

    assert.ok(captureStdio('error: hello',
        function logError() {
            logger.error('hello', new Error('lulz'));
        }));

    assert.ok(captureStdio('message=lulz',
        function logError() {
            logger.error('hello', new Error('lulz'));
        }));

    assert.ok(captureStdio('stack=Error: lulz',
        function logError() {
            logger.error('hello', new Error('lulz'));
        }));

    assert.end();
});

test('can error("message", { error: Error() })', function (assert) {
    var logger = ConsoleLogger();

    assert.ok(captureStdio('error: some message',
        function logError() {
            logger.error('some message', {
                error: new Error('some error'),
                other: 'key'
            });
        }));

    assert.ok(captureStdio('message=some error',
        function logError() {
            logger.error('some message', {
                error: new Error('some error'),
                other: 'key'
            });
        }));

    assert.ok(captureStdio('stack=Error: some error',
        function logError() {
            logger.error('some message', {
                error: new Error('some error'),
                other: 'key'
            });
        }));

    assert.end();
});

test('can error(msg, { someKey: Error() })', function (assert) {
    var logger = ConsoleLogger();

    assert.ok(captureStdio('error: some message',
        function logError() {
            logger.error('some message', {
                someKey: new Error('some error'),
                other: 'key'
            });
        }));

    assert.ok(captureStdio('message=some error',
        function logError() {
            logger.error('some message', {
                someKey: new Error('some error'),
                other: 'key'
            });
        }));

    assert.ok(captureStdio('stack=Error: some error',
        function logError() {
            logger.error('some message', {
                someKey: new Error('some error'),
                other: 'key'
            });
        }));

    assert.end();
});
