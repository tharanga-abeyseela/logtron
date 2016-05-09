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

'use strict';

var Entry = require('../entry.js');
var util = require('util');

module.exports = safeSerializeMeta;

function safeSerializeMeta(entry) {
    var meta = entry.meta;

    var serializedFailed = trySerialize(meta);

    if (serializedFailed !== null) {
        var entryString = util.inspect(entry, { depth: null });
        meta = {
            error: 'logtron failed to serialize meta',
            reason: serializedFailed.message,
            stack: serializedFailed.stack,
            entry: entryString
        };
    }

    return new Entry(entry.level, entry.message, meta, entry.path);
}

function trySerialize(meta) {
    try {
        JSON.stringify(meta);
        return null;
    } catch (e) {
        return e;
    }
}
