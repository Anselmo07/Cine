// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}
(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }
  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
};

// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) {
  return [];
};
process.binding = function (name) {
  throw new Error('process.binding is not supported');
};
process.cwd = function () {
  return '/';
};
process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};
process.umask = function () {
  return 0;
};
},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js":[function(require,module,exports) {
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js":[function(require,module,exports) {
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js":[function(require,module,exports) {

var global = arguments[3];
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

},{"base64-js":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/base64-js/index.js","ieee754":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/ieee754/index.js","isarray":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/isarray/index.js","buffer":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"public/bundle.js":[function(require,module,exports) {
var define;
var process = require("process");
var Buffer = require("buffer").Buffer;
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n6 = 0, F = function F() {}; return { s: F, n: function n() { return _n6 >= r.length ? { done: !0 } : { done: !1, value: r[_n6++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _wrapAsyncGenerator(e) { return function () { return new AsyncGenerator(e.apply(this, arguments)); }; }
function AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e.return && (this.return = void 0); }
AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, AsyncGenerator.prototype.throw = function (e) { return this._invoke("throw", e); }, AsyncGenerator.prototype.return = function (e) { return this._invoke("return", e); };
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _asyncGeneratorDelegate(t) { var e = {}, n = !1; function pump(e, r) { return n = !0, r = new Promise(function (n) { n(t[e](r)); }), { done: !1, value: new _OverloadYield(r, 1) }; } return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function () { return this; }, e.next = function (t) { return n ? (n = !1, t) : pump("next", t); }, "function" == typeof t.throw && (e.throw = function (t) { if (n) throw n = !1, t; return pump("throw", t); }), "function" == typeof t.return && (e.return = function (t) { return n ? (n = !1, t) : pump("return", t); }), e; }
function _OverloadYield(e, d) { this.v = e, this.k = d; }
function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }
/*! For license information please see bundle.js.LICENSE.txt */
(function () {
  var e = {
      236: function _(e) {
        e.exports = [{
          title: "Avengers: Endgame ",
          year: 2019,
          director: "Anthony Russo, Joe Russo",
          duration: "3h 1m",
          genre: ["Action", "Adventure", "Sci-Fi"],
          rate: "8,4",
          poster: "https://preview.redd.it/esea05pj84o21.jpg?auto=webp&s=f6c011300de03ef3dc46674c31412b8f00c0b486"
        }, {
          title: "Hombres de negro",
          year: 1997,
          director: "Barry Sonnenfeld",
          duration: "1h 38min",
          genre: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
          rate: 6.2,
          poster: "https://www.lavanguardia.com/peliculas-series/images/movie/poster/1997/7/w1280/gkcT1QmvspJ34rKgFUvv0ho0VrD.jpg"
        }, {
          title: "Titanic Barco",
          year: 1997,
          director: "James Cameron",
          duration: "3h 14min",
          genre: ["Action", "Adventure", "Drama"],
          rate: 6.8,
          poster: "https://play-lh.googleusercontent.com/Vb1dfuu9ga-SwD_dWHVVYsia93uElzfKvLlSSTdGFCpNJ8VIuTpqtv_SXQ56qpX0gxTS"
        }, {
          title: "Harry Potter y el prisionero de Azkaban",
          year: 2004,
          director: "Alfonso Cuarón",
          duration: "2h 22m",
          genre: [, "Adventure", "Sci-Fi", "Fantasy"],
          rate: 7.9,
          poster: "https://img3.hulu.com/user/v3/artwork/82dd3522-80d8-4d1e-94be-77344afa271c?base_image_bucket_name=image_manager&base_image=7d6d2f31-23cb-4ced-a337-54d9cbed482e&size=458x687&format=webp"
        }, {
          title: "Intensa mente 2",
          year: 2024,
          director: "Kelsey Mann",
          duration: "1h 36m",
          genre: ["Drama", "Adventure", "Sci-Fi"],
          rate: 7.6,
          poster: "https://lumiere-a.akamaihd.net/v1/images/1_intensamente_2_payoff_banner_pre_1_aa3d9114.png"
        }];
      },
      396: function _(e, t, r) {
        function n(e) {
          return n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
            return _typeof(e);
          } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
          }, n(e);
        }
        function o() {
          "use strict";

          o = function o() {
            return t;
          };
          var e,
            t = {},
            r = Object.prototype,
            i = r.hasOwnProperty,
            a = Object.defineProperty || function (e, t, r) {
              e[t] = r.value;
            },
            s = "function" == typeof Symbol ? Symbol : {},
            c = s.iterator || "@@iterator",
            u = s.asyncIterator || "@@asyncIterator",
            l = s.toStringTag || "@@toStringTag";
          function f(e, t, r) {
            return Object.defineProperty(e, t, {
              value: r,
              enumerable: !0,
              configurable: !0,
              writable: !0
            }), e[t];
          }
          try {
            f({}, "");
          } catch (e) {
            f = function f(e, t, r) {
              return e[t] = r;
            };
          }
          function d(e, t, r, n) {
            var o = t && t.prototype instanceof b ? t : b,
              i = Object.create(o.prototype),
              s = new _(n || []);
            return a(i, "_invoke", {
              value: A(e, r, s)
            }), i;
          }
          function h(e, t, r) {
            try {
              return {
                type: "normal",
                arg: e.call(t, r)
              };
            } catch (e) {
              return {
                type: "throw",
                arg: e
              };
            }
          }
          t.wrap = d;
          var p = "suspendedStart",
            m = "suspendedYield",
            y = "executing",
            g = "completed",
            v = {};
          function b() {}
          function w() {}
          function E() {}
          var S = {};
          f(S, c, function () {
            return this;
          });
          var O = Object.getPrototypeOf,
            x = O && O(O(P([])));
          x && x !== r && i.call(x, c) && (S = x);
          var R = E.prototype = b.prototype = Object.create(S);
          function T(e) {
            ["next", "throw", "return"].forEach(function (t) {
              f(e, t, function (e) {
                return this._invoke(t, e);
              });
            });
          }
          function L(e, t) {
            function r(o, a, s, c) {
              var u = h(e[o], e, a);
              if ("throw" !== u.type) {
                var l = u.arg,
                  f = l.value;
                return f && "object" == n(f) && i.call(f, "__await") ? t.resolve(f.__await).then(function (e) {
                  r("next", e, s, c);
                }, function (e) {
                  r("throw", e, s, c);
                }) : t.resolve(f).then(function (e) {
                  l.value = e, s(l);
                }, function (e) {
                  return r("throw", e, s, c);
                });
              }
              c(u.arg);
            }
            var o;
            a(this, "_invoke", {
              value: function value(e, n) {
                function i() {
                  return new t(function (t, o) {
                    r(e, n, t, o);
                  });
                }
                return o = o ? o.then(i, i) : i();
              }
            });
          }
          function A(t, r, n) {
            var o = p;
            return function (i, a) {
              if (o === y) throw Error("Generator is already running");
              if (o === g) {
                if ("throw" === i) throw a;
                return {
                  value: e,
                  done: !0
                };
              }
              for (n.method = i, n.arg = a;;) {
                var s = n.delegate;
                if (s) {
                  var c = C(s, n);
                  if (c) {
                    if (c === v) continue;
                    return c;
                  }
                }
                if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
                  if (o === p) throw o = g, n.arg;
                  n.dispatchException(n.arg);
                } else "return" === n.method && n.abrupt("return", n.arg);
                o = y;
                var u = h(t, r, n);
                if ("normal" === u.type) {
                  if (o = n.done ? g : m, u.arg === v) continue;
                  return {
                    value: u.arg,
                    done: n.done
                  };
                }
                "throw" === u.type && (o = g, n.method = "throw", n.arg = u.arg);
              }
            };
          }
          function C(t, r) {
            var n = r.method,
              o = t.iterator[n];
            if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), v;
            var i = h(o, t.iterator, r.arg);
            if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, v;
            var a = i.arg;
            return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, v) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, v);
          }
          function N(e) {
            var t = {
              tryLoc: e[0]
            };
            1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
          }
          function j(e) {
            var t = e.completion || {};
            t.type = "normal", delete t.arg, e.completion = t;
          }
          function _(e) {
            this.tryEntries = [{
              tryLoc: "root"
            }], e.forEach(N, this), this.reset(!0);
          }
          function P(t) {
            if (t || "" === t) {
              var r = t[c];
              if (r) return r.call(t);
              if ("function" == typeof t.next) return t;
              if (!isNaN(t.length)) {
                var o = -1,
                  a = function r() {
                    for (; ++o < t.length;) if (i.call(t, o)) return r.value = t[o], r.done = !1, r;
                    return r.value = e, r.done = !0, r;
                  };
                return a.next = a;
              }
            }
            throw new TypeError(n(t) + " is not iterable");
          }
          return w.prototype = E, a(R, "constructor", {
            value: E,
            configurable: !0
          }), a(E, "constructor", {
            value: w,
            configurable: !0
          }), w.displayName = f(E, l, "GeneratorFunction"), t.isGeneratorFunction = function (e) {
            var t = "function" == typeof e && e.constructor;
            return !!t && (t === w || "GeneratorFunction" === (t.displayName || t.name));
          }, t.mark = function (e) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(e, E) : (e.__proto__ = E, f(e, l, "GeneratorFunction")), e.prototype = Object.create(R), e;
          }, t.awrap = function (e) {
            return {
              __await: e
            };
          }, T(L.prototype), f(L.prototype, u, function () {
            return this;
          }), t.AsyncIterator = L, t.async = function (e, r, n, o, i) {
            void 0 === i && (i = Promise);
            var a = new L(d(e, r, n, o), i);
            return t.isGeneratorFunction(r) ? a : a.next().then(function (e) {
              return e.done ? e.value : a.next();
            });
          }, T(R), f(R, l, "Generator"), f(R, c, function () {
            return this;
          }), f(R, "toString", function () {
            return "[object Generator]";
          }), t.keys = function (e) {
            var t = Object(e),
              r = [];
            for (var n in t) r.push(n);
            return r.reverse(), function e() {
              for (; r.length;) {
                var n = r.pop();
                if (n in t) return e.value = n, e.done = !1, e;
              }
              return e.done = !0, e;
            };
          }, t.values = P, _.prototype = {
            constructor: _,
            reset: function reset(t) {
              if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(j), !t) for (var r in this) "t" === r.charAt(0) && i.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
            },
            stop: function stop() {
              this.done = !0;
              var e = this.tryEntries[0].completion;
              if ("throw" === e.type) throw e.arg;
              return this.rval;
            },
            dispatchException: function dispatchException(t) {
              if (this.done) throw t;
              var r = this;
              function n(n, o) {
                return s.type = "throw", s.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o;
              }
              for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                var a = this.tryEntries[o],
                  s = a.completion;
                if ("root" === a.tryLoc) return n("end");
                if (a.tryLoc <= this.prev) {
                  var c = i.call(a, "catchLoc"),
                    u = i.call(a, "finallyLoc");
                  if (c && u) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  } else if (c) {
                    if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
                  } else {
                    if (!u) throw Error("try statement without catch or finally");
                    if (this.prev < a.finallyLoc) return n(a.finallyLoc);
                  }
                }
              }
            },
            abrupt: function abrupt(e, t) {
              for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                var n = this.tryEntries[r];
                if (n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
                  var o = n;
                  break;
                }
              }
              o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
              var a = o ? o.completion : {};
              return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(a);
            },
            complete: function complete(e, t) {
              if ("throw" === e.type) throw e.arg;
              return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), v;
            },
            finish: function finish(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), j(r), v;
              }
            },
            catch: function _catch(e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var r = this.tryEntries[t];
                if (r.tryLoc === e) {
                  var n = r.completion;
                  if ("throw" === n.type) {
                    var o = n.arg;
                    j(r);
                  }
                  return o;
                }
              }
              throw Error("illegal catch attempt");
            },
            delegateYield: function delegateYield(t, r, n) {
              return this.delegate = {
                iterator: P(t),
                resultName: r,
                nextLoc: n
              }, "next" === this.method && (this.arg = e), v;
            }
          }, t;
        }
        function i(e, t, r, n, o, i, a) {
          try {
            var s = e[i](a),
              c = s.value;
          } catch (e) {
            return void r(e);
          }
          s.done ? t(c) : Promise.resolve(c).then(n, o);
        }
        var a = r(425);
        e.exports = function () {
          var e = document.getElementById("title"),
            t = document.getElementById("year"),
            r = document.getElementById("director"),
            n = document.getElementById("duration"),
            s = document.getElementById("genre"),
            c = document.getElementById("rate"),
            u = document.getElementById("poster"),
            l = document.getElementById("button"),
            f = document.getElementById("buttonBorrar"),
            d = function () {
              var l,
                f = (l = o().mark(function i(l) {
                  var f, d, h, p, m, y, g;
                  return o().wrap(function (o) {
                    for (;;) switch (o.prev = o.next) {
                      case 0:
                        if (l.preventDefault(), f = e.value, d = t.value, h = r.value, p = n.value, m = s.value, y = c.value, g = u.value, !(f && d && h && p && m && y && g)) {
                          o.next = 22;
                          break;
                        }
                        return o.prev = 9, o.next = 12, a.post("".concat(API_URL, "/movies"), {
                          title: f,
                          year: d,
                          director: h,
                          duration: p,
                          genre: m,
                          rate: y,
                          poster: g
                        });
                      case 12:
                        201 === o.sent.status ? alert("Formulario enviado correctamente.") : alert("Hubo un problema al enviar el formulario."), o.next = 20;
                        break;
                      case 16:
                        o.prev = 16, o.t0 = o.catch(9), console.error("Error:", o.t0), alert("Hubo un problema al crear la película.");
                      case 20:
                        o.next = 23;
                        break;
                      case 22:
                        alert("Por favor complete todos los campos del formulario.");
                      case 23:
                      case "end":
                        return o.stop();
                    }
                  }, i, null, [[9, 16]]);
                }), function () {
                  var e = this,
                    t = arguments;
                  return new Promise(function (r, n) {
                    var o = l.apply(e, t);
                    function a(e) {
                      i(o, r, n, a, s, "next", e);
                    }
                    function s(e) {
                      i(o, r, n, a, s, "throw", e);
                    }
                    a(void 0);
                  });
                });
              return function (e) {
                return f.apply(this, arguments);
              };
            }();
          l.addEventListener("click", d), f.addEventListener("click", function () {
            e.value = "", t.value = "", r.value = "", n.value = "", s.value = "", c.value = "", u.value = "", document.getElementById("movieForm").reset(), alert("Campos borrados correctamente.");
          });
        };
      },
      425: function _(e, t, r) {
        "use strict";

        function n(e, t) {
          return function () {
            return e.apply(t, arguments);
          };
        }
        var o = Object.prototype.toString,
          i = Object.getPrototypeOf,
          a = (s = Object.create(null), function (e) {
            var t = o.call(e);
            return s[t] || (s[t] = t.slice(8, -1).toLowerCase());
          });
        var s;
        var c = function c(e) {
            return e = e.toLowerCase(), function (t) {
              return a(t) === e;
            };
          },
          u = function u(e) {
            return function (t) {
              return _typeof(t) === e;
            };
          },
          l = Array.isArray,
          f = u("undefined"),
          d = c("ArrayBuffer"),
          h = u("string"),
          p = u("function"),
          m = u("number"),
          y = function y(e) {
            return null !== e && "object" == _typeof(e);
          },
          g = function g(e) {
            if ("object" !== a(e)) return !1;
            var t = i(e);
            return !(null !== t && t !== Object.prototype && null !== Object.getPrototypeOf(t) || Symbol.toStringTag in e || Symbol.iterator in e);
          },
          v = c("Date"),
          b = c("File"),
          w = c("Blob"),
          E = c("FileList"),
          S = c("URLSearchParams"),
          _map = ["ReadableStream", "Request", "Response", "Headers"].map(c),
          _map2 = _slicedToArray(_map, 4),
          O = _map2[0],
          x = _map2[1],
          R = _map2[2],
          T = _map2[3];
        function L(e, t) {
          var _ref3 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
            _ref3$allOwnKeys = _ref3.allOwnKeys,
            r = _ref3$allOwnKeys === void 0 ? !1 : _ref3$allOwnKeys;
          if (null == e) return;
          var n, o;
          if ("object" != _typeof(e) && (e = [e]), l(e)) for (n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);else {
            var _o = r ? Object.getOwnPropertyNames(e) : Object.keys(e),
              _i = _o.length;
            var _a;
            for (n = 0; n < _i; n++) _a = _o[n], t.call(null, e[_a], _a, e);
          }
        }
        function A(e, t) {
          t = t.toLowerCase();
          var r = Object.keys(e);
          var n,
            o = r.length;
          for (; o-- > 0;) if (n = r[o], t === n.toLowerCase()) return n;
          return null;
        }
        var C = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : r.g,
          N = function N(e) {
            return !f(e) && e !== C;
          },
          j = (_ = "undefined" != typeof Uint8Array && i(Uint8Array), function (e) {
            return _ && e instanceof _;
          });
        var _;
        var P = c("HTMLFormElement"),
          F = function (_ref4) {
            var e = _ref4.hasOwnProperty;
            return function (t, r) {
              return e.call(t, r);
            };
          }(Object.prototype),
          k = c("RegExp"),
          B = function B(e, t) {
            var r = Object.getOwnPropertyDescriptors(e),
              n = {};
            L(r, function (r, o) {
              var i;
              !1 !== (i = t(r, o, e)) && (n[o] = i || r);
            }), Object.defineProperties(e, n);
          },
          U = c("AsyncFunction"),
          D = (I = "function" == typeof setImmediate, q = p(C.postMessage), I ? setImmediate : q ? (z = "axios@".concat(Math.random()), M = [], C.addEventListener("message", function (_ref5) {
            var e = _ref5.source,
              t = _ref5.data;
            e === C && t === z && M.length && M.shift()();
          }, !1), function (e) {
            M.push(e), C.postMessage(z, "*");
          }) : function (e) {
            return setTimeout(e);
          });
        var I, q, z, M;
        var H = "undefined" != typeof queueMicrotask ? queueMicrotask.bind(C) : "undefined" != typeof process && process.nextTick || D;
        var J = {
          isArray: l,
          isArrayBuffer: d,
          isBuffer: function isBuffer(e) {
            return null !== e && !f(e) && null !== e.constructor && !f(e.constructor) && p(e.constructor.isBuffer) && e.constructor.isBuffer(e);
          },
          isFormData: function isFormData(e) {
            var t;
            return e && ("function" == typeof FormData && e instanceof FormData || p(e.append) && ("formdata" === (t = a(e)) || "object" === t && p(e.toString) && "[object FormData]" === e.toString()));
          },
          isArrayBufferView: function isArrayBufferView(e) {
            var t;
            return t = "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && d(e.buffer), t;
          },
          isString: h,
          isNumber: m,
          isBoolean: function isBoolean(e) {
            return !0 === e || !1 === e;
          },
          isObject: y,
          isPlainObject: g,
          isReadableStream: O,
          isRequest: x,
          isResponse: R,
          isHeaders: T,
          isUndefined: f,
          isDate: v,
          isFile: b,
          isBlob: w,
          isRegExp: k,
          isFunction: p,
          isStream: function isStream(e) {
            return y(e) && p(e.pipe);
          },
          isURLSearchParams: S,
          isTypedArray: j,
          isFileList: E,
          forEach: L,
          merge: function e() {
            var _ref6 = N(this) && this || {},
              t = _ref6.caseless,
              r = {},
              n = function n(_n, o) {
                var i = t && A(r, o) || o;
                g(r[i]) && g(_n) ? r[i] = e(r[i], _n) : g(_n) ? r[i] = e({}, _n) : l(_n) ? r[i] = _n.slice() : r[i] = _n;
              };
            for (var _e2 = 0, _t = arguments.length; _e2 < _t; _e2++) arguments[_e2] && L(arguments[_e2], n);
            return r;
          },
          extend: function extend(e, t, r) {
            var _ref7 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
              o = _ref7.allOwnKeys;
            return L(t, function (t, o) {
              r && p(t) ? e[o] = n(t, r) : e[o] = t;
            }, {
              allOwnKeys: o
            }), e;
          },
          trim: function trim(e) {
            return e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          },
          stripBOM: function stripBOM(e) {
            return 65279 === e.charCodeAt(0) && (e = e.slice(1)), e;
          },
          inherits: function inherits(e, t, r, n) {
            e.prototype = Object.create(t.prototype, n), e.prototype.constructor = e, Object.defineProperty(e, "super", {
              value: t.prototype
            }), r && Object.assign(e.prototype, r);
          },
          toFlatObject: function toFlatObject(e, t, r, n) {
            var o, a, s;
            var c = {};
            if (t = t || {}, null == e) return t;
            do {
              for (o = Object.getOwnPropertyNames(e), a = o.length; a-- > 0;) s = o[a], n && !n(s, e, t) || c[s] || (t[s] = e[s], c[s] = !0);
              e = !1 !== r && i(e);
            } while (e && (!r || r(e, t)) && e !== Object.prototype);
            return t;
          },
          kindOf: a,
          kindOfTest: c,
          endsWith: function endsWith(e, t, r) {
            e = String(e), (void 0 === r || r > e.length) && (r = e.length), r -= t.length;
            var n = e.indexOf(t, r);
            return -1 !== n && n === r;
          },
          toArray: function toArray(e) {
            if (!e) return null;
            if (l(e)) return e;
            var t = e.length;
            if (!m(t)) return null;
            var r = new Array(t);
            for (; t-- > 0;) r[t] = e[t];
            return r;
          },
          forEachEntry: function forEachEntry(e, t) {
            var r = (e && e[Symbol.iterator]).call(e);
            var n;
            for (; (n = r.next()) && !n.done;) {
              var _r = n.value;
              t.call(e, _r[0], _r[1]);
            }
          },
          matchAll: function matchAll(e, t) {
            var r;
            var n = [];
            for (; null !== (r = e.exec(t));) n.push(r);
            return n;
          },
          isHTMLForm: P,
          hasOwnProperty: F,
          hasOwnProp: F,
          reduceDescriptors: B,
          freezeMethods: function freezeMethods(e) {
            B(e, function (t, r) {
              if (p(e) && -1 !== ["arguments", "caller", "callee"].indexOf(r)) return !1;
              var n = e[r];
              p(n) && (t.enumerable = !1, "writable" in t ? t.writable = !1 : t.set || (t.set = function () {
                throw Error("Can not rewrite read-only method '" + r + "'");
              }));
            });
          },
          toObjectSet: function toObjectSet(e, t) {
            var r = {},
              n = function n(e) {
                e.forEach(function (e) {
                  r[e] = !0;
                });
              };
            return l(e) ? n(e) : n(String(e).split(t)), r;
          },
          toCamelCase: function toCamelCase(e) {
            return e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (e, t, r) {
              return t.toUpperCase() + r;
            });
          },
          noop: function noop() {},
          toFiniteNumber: function toFiniteNumber(e, t) {
            return null != e && Number.isFinite(e = +e) ? e : t;
          },
          findKey: A,
          global: C,
          isContextDefined: N,
          isSpecCompliantForm: function isSpecCompliantForm(e) {
            return !!(e && p(e.append) && "FormData" === e[Symbol.toStringTag] && e[Symbol.iterator]);
          },
          toJSONObject: function toJSONObject(e) {
            var t = new Array(10),
              _r2 = function r(e, n) {
                if (y(e)) {
                  if (t.indexOf(e) >= 0) return;
                  if (!("toJSON" in e)) {
                    t[n] = e;
                    var _o2 = l(e) ? [] : {};
                    return L(e, function (e, t) {
                      var i = _r2(e, n + 1);
                      !f(i) && (_o2[t] = i);
                    }), t[n] = void 0, _o2;
                  }
                }
                return e;
              };
            return _r2(e, 0);
          },
          isAsyncFn: U,
          isThenable: function isThenable(e) {
            return e && (y(e) || p(e)) && p(e.then) && p(e.catch);
          },
          setImmediate: D,
          asap: H
        };
        function V(e, t, r, n, o) {
          Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), r && (this.config = r), n && (this.request = n), o && (this.response = o, this.status = o.status ? o.status : null);
        }
        J.inherits(V, Error, {
          toJSON: function toJSON() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: J.toJSONObject(this.config),
              code: this.code,
              status: this.status
            };
          }
        });
        var G = V.prototype,
          W = {};
        function K(e) {
          return J.isPlainObject(e) || J.isArray(e);
        }
        function X(e) {
          return J.endsWith(e, "[]") ? e.slice(0, -2) : e;
        }
        function $(e, t, r) {
          return e ? e.concat(t).map(function (e, t) {
            return e = X(e), !r && t ? "[" + e + "]" : e;
          }).join(r ? "." : "") : t;
        }
        ["ERR_BAD_OPTION_VALUE", "ERR_BAD_OPTION", "ECONNABORTED", "ETIMEDOUT", "ERR_NETWORK", "ERR_FR_TOO_MANY_REDIRECTS", "ERR_DEPRECATED", "ERR_BAD_RESPONSE", "ERR_BAD_REQUEST", "ERR_CANCELED", "ERR_NOT_SUPPORT", "ERR_INVALID_URL"].forEach(function (e) {
          W[e] = {
            value: e
          };
        }), Object.defineProperties(V, W), Object.defineProperty(G, "isAxiosError", {
          value: !0
        }), V.from = function (e, t, r, n, o, i) {
          var a = Object.create(G);
          return J.toFlatObject(e, a, function (e) {
            return e !== Error.prototype;
          }, function (e) {
            return "isAxiosError" !== e;
          }), V.call(a, e.message, t, r, n, o), a.cause = e, a.name = e.name, i && Object.assign(a, i), a;
        };
        var Y = J.toFlatObject(J, {}, null, function (e) {
          return /^is[A-Z]/.test(e);
        });
        function Q(e, t, r) {
          if (!J.isObject(e)) throw new TypeError("target must be an object");
          t = t || new FormData();
          var n = (r = J.toFlatObject(r, {
              metaTokens: !0,
              dots: !1,
              indexes: !1
            }, !1, function (e, t) {
              return !J.isUndefined(t[e]);
            })).metaTokens,
            o = r.visitor || u,
            i = r.dots,
            a = r.indexes,
            s = (r.Blob || "undefined" != typeof Blob && Blob) && J.isSpecCompliantForm(t);
          if (!J.isFunction(o)) throw new TypeError("visitor must be a function");
          function c(e) {
            if (null === e) return "";
            if (J.isDate(e)) return e.toISOString();
            if (!s && J.isBlob(e)) throw new V("Blob is not supported. Use a Buffer instead.");
            return J.isArrayBuffer(e) || J.isTypedArray(e) ? s && "function" == typeof Blob ? new Blob([e]) : Buffer.from(e) : e;
          }
          function u(e, r, o) {
            var s = e;
            if (e && !o && "object" == _typeof(e)) if (J.endsWith(r, "{}")) r = n ? r : r.slice(0, -2), e = JSON.stringify(e);else if (J.isArray(e) && function (e) {
              return J.isArray(e) && !e.some(K);
            }(e) || (J.isFileList(e) || J.endsWith(r, "[]")) && (s = J.toArray(e))) return r = X(r), s.forEach(function (e, n) {
              !J.isUndefined(e) && null !== e && t.append(!0 === a ? $([r], n, i) : null === a ? r : r + "[]", c(e));
            }), !1;
            return !!K(e) || (t.append($(o, r, i), c(e)), !1);
          }
          var l = [],
            f = Object.assign(Y, {
              defaultVisitor: u,
              convertValue: c,
              isVisitable: K
            });
          if (!J.isObject(e)) throw new TypeError("data must be an object");
          return function e(r, n) {
            if (!J.isUndefined(r)) {
              if (-1 !== l.indexOf(r)) throw Error("Circular reference detected in " + n.join("."));
              l.push(r), J.forEach(r, function (r, i) {
                !0 === (!(J.isUndefined(r) || null === r) && o.call(t, r, J.isString(i) ? i.trim() : i, n, f)) && e(r, n ? n.concat(i) : [i]);
              }), l.pop();
            }
          }(e), t;
        }
        function Z(e) {
          var t = {
            "!": "%21",
            "'": "%27",
            "(": "%28",
            ")": "%29",
            "~": "%7E",
            "%20": "+",
            "%00": "\0"
          };
          return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (e) {
            return t[e];
          });
        }
        function ee(e, t) {
          this._pairs = [], e && Q(e, this, t);
        }
        var te = ee.prototype;
        function re(e) {
          return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        }
        function ne(e, t, r) {
          if (!t) return e;
          var n = r && r.encode || re;
          J.isFunction(r) && (r = {
            serialize: r
          });
          var o = r && r.serialize;
          var i;
          if (i = o ? o(t, r) : J.isURLSearchParams(t) ? t.toString() : new ee(t, r).toString(n), i) {
            var _t2 = e.indexOf("#");
            -1 !== _t2 && (e = e.slice(0, _t2)), e += (-1 === e.indexOf("?") ? "?" : "&") + i;
          }
          return e;
        }
        te.append = function (e, t) {
          this._pairs.push([e, t]);
        }, te.toString = function (e) {
          var t = e ? function (t) {
            return e.call(this, t, Z);
          } : Z;
          return this._pairs.map(function (e) {
            return t(e[0]) + "=" + t(e[1]);
          }, "").join("&");
        };
        var oe = /*#__PURE__*/function () {
            function oe() {
              _classCallCheck(this, oe);
              this.handlers = [];
            }
            return _createClass(oe, [{
              key: "use",
              value: function use(e, t, r) {
                return this.handlers.push({
                  fulfilled: e,
                  rejected: t,
                  synchronous: !!r && r.synchronous,
                  runWhen: r ? r.runWhen : null
                }), this.handlers.length - 1;
              }
            }, {
              key: "eject",
              value: function eject(e) {
                this.handlers[e] && (this.handlers[e] = null);
              }
            }, {
              key: "clear",
              value: function clear() {
                this.handlers && (this.handlers = []);
              }
            }, {
              key: "forEach",
              value: function forEach(e) {
                J.forEach(this.handlers, function (t) {
                  null !== t && e(t);
                });
              }
            }]);
          }(),
          ie = {
            silentJSONParsing: !0,
            forcedJSONParsing: !0,
            clarifyTimeoutError: !1
          },
          ae = {
            isBrowser: !0,
            classes: {
              URLSearchParams: "undefined" != typeof URLSearchParams ? URLSearchParams : ee,
              FormData: "undefined" != typeof FormData ? FormData : null,
              Blob: "undefined" != typeof Blob ? Blob : null
            },
            protocols: ["http", "https", "file", "blob", "url", "data"]
          };
        var se = "undefined" != typeof window && "undefined" != typeof document,
          ce = "object" == (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) && navigator || void 0,
          ue = se && (!ce || ["ReactNative", "NativeScript", "NS"].indexOf(ce.product) < 0),
          le = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && "function" == typeof self.importScripts,
          fe = se && window.location.href || "http://localhost";
        var de = _objectSpread(_objectSpread({}, Object.freeze({
          __proto__: null,
          hasBrowserEnv: se,
          hasStandardBrowserWebWorkerEnv: le,
          hasStandardBrowserEnv: ue,
          navigator: ce,
          origin: fe
        })), ae);
        function he(e) {
          function t(e, r, n, o) {
            var i = e[o++];
            if ("__proto__" === i) return !0;
            var a = Number.isFinite(+i),
              s = o >= e.length;
            return i = !i && J.isArray(n) ? n.length : i, s ? (J.hasOwnProp(n, i) ? n[i] = [n[i], r] : n[i] = r, !a) : (n[i] && J.isObject(n[i]) || (n[i] = []), t(e, r, n[i], o) && J.isArray(n[i]) && (n[i] = function (e) {
              var t = {},
                r = Object.keys(e);
              var n;
              var o = r.length;
              var i;
              for (n = 0; n < o; n++) i = r[n], t[i] = e[i];
              return t;
            }(n[i])), !a);
          }
          if (J.isFormData(e) && J.isFunction(e.entries)) {
            var _r3 = {};
            return J.forEachEntry(e, function (e, n) {
              t(function (e) {
                return J.matchAll(/\w+|\[(\w*)]/g, e).map(function (e) {
                  return "[]" === e[0] ? "" : e[1] || e[0];
                });
              }(e), n, _r3, 0);
            }), _r3;
          }
          return null;
        }
        var pe = {
          transitional: ie,
          adapter: ["xhr", "http", "fetch"],
          transformRequest: [function (e, t) {
            var r = t.getContentType() || "",
              n = r.indexOf("application/json") > -1,
              o = J.isObject(e);
            if (o && J.isHTMLForm(e) && (e = new FormData(e)), J.isFormData(e)) return n ? JSON.stringify(he(e)) : e;
            if (J.isArrayBuffer(e) || J.isBuffer(e) || J.isStream(e) || J.isFile(e) || J.isBlob(e) || J.isReadableStream(e)) return e;
            if (J.isArrayBufferView(e)) return e.buffer;
            if (J.isURLSearchParams(e)) return t.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), e.toString();
            var i;
            if (o) {
              if (r.indexOf("application/x-www-form-urlencoded") > -1) return function (e, t) {
                return Q(e, new de.classes.URLSearchParams(), Object.assign({
                  visitor: function visitor(e, t, r, n) {
                    return de.isNode && J.isBuffer(e) ? (this.append(t, e.toString("base64")), !1) : n.defaultVisitor.apply(this, arguments);
                  }
                }, t));
              }(e, this.formSerializer).toString();
              if ((i = J.isFileList(e)) || r.indexOf("multipart/form-data") > -1) {
                var _t3 = this.env && this.env.FormData;
                return Q(i ? {
                  "files[]": e
                } : e, _t3 && new _t3(), this.formSerializer);
              }
            }
            return o || n ? (t.setContentType("application/json", !1), function (e) {
              if (J.isString(e)) try {
                return (0, JSON.parse)(e), J.trim(e);
              } catch (e) {
                if ("SyntaxError" !== e.name) throw e;
              }
              return (0, JSON.stringify)(e);
            }(e)) : e;
          }],
          transformResponse: [function (e) {
            var t = this.transitional || pe.transitional,
              r = t && t.forcedJSONParsing,
              n = "json" === this.responseType;
            if (J.isResponse(e) || J.isReadableStream(e)) return e;
            if (e && J.isString(e) && (r && !this.responseType || n)) {
              var _r4 = !(t && t.silentJSONParsing) && n;
              try {
                return JSON.parse(e);
              } catch (e) {
                if (_r4) {
                  if ("SyntaxError" === e.name) throw V.from(e, V.ERR_BAD_RESPONSE, this, null, this.response);
                  throw e;
                }
              }
            }
            return e;
          }],
          timeout: 0,
          xsrfCookieName: "XSRF-TOKEN",
          xsrfHeaderName: "X-XSRF-TOKEN",
          maxContentLength: -1,
          maxBodyLength: -1,
          env: {
            FormData: de.classes.FormData,
            Blob: de.classes.Blob
          },
          validateStatus: function validateStatus(e) {
            return e >= 200 && e < 300;
          },
          headers: {
            common: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": void 0
            }
          }
        };
        J.forEach(["delete", "get", "head", "post", "put", "patch"], function (e) {
          pe.headers[e] = {};
        });
        var me = pe;
        var ye = J.toObjectSet(["age", "authorization", "content-length", "content-type", "etag", "expires", "from", "host", "if-modified-since", "if-unmodified-since", "last-modified", "location", "max-forwards", "proxy-authorization", "referer", "retry-after", "user-agent"]),
          ge = Symbol("internals");
        function ve(e) {
          return e && String(e).trim().toLowerCase();
        }
        function be(e) {
          return !1 === e || null == e ? e : J.isArray(e) ? e.map(be) : String(e);
        }
        function we(e, t, r, n, o) {
          return J.isFunction(n) ? n.call(this, t, r) : (o && (t = r), J.isString(t) ? J.isString(n) ? -1 !== t.indexOf(n) : J.isRegExp(n) ? n.test(t) : void 0 : void 0);
        }
        var Ee = /*#__PURE__*/function () {
          function Ee(e) {
            _classCallCheck(this, Ee);
            e && this.set(e);
          }
          return _createClass(Ee, [{
            key: "set",
            value: function set(e, t, r) {
              var n = this;
              function o(e, t, r) {
                var o = ve(t);
                if (!o) throw new Error("header name must be a non-empty string");
                var i = J.findKey(n, o);
                (!i || void 0 === n[i] || !0 === r || void 0 === r && !1 !== n[i]) && (n[i || t] = be(e));
              }
              var i = function i(e, t) {
                return J.forEach(e, function (e, r) {
                  return o(e, r, t);
                });
              };
              if (J.isPlainObject(e) || e instanceof this.constructor) i(e, t);else if (J.isString(e) && (e = e.trim()) && !/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim())) i(function (e) {
                var t = {};
                var r, n, o;
                return e && e.split("\n").forEach(function (e) {
                  o = e.indexOf(":"), r = e.substring(0, o).trim().toLowerCase(), n = e.substring(o + 1).trim(), !r || t[r] && ye[r] || ("set-cookie" === r ? t[r] ? t[r].push(n) : t[r] = [n] : t[r] = t[r] ? t[r] + ", " + n : n);
                }), t;
              }(e), t);else if (J.isHeaders(e)) {
                var _iterator2 = _createForOfIteratorHelper(e.entries()),
                  _step2;
                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    var _step2$value = _slicedToArray(_step2.value, 2),
                      _t4 = _step2$value[0],
                      _n2 = _step2$value[1];
                    o(_n2, _t4, r);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }
              } else null != e && o(t, e, r);
              return this;
            }
          }, {
            key: "get",
            value: function get(e, t) {
              if (e = ve(e)) {
                var _r5 = J.findKey(this, e);
                if (_r5) {
                  var _e3 = this[_r5];
                  if (!t) return _e3;
                  if (!0 === t) return function (e) {
                    var t = Object.create(null),
                      r = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
                    var n;
                    for (; n = r.exec(e);) t[n[1]] = n[2];
                    return t;
                  }(_e3);
                  if (J.isFunction(t)) return t.call(this, _e3, _r5);
                  if (J.isRegExp(t)) return t.exec(_e3);
                  throw new TypeError("parser must be boolean|regexp|function");
                }
              }
            }
          }, {
            key: "has",
            value: function has(e, t) {
              if (e = ve(e)) {
                var _r6 = J.findKey(this, e);
                return !(!_r6 || void 0 === this[_r6] || t && !we(0, this[_r6], _r6, t));
              }
              return !1;
            }
          }, {
            key: "delete",
            value: function _delete(e, t) {
              var r = this;
              var n = !1;
              function o(e) {
                if (e = ve(e)) {
                  var _o3 = J.findKey(r, e);
                  !_o3 || t && !we(0, r[_o3], _o3, t) || (delete r[_o3], n = !0);
                }
              }
              return J.isArray(e) ? e.forEach(o) : o(e), n;
            }
          }, {
            key: "clear",
            value: function clear(e) {
              var t = Object.keys(this);
              var r = t.length,
                n = !1;
              for (; r--;) {
                var _o4 = t[r];
                e && !we(0, this[_o4], _o4, e, !0) || (delete this[_o4], n = !0);
              }
              return n;
            }
          }, {
            key: "normalize",
            value: function normalize(e) {
              var t = this,
                r = {};
              return J.forEach(this, function (n, o) {
                var i = J.findKey(r, o);
                if (i) return t[i] = be(n), void delete t[o];
                var a = e ? function (e) {
                  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, function (e, t, r) {
                    return t.toUpperCase() + r;
                  });
                }(o) : String(o).trim();
                a !== o && delete t[o], t[a] = be(n), r[a] = !0;
              }), this;
            }
          }, {
            key: "concat",
            value: function concat() {
              var _this$constructor;
              for (var _len = arguments.length, e = new Array(_len), _key = 0; _key < _len; _key++) {
                e[_key] = arguments[_key];
              }
              return (_this$constructor = this.constructor).concat.apply(_this$constructor, [this].concat(e));
            }
          }, {
            key: "toJSON",
            value: function toJSON(e) {
              var t = Object.create(null);
              return J.forEach(this, function (r, n) {
                null != r && !1 !== r && (t[n] = e && J.isArray(r) ? r.join(", ") : r);
              }), t;
            }
          }, {
            key: Symbol.iterator,
            value: function value() {
              return Object.entries(this.toJSON())[Symbol.iterator]();
            }
          }, {
            key: "toString",
            value: function toString() {
              return Object.entries(this.toJSON()).map(function (_ref8) {
                var _ref9 = _slicedToArray(_ref8, 2),
                  e = _ref9[0],
                  t = _ref9[1];
                return e + ": " + t;
              }).join("\n");
            }
          }, {
            key: Symbol.toStringTag,
            get: function get() {
              return "AxiosHeaders";
            }
          }], [{
            key: "from",
            value: function from(e) {
              return e instanceof this ? e : new this(e);
            }
          }, {
            key: "concat",
            value: function concat(e) {
              var r = new this(e);
              for (var _len2 = arguments.length, t = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                t[_key2 - 1] = arguments[_key2];
              }
              return t.forEach(function (e) {
                return r.set(e);
              }), r;
            }
          }, {
            key: "accessor",
            value: function accessor(e) {
              var t = (this[ge] = this[ge] = {
                  accessors: {}
                }).accessors,
                r = this.prototype;
              function n(e) {
                var n = ve(e);
                t[n] || (function (e, t) {
                  var r = J.toCamelCase(" " + t);
                  ["get", "set", "has"].forEach(function (n) {
                    Object.defineProperty(e, n + r, {
                      value: function value(e, r, o) {
                        return this[n].call(this, t, e, r, o);
                      },
                      configurable: !0
                    });
                  });
                }(r, e), t[n] = !0);
              }
              return J.isArray(e) ? e.forEach(n) : n(e), this;
            }
          }]);
        }();
        Ee.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]), J.reduceDescriptors(Ee.prototype, function (_ref10, t) {
          var e = _ref10.value;
          var r = t[0].toUpperCase() + t.slice(1);
          return {
            get: function get() {
              return e;
            },
            set: function set(e) {
              this[r] = e;
            }
          };
        }), J.freezeMethods(Ee);
        var Se = Ee;
        function Oe(e, t) {
          var r = this || me,
            n = t || r,
            o = Se.from(n.headers);
          var i = n.data;
          return J.forEach(e, function (e) {
            i = e.call(r, i, o.normalize(), t ? t.status : void 0);
          }), o.normalize(), i;
        }
        function xe(e) {
          return !(!e || !e.__CANCEL__);
        }
        function Re(e, t, r) {
          V.call(this, null == e ? "canceled" : e, V.ERR_CANCELED, t, r), this.name = "CanceledError";
        }
        function Te(e, t, r) {
          var n = r.config.validateStatus;
          r.status && n && !n(r.status) ? t(new V("Request failed with status code " + r.status, [V.ERR_BAD_REQUEST, V.ERR_BAD_RESPONSE][Math.floor(r.status / 100) - 4], r.config, r.request, r)) : e(r);
        }
        J.inherits(Re, V, {
          __CANCEL__: !0
        });
        var Le = function Le(e, t) {
            var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
            var n = 0;
            var o = function (e, t) {
              e = e || 10;
              var r = new Array(e),
                n = new Array(e);
              var o,
                i = 0,
                a = 0;
              return t = void 0 !== t ? t : 1e3, function (s) {
                var c = Date.now(),
                  u = n[a];
                o || (o = c), r[i] = s, n[i] = c;
                var l = a,
                  f = 0;
                for (; l !== i;) f += r[l++], l %= e;
                if (i = (i + 1) % e, i === a && (a = (a + 1) % e), c - o < t) return;
                var d = u && c - u;
                return d ? Math.round(1e3 * f / d) : void 0;
              };
            }(50, 250);
            return function (e, t) {
              var r,
                n,
                o = 0,
                i = 1e3 / t;
              var a = function a(t) {
                var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Date.now();
                o = i, r = null, n && (clearTimeout(n), n = null), e.apply(null, t);
              };
              return [function () {
                var t = Date.now(),
                  s = t - o;
                for (var _len3 = arguments.length, e = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  e[_key3] = arguments[_key3];
                }
                s >= i ? a(e, t) : (r = e, n || (n = setTimeout(function () {
                  n = null, a(r);
                }, i - s)));
              }, function () {
                return r && a(r);
              }];
            }(function (r) {
              var i = r.loaded,
                a = r.lengthComputable ? r.total : void 0,
                s = i - n,
                c = o(s);
              n = i, e(_defineProperty({
                loaded: i,
                total: a,
                progress: a ? i / a : void 0,
                bytes: s,
                rate: c || void 0,
                estimated: c && a && i <= a ? (a - i) / c : void 0,
                event: r,
                lengthComputable: null != a
              }, t ? "download" : "upload", !0));
            }, r);
          },
          Ae = function Ae(e, t) {
            var r = null != e;
            return [function (n) {
              return t[0]({
                lengthComputable: r,
                total: e,
                loaded: n
              });
            }, t[1]];
          },
          Ce = function Ce(e) {
            return function () {
              for (var _len4 = arguments.length, t = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                t[_key4] = arguments[_key4];
              }
              return J.asap(function () {
                return e.apply(void 0, t);
              });
            };
          };
        var Ne = de.hasStandardBrowserEnv ? function (e, t) {
            return function (r) {
              return r = new URL(r, de.origin), e.protocol === r.protocol && e.host === r.host && (t || e.port === r.port);
            };
          }(new URL(de.origin), de.navigator && /(msie|trident)/i.test(de.navigator.userAgent)) : function () {
            return !0;
          },
          je = de.hasStandardBrowserEnv ? {
            write: function write(e, t, r, n, o, i) {
              var a = [e + "=" + encodeURIComponent(t)];
              J.isNumber(r) && a.push("expires=" + new Date(r).toGMTString()), J.isString(n) && a.push("path=" + n), J.isString(o) && a.push("domain=" + o), !0 === i && a.push("secure"), document.cookie = a.join("; ");
            },
            read: function read(e) {
              var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
              return t ? decodeURIComponent(t[3]) : null;
            },
            remove: function remove(e) {
              this.write(e, "", Date.now() - 864e5);
            }
          } : {
            write: function write() {},
            read: function read() {
              return null;
            },
            remove: function remove() {}
          };
        function _e(e, t, r) {
          var n = !/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t);
          return e && n || 0 == r ? function (e, t) {
            return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
          }(e, t) : t;
        }
        var Pe = function Pe(e) {
          return e instanceof Se ? _objectSpread({}, e) : e;
        };
        function Fe(e, t) {
          t = t || {};
          var r = {};
          function n(e, t, r, n) {
            return J.isPlainObject(e) && J.isPlainObject(t) ? J.merge.call({
              caseless: n
            }, e, t) : J.isPlainObject(t) ? J.merge({}, t) : J.isArray(t) ? t.slice() : t;
          }
          function o(e, t, r, o) {
            return J.isUndefined(t) ? J.isUndefined(e) ? void 0 : n(void 0, e, 0, o) : n(e, t, 0, o);
          }
          function i(e, t) {
            if (!J.isUndefined(t)) return n(void 0, t);
          }
          function a(e, t) {
            return J.isUndefined(t) ? J.isUndefined(e) ? void 0 : n(void 0, e) : n(void 0, t);
          }
          function s(r, o, i) {
            return i in t ? n(r, o) : i in e ? n(void 0, r) : void 0;
          }
          var c = {
            url: i,
            method: i,
            data: i,
            baseURL: a,
            transformRequest: a,
            transformResponse: a,
            paramsSerializer: a,
            timeout: a,
            timeoutMessage: a,
            withCredentials: a,
            withXSRFToken: a,
            adapter: a,
            responseType: a,
            xsrfCookieName: a,
            xsrfHeaderName: a,
            onUploadProgress: a,
            onDownloadProgress: a,
            decompress: a,
            maxContentLength: a,
            maxBodyLength: a,
            beforeRedirect: a,
            transport: a,
            httpAgent: a,
            httpsAgent: a,
            cancelToken: a,
            socketPath: a,
            responseEncoding: a,
            validateStatus: s,
            headers: function headers(e, t, r) {
              return o(Pe(e), Pe(t), 0, !0);
            }
          };
          return J.forEach(Object.keys(Object.assign({}, e, t)), function (n) {
            var i = c[n] || o,
              a = i(e[n], t[n], n);
            J.isUndefined(a) && i !== s || (r[n] = a);
          }), r;
        }
        var ke = function ke(e) {
            var t = Fe({}, e);
            var r,
              n = t.data,
              o = t.withXSRFToken,
              i = t.xsrfHeaderName,
              a = t.xsrfCookieName,
              s = t.headers,
              c = t.auth;
            if (t.headers = s = Se.from(s), t.url = ne(_e(t.baseURL, t.url), e.params, e.paramsSerializer), c && s.set("Authorization", "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))), J.isFormData(n)) if (de.hasStandardBrowserEnv || de.hasStandardBrowserWebWorkerEnv) s.setContentType(void 0);else if (!1 !== (r = s.getContentType())) {
              var _ref11 = r ? r.split(";").map(function (e) {
                  return e.trim();
                }).filter(Boolean) : [],
                _ref12 = _toArray(_ref11),
                _e5 = _ref12[0],
                _t5 = _ref12.slice(1);
              s.setContentType([_e5 || "multipart/form-data"].concat(_toConsumableArray(_t5)).join("; "));
            }
            if (de.hasStandardBrowserEnv && (o && J.isFunction(o) && (o = o(t)), o || !1 !== o && Ne(t.url))) {
              var _e6 = i && a && je.read(a);
              _e6 && s.set(i, _e6);
            }
            return t;
          },
          Be = "undefined" != typeof XMLHttpRequest && function (e) {
            return new Promise(function (t, r) {
              var _Le, _Le2, _Le3, _Le4;
              var n = ke(e);
              var o = n.data;
              var i = Se.from(n.headers).normalize();
              var a,
                s,
                c,
                u,
                l,
                f = n.responseType,
                d = n.onUploadProgress,
                h = n.onDownloadProgress;
              function p() {
                u && u(), l && l(), n.cancelToken && n.cancelToken.unsubscribe(a), n.signal && n.signal.removeEventListener("abort", a);
              }
              var m = new XMLHttpRequest();
              function y() {
                if (!m) return;
                var n = Se.from("getAllResponseHeaders" in m && m.getAllResponseHeaders());
                Te(function (e) {
                  t(e), p();
                }, function (e) {
                  r(e), p();
                }, {
                  data: f && "text" !== f && "json" !== f ? m.response : m.responseText,
                  status: m.status,
                  statusText: m.statusText,
                  headers: n,
                  config: e,
                  request: m
                }), m = null;
              }
              m.open(n.method.toUpperCase(), n.url, !0), m.timeout = n.timeout, "onloadend" in m ? m.onloadend = y : m.onreadystatechange = function () {
                m && 4 === m.readyState && (0 !== m.status || m.responseURL && 0 === m.responseURL.indexOf("file:")) && setTimeout(y);
              }, m.onabort = function () {
                m && (r(new V("Request aborted", V.ECONNABORTED, e, m)), m = null);
              }, m.onerror = function () {
                r(new V("Network Error", V.ERR_NETWORK, e, m)), m = null;
              }, m.ontimeout = function () {
                var t = n.timeout ? "timeout of " + n.timeout + "ms exceeded" : "timeout exceeded";
                var o = n.transitional || ie;
                n.timeoutErrorMessage && (t = n.timeoutErrorMessage), r(new V(t, o.clarifyTimeoutError ? V.ETIMEDOUT : V.ECONNABORTED, e, m)), m = null;
              }, void 0 === o && i.setContentType(null), "setRequestHeader" in m && J.forEach(i.toJSON(), function (e, t) {
                m.setRequestHeader(t, e);
              }), J.isUndefined(n.withCredentials) || (m.withCredentials = !!n.withCredentials), f && "json" !== f && (m.responseType = n.responseType), h && (_Le = Le(h, !0), _Le2 = _slicedToArray(_Le, 2), c = _Le2[0], l = _Le2[1], m.addEventListener("progress", c)), d && m.upload && (_Le3 = Le(d), _Le4 = _slicedToArray(_Le3, 2), s = _Le4[0], u = _Le4[1], m.upload.addEventListener("progress", s), m.upload.addEventListener("loadend", u)), (n.cancelToken || n.signal) && (a = function a(t) {
                m && (r(!t || t.type ? new Re(null, e, m) : t), m.abort(), m = null);
              }, n.cancelToken && n.cancelToken.subscribe(a), n.signal && (n.signal.aborted ? a() : n.signal.addEventListener("abort", a)));
              var g = function (e) {
                var t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
                return t && t[1] || "";
              }(n.url);
              g && -1 === de.protocols.indexOf(g) ? r(new V("Unsupported protocol " + g + ":", V.ERR_BAD_REQUEST, e)) : m.send(o || null);
            });
          },
          Ue = function Ue(e, t) {
            var _e7 = e = e ? e.filter(Boolean) : [],
              r = _e7.length;
            if (t || r) {
              var _r7,
                _n3 = new AbortController();
              var _o5 = function _o5(e) {
                if (!_r7) {
                  _r7 = !0, _a2();
                  var _t6 = e instanceof Error ? e : this.reason;
                  _n3.abort(_t6 instanceof V ? _t6 : new Re(_t6 instanceof Error ? _t6.message : _t6));
                }
              };
              var _i2 = t && setTimeout(function () {
                _i2 = null, _o5(new V("timeout ".concat(t, " of ms exceeded"), V.ETIMEDOUT));
              }, t);
              var _a2 = function _a2() {
                e && (_i2 && clearTimeout(_i2), _i2 = null, e.forEach(function (e) {
                  e.unsubscribe ? e.unsubscribe(_o5) : e.removeEventListener("abort", _o5);
                }), e = null);
              };
              e.forEach(function (e) {
                return e.addEventListener("abort", _o5);
              });
              var _s = _n3.signal;
              return _s.unsubscribe = function () {
                return J.asap(_a2);
              }, _s;
            }
          };
        var De = /*#__PURE__*/_regeneratorRuntime().mark(function De(e, t) {
            var r, n, o;
            return _regeneratorRuntime().wrap(function De$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  r = e.byteLength;
                  if (!(!t || r < t)) {
                    _context.next = 5;
                    break;
                  }
                  _context.next = 4;
                  return e;
                case 4:
                  return _context.abrupt("return", void _context.sent);
                case 5:
                  o = 0;
                case 6:
                  if (!(o < r)) {
                    _context.next = 13;
                    break;
                  }
                  n = o + t;
                  _context.next = 10;
                  return e.slice(o, n);
                case 10:
                  o = n;
                case 11:
                  _context.next = 6;
                  break;
                case 13:
                case "end":
                  return _context.stop();
              }
            }, De);
          }),
          Ie = function Ie(e, t, r, n) {
            var o = function () {
              var _ref = _wrapAsyncGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(e, t) {
                var _iteratorAbruptCompletion, _didIteratorError, _iteratorError, _iterator, _step, _r9;
                return _regeneratorRuntime().wrap(function _callee2$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _iteratorAbruptCompletion = false;
                      _didIteratorError = false;
                      _context3.prev = 2;
                      _iterator = _asyncIterator(function () {
                        var _ref2 = _wrapAsyncGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(e) {
                          var t, _yield$_awaitAsyncGen, _e8, _r8;
                          return _regeneratorRuntime().wrap(function _callee$(_context2) {
                            while (1) switch (_context2.prev = _context2.next) {
                              case 0:
                                if (!e[Symbol.asyncIterator]) {
                                  _context2.next = 3;
                                  break;
                                }
                                return _context2.delegateYield(_asyncGeneratorDelegate(_asyncIterator(e), _awaitAsyncGenerator), "t0", 2);
                              case 2:
                                return _context2.abrupt("return", void _context2.t0);
                              case 3:
                                t = e.getReader();
                                _context2.prev = 4;
                              case 5:
                                _context2.next = 7;
                                return _awaitAsyncGenerator(t.read());
                              case 7:
                                _yield$_awaitAsyncGen = _context2.sent;
                                _e8 = _yield$_awaitAsyncGen.done;
                                _r8 = _yield$_awaitAsyncGen.value;
                                if (!_e8) {
                                  _context2.next = 12;
                                  break;
                                }
                                return _context2.abrupt("break", 16);
                              case 12:
                                _context2.next = 14;
                                return _r8;
                              case 14:
                                _context2.next = 5;
                                break;
                              case 16:
                                _context2.prev = 16;
                                _context2.next = 19;
                                return _awaitAsyncGenerator(t.cancel());
                              case 19:
                                return _context2.finish(16);
                              case 20:
                              case "end":
                                return _context2.stop();
                            }
                          }, _callee, null, [[4,, 16, 20]]);
                        }));
                        return function (_x3) {
                          return _ref2.apply(this, arguments);
                        };
                      }()(e));
                    case 4:
                      _context3.next = 6;
                      return _awaitAsyncGenerator(_iterator.next());
                    case 6:
                      if (!(_iteratorAbruptCompletion = !(_step = _context3.sent).done)) {
                        _context3.next = 12;
                        break;
                      }
                      _r9 = _step.value;
                      return _context3.delegateYield(_asyncGeneratorDelegate(_asyncIterator(De(_r9, t)), _awaitAsyncGenerator), "t0", 9);
                    case 9:
                      _iteratorAbruptCompletion = false;
                      _context3.next = 4;
                      break;
                    case 12:
                      _context3.next = 18;
                      break;
                    case 14:
                      _context3.prev = 14;
                      _context3.t1 = _context3["catch"](2);
                      _didIteratorError = true;
                      _iteratorError = _context3.t1;
                    case 18:
                      _context3.prev = 18;
                      _context3.prev = 19;
                      if (!(_iteratorAbruptCompletion && _iterator.return != null)) {
                        _context3.next = 23;
                        break;
                      }
                      _context3.next = 23;
                      return _awaitAsyncGenerator(_iterator.return());
                    case 23:
                      _context3.prev = 23;
                      if (!_didIteratorError) {
                        _context3.next = 26;
                        break;
                      }
                      throw _iteratorError;
                    case 26:
                      return _context3.finish(23);
                    case 27:
                      return _context3.finish(18);
                    case 28:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee2, null, [[2, 14, 18, 28], [19,, 23, 27]]);
              }));
              return function (_x, _x2) {
                return _ref.apply(this, arguments);
              };
            }()(e, t);
            var i,
              a = 0,
              s = function s(e) {
                i || (i = !0, n && n(e));
              };
            return new ReadableStream({
              pull: function pull(e) {
                return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                  var _yield$o$next, _t7, _n4, _i3, _e9;
                  return _regeneratorRuntime().wrap(function _callee3$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return o.next();
                      case 3:
                        _yield$o$next = _context4.sent;
                        _t7 = _yield$o$next.done;
                        _n4 = _yield$o$next.value;
                        if (!_t7) {
                          _context4.next = 8;
                          break;
                        }
                        return _context4.abrupt("return", (s(), void e.close()));
                      case 8:
                        _i3 = _n4.byteLength;
                        if (r) {
                          _e9 = a += _i3;
                          r(_e9);
                        }
                        e.enqueue(new Uint8Array(_n4));
                        _context4.next = 16;
                        break;
                      case 13:
                        _context4.prev = 13;
                        _context4.t0 = _context4["catch"](0);
                        throw s(_context4.t0), _context4.t0;
                      case 16:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee3, null, [[0, 13]]);
                }))();
              },
              cancel: function cancel(e) {
                return s(e), o.return();
              }
            }, {
              highWaterMark: 2
            });
          },
          qe = "function" == typeof fetch && "function" == typeof Request && "function" == typeof Response,
          ze = qe && "function" == typeof ReadableStream,
          Me = qe && ("function" == typeof TextEncoder ? (He = new TextEncoder(), function (e) {
            return He.encode(e);
          }) : (/*#__PURE__*/function () {
            var _ref13 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(e) {
              return _regeneratorRuntime().wrap(function _callee4$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.t0 = Uint8Array;
                    _context5.next = 3;
                    return new Response(e).arrayBuffer();
                  case 3:
                    _context5.t1 = _context5.sent;
                    return _context5.abrupt("return", new _context5.t0(_context5.t1));
                  case 5:
                  case "end":
                    return _context5.stop();
                }
              }, _callee4);
            }));
            return function (_x4) {
              return _ref13.apply(this, arguments);
            };
          }()));
        var He;
        var Je = function Je(e) {
            try {
              for (var _len5 = arguments.length, t = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                t[_key5 - 1] = arguments[_key5];
              }
              return !!e.apply(void 0, t);
            } catch (e) {
              return !1;
            }
          },
          Ve = ze && Je(function () {
            var e = !1;
            var t = new Request(de.origin, {
              body: new ReadableStream(),
              method: "POST",
              get duplex() {
                return e = !0, "half";
              }
            }).headers.has("Content-Type");
            return e && !t;
          }),
          Ge = ze && Je(function () {
            return J.isReadableStream(new Response("").body);
          }),
          We = {
            stream: Ge && function (e) {
              return e.body;
            }
          };
        var Ke;
        qe && (Ke = new Response(), ["text", "arrayBuffer", "blob", "formData", "stream"].forEach(function (e) {
          !We[e] && (We[e] = J.isFunction(Ke[e]) ? function (t) {
            return t[e]();
          } : function (t, r) {
            throw new V("Response type '".concat(e, "' is not supported"), V.ERR_NOT_SUPPORT, r);
          });
        }));
        var Xe = {
          http: null,
          xhr: Be,
          fetch: qe && (/*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(e) {
              var _ke, t, r, n, o, i, a, s, c, u, l, _ke$withCredentials, f, d, h, p, m, y, _e10, _r10, _Ae, _Ae2, _e11, _t9, _o6, _i4, _a3, _e12, _t10, _ref17, _ref18, _r11, _n5, _g;
              return _regeneratorRuntime().wrap(function _callee7$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _ke = ke(e), t = _ke.url, r = _ke.method, n = _ke.data, o = _ke.signal, i = _ke.cancelToken, a = _ke.timeout, s = _ke.onDownloadProgress, c = _ke.onUploadProgress, u = _ke.responseType, l = _ke.headers, _ke$withCredentials = _ke.withCredentials, f = _ke$withCredentials === void 0 ? "same-origin" : _ke$withCredentials, d = _ke.fetchOptions;
                    u = u ? (u + "").toLowerCase() : "text";
                    p = Ue([o, i && i.toAbortSignal()], a);
                    m = p && p.unsubscribe && function () {
                      p.unsubscribe();
                    };
                    _context8.prev = 4;
                    _context8.t0 = c && Ve && "get" !== r && "head" !== r;
                    if (!_context8.t0) {
                      _context8.next = 11;
                      break;
                    }
                    _context8.next = 9;
                    return function () {
                      var _ref15 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(e, t) {
                        var r;
                        return _regeneratorRuntime().wrap(function _callee6$(_context7) {
                          while (1) switch (_context7.prev = _context7.next) {
                            case 0:
                              r = J.toFiniteNumber(e.getContentLength());
                              return _context7.abrupt("return", null == r ? function () {
                                var _ref16 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(e) {
                                  var _t8;
                                  return _regeneratorRuntime().wrap(function _callee5$(_context6) {
                                    while (1) switch (_context6.prev = _context6.next) {
                                      case 0:
                                        if (!(null == e)) {
                                          _context6.next = 2;
                                          break;
                                        }
                                        return _context6.abrupt("return", 0);
                                      case 2:
                                        if (!J.isBlob(e)) {
                                          _context6.next = 4;
                                          break;
                                        }
                                        return _context6.abrupt("return", e.size);
                                      case 4:
                                        if (!J.isSpecCompliantForm(e)) {
                                          _context6.next = 9;
                                          break;
                                        }
                                        _t8 = new Request(de.origin, {
                                          method: "POST",
                                          body: e
                                        });
                                        _context6.next = 8;
                                        return _t8.arrayBuffer();
                                      case 8:
                                        return _context6.abrupt("return", _context6.sent.byteLength);
                                      case 9:
                                        if (!(J.isArrayBufferView(e) || J.isArrayBuffer(e))) {
                                          _context6.next = 13;
                                          break;
                                        }
                                        _context6.t0 = e.byteLength;
                                        _context6.next = 22;
                                        break;
                                      case 13:
                                        J.isURLSearchParams(e) && (e += "");
                                        if (!J.isString(e)) {
                                          _context6.next = 20;
                                          break;
                                        }
                                        _context6.next = 17;
                                        return Me(e);
                                      case 17:
                                        _context6.t1 = _context6.sent.byteLength;
                                        _context6.next = 21;
                                        break;
                                      case 20:
                                        _context6.t1 = void 0;
                                      case 21:
                                        _context6.t0 = _context6.t1;
                                      case 22:
                                        return _context6.abrupt("return", _context6.t0);
                                      case 23:
                                      case "end":
                                        return _context6.stop();
                                    }
                                  }, _callee5);
                                }));
                                return function (_x8) {
                                  return _ref16.apply(this, arguments);
                                };
                              }()(t) : r);
                            case 2:
                            case "end":
                              return _context7.stop();
                          }
                        }, _callee6);
                      }));
                      return function (_x6, _x7) {
                        return _ref15.apply(this, arguments);
                      };
                    }()(l, n);
                  case 9:
                    _context8.t1 = y = _context8.sent;
                    _context8.t0 = 0 !== _context8.t1;
                  case 11:
                    if (!_context8.t0) {
                      _context8.next = 14;
                      break;
                    }
                    _r10 = new Request(t, {
                      method: "POST",
                      body: n,
                      duplex: "half"
                    });
                    if (J.isFormData(n) && (_e10 = _r10.headers.get("content-type")) && l.setContentType(_e10), _r10.body) {
                      _Ae = Ae(y, Le(Ce(c))), _Ae2 = _slicedToArray(_Ae, 2), _e11 = _Ae2[0], _t9 = _Ae2[1];
                      n = Ie(_r10.body, 65536, _e11, _t9);
                    }
                  case 14:
                    J.isString(f) || (f = f ? "include" : "omit");
                    _o6 = "credentials" in Request.prototype;
                    h = new Request(t, _objectSpread(_objectSpread({}, d), {}, {
                      signal: p,
                      method: r.toUpperCase(),
                      headers: l.normalize().toJSON(),
                      body: n,
                      duplex: "half",
                      credentials: _o6 ? f : void 0
                    }));
                    _context8.next = 19;
                    return fetch(h);
                  case 19:
                    _i4 = _context8.sent;
                    _a3 = Ge && ("stream" === u || "response" === u);
                    if (Ge && (s || _a3 && m)) {
                      _e12 = {};
                      ["status", "statusText", "headers"].forEach(function (t) {
                        _e12[t] = _i4[t];
                      });
                      _t10 = J.toFiniteNumber(_i4.headers.get("content-length")), _ref17 = s && Ae(_t10, Le(Ce(s), !0)) || [], _ref18 = _slicedToArray(_ref17, 2), _r11 = _ref18[0], _n5 = _ref18[1];
                      _i4 = new Response(Ie(_i4.body, 65536, _r11, function () {
                        _n5 && _n5(), m && m();
                      }), _e12);
                    }
                    u = u || "text";
                    _context8.next = 25;
                    return We[J.findKey(We, u) || "text"](_i4, e);
                  case 25:
                    _g = _context8.sent;
                    !_a3 && m && m();
                    _context8.next = 29;
                    return new Promise(function (t, r) {
                      Te(t, r, {
                        data: _g,
                        headers: Se.from(_i4.headers),
                        status: _i4.status,
                        statusText: _i4.statusText,
                        config: e,
                        request: h
                      });
                    });
                  case 29:
                    return _context8.abrupt("return", _context8.sent);
                  case 32:
                    _context8.prev = 32;
                    _context8.t2 = _context8["catch"](4);
                    if (!(m && m(), _context8.t2 && "TypeError" === _context8.t2.name && /fetch/i.test(_context8.t2.message))) {
                      _context8.next = 36;
                      break;
                    }
                    throw Object.assign(new V("Network Error", V.ERR_NETWORK, e, h), {
                      cause: _context8.t2.cause || _context8.t2
                    });
                  case 36:
                    throw V.from(_context8.t2, _context8.t2 && _context8.t2.code, e, h);
                  case 37:
                  case "end":
                    return _context8.stop();
                }
              }, _callee7, null, [[4, 32]]);
            }));
            return function (_x5) {
              return _ref14.apply(this, arguments);
            };
          }())
        };
        J.forEach(Xe, function (e, t) {
          if (e) {
            try {
              Object.defineProperty(e, "name", {
                value: t
              });
            } catch (e) {}
            Object.defineProperty(e, "adapterName", {
              value: t
            });
          }
        });
        var $e = function $e(e) {
            return "- ".concat(e);
          },
          Ye = function Ye(e) {
            return J.isFunction(e) || null === e || !1 === e;
          };
        var Qe = function Qe(e) {
          e = J.isArray(e) ? e : [e];
          var _e13 = e,
            t = _e13.length;
          var r, n;
          var o = {};
          for (var _i5 = 0; _i5 < t; _i5++) {
            var _t11 = void 0;
            if (r = e[_i5], n = r, !Ye(r) && (n = Xe[(_t11 = String(r)).toLowerCase()], void 0 === n)) throw new V("Unknown adapter '".concat(_t11, "'"));
            if (n) break;
            o[_t11 || "#" + _i5] = n;
          }
          if (!n) {
            var _e14 = Object.entries(o).map(function (_ref19) {
              var _ref20 = _slicedToArray(_ref19, 2),
                e = _ref20[0],
                t = _ref20[1];
              return "adapter ".concat(e, " ") + (!1 === t ? "is not supported by the environment" : "is not available in the build");
            });
            throw new V("There is no suitable adapter to dispatch the request " + (t ? _e14.length > 1 ? "since :\n" + _e14.map($e).join("\n") : " " + $e(_e14[0]) : "as no adapter specified"), "ERR_NOT_SUPPORT");
          }
          return n;
        };
        function Ze(e) {
          if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted) throw new Re(null, e);
        }
        function et(e) {
          return Ze(e), e.headers = Se.from(e.headers), e.data = Oe.call(e, e.transformRequest), -1 !== ["post", "put", "patch"].indexOf(e.method) && e.headers.setContentType("application/x-www-form-urlencoded", !1), Qe(e.adapter || me.adapter)(e).then(function (t) {
            return Ze(e), t.data = Oe.call(e, e.transformResponse, t), t.headers = Se.from(t.headers), t;
          }, function (t) {
            return xe(t) || (Ze(e), t && t.response && (t.response.data = Oe.call(e, e.transformResponse, t.response), t.response.headers = Se.from(t.response.headers))), Promise.reject(t);
          });
        }
        var tt = {};
        ["object", "boolean", "number", "function", "string", "symbol"].forEach(function (e, t) {
          tt[e] = function (r) {
            return _typeof(r) === e || "a" + (t < 1 ? "n " : " ") + e;
          };
        });
        var rt = {};
        tt.transitional = function (e, t, r) {
          function n(e, t) {
            return "[Axios v1.8.1] Transitional option '" + e + "'" + t + (r ? ". " + r : "");
          }
          return function (r, o, i) {
            if (!1 === e) throw new V(n(o, " has been removed" + (t ? " in " + t : "")), V.ERR_DEPRECATED);
            return t && !rt[o] && (rt[o] = !0, console.warn(n(o, " has been deprecated since v" + t + " and will be removed in the near future"))), !e || e(r, o, i);
          };
        }, tt.spelling = function (e) {
          return function (t, r) {
            return console.warn("".concat(r, " is likely a misspelling of ").concat(e)), !0;
          };
        };
        var nt = {
          assertOptions: function assertOptions(e, t, r) {
            if ("object" != _typeof(e)) throw new V("options must be an object", V.ERR_BAD_OPTION_VALUE);
            var n = Object.keys(e);
            var o = n.length;
            for (; o-- > 0;) {
              var _i6 = n[o],
                _a4 = t[_i6];
              if (_a4) {
                var _t12 = e[_i6],
                  _r12 = void 0 === _t12 || _a4(_t12, _i6, e);
                if (!0 !== _r12) throw new V("option " + _i6 + " must be " + _r12, V.ERR_BAD_OPTION_VALUE);
              } else if (!0 !== r) throw new V("Unknown option " + _i6, V.ERR_BAD_OPTION);
            }
          },
          validators: tt
        };
        var ot = nt.validators;
        var it = /*#__PURE__*/function () {
          function it(e) {
            _classCallCheck(this, it);
            this.defaults = e, this.interceptors = {
              request: new oe(),
              response: new oe()
            };
          }
          return _createClass(it, [{
            key: "request",
            value: function () {
              var _request2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(e, t) {
                var _t13, _r13;
                return _regeneratorRuntime().wrap(function _callee8$(_context9) {
                  while (1) switch (_context9.prev = _context9.next) {
                    case 0:
                      _context9.prev = 0;
                      _context9.next = 3;
                      return this._request(e, t);
                    case 3:
                      return _context9.abrupt("return", _context9.sent);
                    case 6:
                      _context9.prev = 6;
                      _context9.t0 = _context9["catch"](0);
                      if (_context9.t0 instanceof Error) {
                        _t13 = {};
                        Error.captureStackTrace ? Error.captureStackTrace(_t13) : _t13 = new Error();
                        _r13 = _t13.stack ? _t13.stack.replace(/^.+\n/, "") : "";
                        try {
                          _context9.t0.stack ? _r13 && !String(_context9.t0.stack).endsWith(_r13.replace(/^.+\n.+\n/, "")) && (_context9.t0.stack += "\n" + _r13) : _context9.t0.stack = _r13;
                        } catch (e) {}
                      }
                      throw _context9.t0;
                    case 10:
                    case "end":
                      return _context9.stop();
                  }
                }, _callee8, this, [[0, 6]]);
              }));
              function request(_x9, _x10) {
                return _request2.apply(this, arguments);
              }
              return request;
            }()
          }, {
            key: "_request",
            value: function _request(e, t) {
              "string" == typeof e ? (t = t || {}).url = e : t = e || {}, t = Fe(this.defaults, t);
              var _t14 = t,
                r = _t14.transitional,
                n = _t14.paramsSerializer,
                o = _t14.headers;
              void 0 !== r && nt.assertOptions(r, {
                silentJSONParsing: ot.transitional(ot.boolean),
                forcedJSONParsing: ot.transitional(ot.boolean),
                clarifyTimeoutError: ot.transitional(ot.boolean)
              }, !1), null != n && (J.isFunction(n) ? t.paramsSerializer = {
                serialize: n
              } : nt.assertOptions(n, {
                encode: ot.function,
                serialize: ot.function
              }, !0)), void 0 !== t.allowAbsoluteUrls || (void 0 !== this.defaults.allowAbsoluteUrls ? t.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : t.allowAbsoluteUrls = !0), nt.assertOptions(t, {
                baseUrl: ot.spelling("baseURL"),
                withXsrfToken: ot.spelling("withXSRFToken")
              }, !0), t.method = (t.method || this.defaults.method || "get").toLowerCase();
              var i = o && J.merge(o.common, o[t.method]);
              o && J.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (e) {
                delete o[e];
              }), t.headers = Se.concat(i, o);
              var a = [];
              var s = !0;
              this.interceptors.request.forEach(function (e) {
                "function" == typeof e.runWhen && !1 === e.runWhen(t) || (s = s && e.synchronous, a.unshift(e.fulfilled, e.rejected));
              });
              var c = [];
              var u;
              this.interceptors.response.forEach(function (e) {
                c.push(e.fulfilled, e.rejected);
              });
              var l,
                f = 0;
              if (!s) {
                var _e15 = [et.bind(this), void 0];
                for (_e15.unshift.apply(_e15, a), _e15.push.apply(_e15, c), l = _e15.length, u = Promise.resolve(t); f < l;) u = u.then(_e15[f++], _e15[f++]);
                return u;
              }
              l = a.length;
              var d = t;
              for (f = 0; f < l;) {
                var _e16 = a[f++],
                  _t15 = a[f++];
                try {
                  d = _e16(d);
                } catch (e) {
                  _t15.call(this, e);
                  break;
                }
              }
              try {
                u = et.call(this, d);
              } catch (e) {
                return Promise.reject(e);
              }
              for (f = 0, l = c.length; f < l;) u = u.then(c[f++], c[f++]);
              return u;
            }
          }, {
            key: "getUri",
            value: function getUri(e) {
              return ne(_e((e = Fe(this.defaults, e)).baseURL, e.url, e.allowAbsoluteUrls), e.params, e.paramsSerializer);
            }
          }]);
        }();
        J.forEach(["delete", "get", "head", "options"], function (e) {
          it.prototype[e] = function (t, r) {
            return this.request(Fe(r || {}, {
              method: e,
              url: t,
              data: (r || {}).data
            }));
          };
        }), J.forEach(["post", "put", "patch"], function (e) {
          function t(t) {
            return function (r, n, o) {
              return this.request(Fe(o || {}, {
                method: e,
                headers: t ? {
                  "Content-Type": "multipart/form-data"
                } : {},
                url: r,
                data: n
              }));
            };
          }
          it.prototype[e] = t(), it.prototype[e + "Form"] = t(!0);
        });
        var at = it;
        var st = /*#__PURE__*/function () {
          function st(e) {
            _classCallCheck(this, st);
            if ("function" != typeof e) throw new TypeError("executor must be a function.");
            var t;
            this.promise = new Promise(function (e) {
              t = e;
            });
            var r = this;
            this.promise.then(function (e) {
              if (!r._listeners) return;
              var t = r._listeners.length;
              for (; t-- > 0;) r._listeners[t](e);
              r._listeners = null;
            }), this.promise.then = function (e) {
              var t;
              var n = new Promise(function (e) {
                r.subscribe(e), t = e;
              }).then(e);
              return n.cancel = function () {
                r.unsubscribe(t);
              }, n;
            }, e(function (e, n, o) {
              r.reason || (r.reason = new Re(e, n, o), t(r.reason));
            });
          }
          return _createClass(st, [{
            key: "throwIfRequested",
            value: function throwIfRequested() {
              if (this.reason) throw this.reason;
            }
          }, {
            key: "subscribe",
            value: function subscribe(e) {
              this.reason ? e(this.reason) : this._listeners ? this._listeners.push(e) : this._listeners = [e];
            }
          }, {
            key: "unsubscribe",
            value: function unsubscribe(e) {
              if (!this._listeners) return;
              var t = this._listeners.indexOf(e);
              -1 !== t && this._listeners.splice(t, 1);
            }
          }, {
            key: "toAbortSignal",
            value: function toAbortSignal() {
              var _this = this;
              var e = new AbortController(),
                t = function t(_t16) {
                  e.abort(_t16);
                };
              return this.subscribe(t), e.signal.unsubscribe = function () {
                return _this.unsubscribe(t);
              }, e.signal;
            }
          }], [{
            key: "source",
            value: function source() {
              var e;
              return {
                token: new st(function (t) {
                  e = t;
                }),
                cancel: e
              };
            }
          }]);
        }();
        var ct = st;
        var ut = {
          Continue: 100,
          SwitchingProtocols: 101,
          Processing: 102,
          EarlyHints: 103,
          Ok: 200,
          Created: 201,
          Accepted: 202,
          NonAuthoritativeInformation: 203,
          NoContent: 204,
          ResetContent: 205,
          PartialContent: 206,
          MultiStatus: 207,
          AlreadyReported: 208,
          ImUsed: 226,
          MultipleChoices: 300,
          MovedPermanently: 301,
          Found: 302,
          SeeOther: 303,
          NotModified: 304,
          UseProxy: 305,
          Unused: 306,
          TemporaryRedirect: 307,
          PermanentRedirect: 308,
          BadRequest: 400,
          Unauthorized: 401,
          PaymentRequired: 402,
          Forbidden: 403,
          NotFound: 404,
          MethodNotAllowed: 405,
          NotAcceptable: 406,
          ProxyAuthenticationRequired: 407,
          RequestTimeout: 408,
          Conflict: 409,
          Gone: 410,
          LengthRequired: 411,
          PreconditionFailed: 412,
          PayloadTooLarge: 413,
          UriTooLong: 414,
          UnsupportedMediaType: 415,
          RangeNotSatisfiable: 416,
          ExpectationFailed: 417,
          ImATeapot: 418,
          MisdirectedRequest: 421,
          UnprocessableEntity: 422,
          Locked: 423,
          FailedDependency: 424,
          TooEarly: 425,
          UpgradeRequired: 426,
          PreconditionRequired: 428,
          TooManyRequests: 429,
          RequestHeaderFieldsTooLarge: 431,
          UnavailableForLegalReasons: 451,
          InternalServerError: 500,
          NotImplemented: 501,
          BadGateway: 502,
          ServiceUnavailable: 503,
          GatewayTimeout: 504,
          HttpVersionNotSupported: 505,
          VariantAlsoNegotiates: 506,
          InsufficientStorage: 507,
          LoopDetected: 508,
          NotExtended: 510,
          NetworkAuthenticationRequired: 511
        };
        Object.entries(ut).forEach(function (_ref21) {
          var _ref22 = _slicedToArray(_ref21, 2),
            e = _ref22[0],
            t = _ref22[1];
          ut[t] = e;
        });
        var lt = ut;
        var ft = function e(t) {
          var r = new at(t),
            o = n(at.prototype.request, r);
          return J.extend(o, at.prototype, r, {
            allOwnKeys: !0
          }), J.extend(o, r, null, {
            allOwnKeys: !0
          }), o.create = function (r) {
            return e(Fe(t, r));
          }, o;
        }(me);
        ft.Axios = at, ft.CanceledError = Re, ft.CancelToken = ct, ft.isCancel = xe, ft.VERSION = "1.8.1", ft.toFormData = Q, ft.AxiosError = V, ft.Cancel = ft.CanceledError, ft.all = function (e) {
          return Promise.all(e);
        }, ft.spread = function (e) {
          return function (t) {
            return e.apply(null, t);
          };
        }, ft.isAxiosError = function (e) {
          return J.isObject(e) && !0 === e.isAxiosError;
        }, ft.mergeConfig = Fe, ft.AxiosHeaders = Se, ft.formToJSON = function (e) {
          return he(J.isHTMLForm(e) ? new FormData(e) : e);
        }, ft.getAdapter = Qe, ft.HttpStatusCode = lt, ft.default = ft, e.exports = ft;
      },
      536: function _(e) {
        e.exports = [{
          title: "Interstellar",
          year: 2014,
          director: "Christopher Nolan",
          duration: "169 min",
          genre: ["Adventure", "Drama", "Sci-Fi"],
          rate: 8.6,
          poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEid0hhcCVLOuo8rq3wShnBb1p4Ld5XXdeDc6Jxm4TitX2zEk7ExUzstX84YrN8HlkO64gsP1iBIVFEg1Nnyp-BpPaQ1RvttBeKUHCkj6SpSc6w1YklnTrv4_6r8vf-9hjV9fedNg3wf7h81gXtXULoHo1cp5N4lWXo8Z5LANd_qhF3e3WFmQ3Wh0OTb_Ijz/w640-h361-rw/interestelar.png"
        }, {
          title: "John Wick 4",
          year: 2023,
          director: "Chad Stahelski",
          duration: "2h 49m",
          genre: ["Action", "Sci-Fi"],
          rate: 8.2,
          poster: "https://m.media-amazon.com/images/S/pv-target-images/6d3d1461d50778271845ce7ec81ba2c5d76a20f7f84e5061cd099aabaedc77f9.jpg"
        }, {
          title: "Toy Story",
          year: 1995,
          director: "John Lasseter",
          duration: "1h 21m",
          genre: ["Fantasy"],
          rate: 8,
          poster: "https://cdn.shopify.com/s/files/1/0420/1044/3928/products/00719ToyStory_Blackstone__Rounded.png?v=1628182506"
        }];
      },
      571: function _(e, t, r) {
        var n = r(536);
        e.exports = function () {
          var e = document.getElementById("PeliculasRecomendadas");
          n.map(function (e, t) {
            var r = document.createElement("div");
            r.className = "tarjeta";
            var n = document.createElement("img");
            n.className = "img-movie", n.src = e.poster, n.alt = "".concat(e.title, " Poster");
            var o = document.createElement("h2");
            o.className = "movie-title", o.textContent = e.title;
            var i = document.createElement("p");
            i.className = "movie-year", i.textContent = "Year: ".concat(e.year);
            var a = document.createElement("p");
            return a.className = "movie-rating", a.textContent = "Rateing: ".concat(e.rate), r.appendChild(n), r.appendChild(o), r.appendChild(i), r.appendChild(a), r;
          }).forEach(function (t) {
            return e.appendChild(t);
          });
        };
      },
      587: function _(e) {
        e.exports = function (e, t) {
          var r = t;
          e.map(function (e) {
            var t = document.createElement("div");
            t.className = "tarjeta";
            var r = document.createElement("img");
            r.className = "img-movie", r.src = e.poster, r.alt = "".concat(e.title, " Poster");
            var n = document.createElement("h2");
            n.className = "movie-title", n.textContent = e.title;
            var o = document.createElement("p");
            o.className = "movie-year", o.textContent = "Year: ".concat(e.year);
            var i = document.createElement("p");
            i.className = "movie-director", i.textContent = "Director: ".concat(e.director);
            var a = document.createElement("p");
            a.className = "movie-duration", a.textContent = "Duration: ".concat(e.duration);
            var s = document.createElement("p");
            s.className = "movie-genre", s.textContent = "Genre: ".concat(e.genre);
            var c = document.createElement("p");
            return c.className = "movie-rating", c.textContent = "Rateing: ".concat(e.rate), t.appendChild(r), t.appendChild(n), t.appendChild(o), t.appendChild(i), t.appendChild(a), t.appendChild(s), t.appendChild(c), t;
          }).forEach(function (e) {
            return r.appendChild(e);
          });
        };
      },
      951: function _(e, t, r) {
        var n = r(236);
        e.exports = function () {
          var e = document.getElementById("Peliculas-populares");
          n.map(function (e, t) {
            var r = document.createElement("div");
            r.className = "tarjeta", r.setAttribute("data-index", t + 1);
            var n = document.createElement("div");
            n.className = "number", n.textContent = t + 1;
            var o = document.createElement("img");
            o.className = "img-movie", o.src = e.poster, o.alt = "".concat(e.title, " Poster");
            var i = document.createElement("h2");
            i.className = "movie-title", i.textContent = e.title;
            var a = document.createElement("p");
            a.className = "movie-year", a.textContent = "Year: ".concat(e.year);
            var s = document.createElement("p");
            return s.className = "movie-rating", s.textContent = "Rateing: ".concat(e.rate), r.appendChild(n), r.appendChild(o), r.appendChild(i), r.appendChild(a), r.appendChild(s), r;
          }).forEach(function (t) {
            return e.appendChild(t);
          });
        };
      }
    },
    t = {};
  function r(n) {
    var o = t[n];
    if (void 0 !== o) return o.exports;
    var i = t[n] = {
      exports: {}
    };
    return e[n](i, i.exports, r), i.exports;
  }
  function n(e) {
    return n = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
      return _typeof(e);
    } : function (e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : _typeof(e);
    }, n(e);
  }
  function o() {
    "use strict";

    o = function o() {
      return t;
    };
    var e,
      t = {},
      r = Object.prototype,
      i = r.hasOwnProperty,
      a = Object.defineProperty || function (e, t, r) {
        e[t] = r.value;
      },
      s = "function" == typeof Symbol ? Symbol : {},
      c = s.iterator || "@@iterator",
      u = s.asyncIterator || "@@asyncIterator",
      l = s.toStringTag || "@@toStringTag";
    function f(e, t, r) {
      return Object.defineProperty(e, t, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }), e[t];
    }
    try {
      f({}, "");
    } catch (e) {
      f = function f(e, t, r) {
        return e[t] = r;
      };
    }
    function d(e, t, r, n) {
      var o = t && t.prototype instanceof b ? t : b,
        i = Object.create(o.prototype),
        s = new _(n || []);
      return a(i, "_invoke", {
        value: A(e, r, s)
      }), i;
    }
    function h(e, t, r) {
      try {
        return {
          type: "normal",
          arg: e.call(t, r)
        };
      } catch (e) {
        return {
          type: "throw",
          arg: e
        };
      }
    }
    t.wrap = d;
    var p = "suspendedStart",
      m = "suspendedYield",
      y = "executing",
      g = "completed",
      v = {};
    function b() {}
    function w() {}
    function E() {}
    var S = {};
    f(S, c, function () {
      return this;
    });
    var O = Object.getPrototypeOf,
      x = O && O(O(P([])));
    x && x !== r && i.call(x, c) && (S = x);
    var R = E.prototype = b.prototype = Object.create(S);
    function T(e) {
      ["next", "throw", "return"].forEach(function (t) {
        f(e, t, function (e) {
          return this._invoke(t, e);
        });
      });
    }
    function L(e, t) {
      function r(o, a, s, c) {
        var u = h(e[o], e, a);
        if ("throw" !== u.type) {
          var l = u.arg,
            f = l.value;
          return f && "object" == n(f) && i.call(f, "__await") ? t.resolve(f.__await).then(function (e) {
            r("next", e, s, c);
          }, function (e) {
            r("throw", e, s, c);
          }) : t.resolve(f).then(function (e) {
            l.value = e, s(l);
          }, function (e) {
            return r("throw", e, s, c);
          });
        }
        c(u.arg);
      }
      var o;
      a(this, "_invoke", {
        value: function value(e, n) {
          function i() {
            return new t(function (t, o) {
              r(e, n, t, o);
            });
          }
          return o = o ? o.then(i, i) : i();
        }
      });
    }
    function A(t, r, n) {
      var o = p;
      return function (i, a) {
        if (o === y) throw Error("Generator is already running");
        if (o === g) {
          if ("throw" === i) throw a;
          return {
            value: e,
            done: !0
          };
        }
        for (n.method = i, n.arg = a;;) {
          var s = n.delegate;
          if (s) {
            var c = C(s, n);
            if (c) {
              if (c === v) continue;
              return c;
            }
          }
          if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
            if (o === p) throw o = g, n.arg;
            n.dispatchException(n.arg);
          } else "return" === n.method && n.abrupt("return", n.arg);
          o = y;
          var u = h(t, r, n);
          if ("normal" === u.type) {
            if (o = n.done ? g : m, u.arg === v) continue;
            return {
              value: u.arg,
              done: n.done
            };
          }
          "throw" === u.type && (o = g, n.method = "throw", n.arg = u.arg);
        }
      };
    }
    function C(t, r) {
      var n = r.method,
        o = t.iterator[n];
      if (o === e) return r.delegate = null, "throw" === n && t.iterator.return && (r.method = "return", r.arg = e, C(t, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), v;
      var i = h(o, t.iterator, r.arg);
      if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, v;
      var a = i.arg;
      return a ? a.done ? (r[t.resultName] = a.value, r.next = t.nextLoc, "return" !== r.method && (r.method = "next", r.arg = e), r.delegate = null, v) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, v);
    }
    function N(e) {
      var t = {
        tryLoc: e[0]
      };
      1 in e && (t.catchLoc = e[1]), 2 in e && (t.finallyLoc = e[2], t.afterLoc = e[3]), this.tryEntries.push(t);
    }
    function j(e) {
      var t = e.completion || {};
      t.type = "normal", delete t.arg, e.completion = t;
    }
    function _(e) {
      this.tryEntries = [{
        tryLoc: "root"
      }], e.forEach(N, this), this.reset(!0);
    }
    function P(t) {
      if (t || "" === t) {
        var r = t[c];
        if (r) return r.call(t);
        if ("function" == typeof t.next) return t;
        if (!isNaN(t.length)) {
          var o = -1,
            a = function r() {
              for (; ++o < t.length;) if (i.call(t, o)) return r.value = t[o], r.done = !1, r;
              return r.value = e, r.done = !0, r;
            };
          return a.next = a;
        }
      }
      throw new TypeError(n(t) + " is not iterable");
    }
    return w.prototype = E, a(R, "constructor", {
      value: E,
      configurable: !0
    }), a(E, "constructor", {
      value: w,
      configurable: !0
    }), w.displayName = f(E, l, "GeneratorFunction"), t.isGeneratorFunction = function (e) {
      var t = "function" == typeof e && e.constructor;
      return !!t && (t === w || "GeneratorFunction" === (t.displayName || t.name));
    }, t.mark = function (e) {
      return Object.setPrototypeOf ? Object.setPrototypeOf(e, E) : (e.__proto__ = E, f(e, l, "GeneratorFunction")), e.prototype = Object.create(R), e;
    }, t.awrap = function (e) {
      return {
        __await: e
      };
    }, T(L.prototype), f(L.prototype, u, function () {
      return this;
    }), t.AsyncIterator = L, t.async = function (e, r, n, o, i) {
      void 0 === i && (i = Promise);
      var a = new L(d(e, r, n, o), i);
      return t.isGeneratorFunction(r) ? a : a.next().then(function (e) {
        return e.done ? e.value : a.next();
      });
    }, T(R), f(R, l, "Generator"), f(R, c, function () {
      return this;
    }), f(R, "toString", function () {
      return "[object Generator]";
    }), t.keys = function (e) {
      var t = Object(e),
        r = [];
      for (var n in t) r.push(n);
      return r.reverse(), function e() {
        for (; r.length;) {
          var n = r.pop();
          if (n in t) return e.value = n, e.done = !1, e;
        }
        return e.done = !0, e;
      };
    }, t.values = P, _.prototype = {
      constructor: _,
      reset: function reset(t) {
        if (this.prev = 0, this.next = 0, this.sent = this._sent = e, this.done = !1, this.delegate = null, this.method = "next", this.arg = e, this.tryEntries.forEach(j), !t) for (var r in this) "t" === r.charAt(0) && i.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = e);
      },
      stop: function stop() {
        this.done = !0;
        var e = this.tryEntries[0].completion;
        if ("throw" === e.type) throw e.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(t) {
        if (this.done) throw t;
        var r = this;
        function n(n, o) {
          return s.type = "throw", s.arg = t, r.next = n, o && (r.method = "next", r.arg = e), !!o;
        }
        for (var o = this.tryEntries.length - 1; o >= 0; --o) {
          var a = this.tryEntries[o],
            s = a.completion;
          if ("root" === a.tryLoc) return n("end");
          if (a.tryLoc <= this.prev) {
            var c = i.call(a, "catchLoc"),
              u = i.call(a, "finallyLoc");
            if (c && u) {
              if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
              if (this.prev < a.finallyLoc) return n(a.finallyLoc);
            } else if (c) {
              if (this.prev < a.catchLoc) return n(a.catchLoc, !0);
            } else {
              if (!u) throw Error("try statement without catch or finally");
              if (this.prev < a.finallyLoc) return n(a.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(e, t) {
        for (var r = this.tryEntries.length - 1; r >= 0; --r) {
          var n = this.tryEntries[r];
          if (n.tryLoc <= this.prev && i.call(n, "finallyLoc") && this.prev < n.finallyLoc) {
            var o = n;
            break;
          }
        }
        o && ("break" === e || "continue" === e) && o.tryLoc <= t && t <= o.finallyLoc && (o = null);
        var a = o ? o.completion : {};
        return a.type = e, a.arg = t, o ? (this.method = "next", this.next = o.finallyLoc, v) : this.complete(a);
      },
      complete: function complete(e, t) {
        if ("throw" === e.type) throw e.arg;
        return "break" === e.type || "continue" === e.type ? this.next = e.arg : "return" === e.type ? (this.rval = this.arg = e.arg, this.method = "return", this.next = "end") : "normal" === e.type && t && (this.next = t), v;
      },
      finish: function finish(e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var r = this.tryEntries[t];
          if (r.finallyLoc === e) return this.complete(r.completion, r.afterLoc), j(r), v;
        }
      },
      catch: function _catch(e) {
        for (var t = this.tryEntries.length - 1; t >= 0; --t) {
          var r = this.tryEntries[t];
          if (r.tryLoc === e) {
            var n = r.completion;
            if ("throw" === n.type) {
              var o = n.arg;
              j(r);
            }
            return o;
          }
        }
        throw Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(t, r, n) {
        return this.delegate = {
          iterator: P(t),
          resultName: r,
          nextLoc: n
        }, "next" === this.method && (this.arg = e), v;
      }
    }, t;
  }
  function i(e, t, r, n, o, i, a) {
    try {
      var s = e[i](a),
        c = s.value;
    } catch (e) {
      return void r(e);
    }
    s.done ? t(c) : Promise.resolve(c).then(n, o);
  }
  r.g = function () {
    if ("object" == (typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis))) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == (typeof window === "undefined" ? "undefined" : _typeof(window))) return window;
    }
  }();
  var a,
    s = r(425),
    c = r(587),
    u = r(396),
    l = r(951),
    f = r(571),
    d = document.querySelector("#movies");
  d ? (a = o().mark(function e() {
    var t;
    return o().wrap(function (e) {
      for (;;) switch (e.prev = e.next) {
        case 0:
          return e.prev = 0, e.next = 3, s.get("".concat("http://localhost:3000", "/movies"));
        case 3:
          t = e.sent, console.log(t.data), c(t.data, d), l(), f(), e.next = 13;
          break;
        case 10:
          e.prev = 10, e.t0 = e.catch(0), console.error("Error al obtener películas:", e.t0);
        case 13:
        case "end":
          return e.stop();
      }
    }, e, null, [[0, 10]]);
  }), function () {
    var e = this,
      t = arguments;
    return new Promise(function (r, n) {
      var o = a.apply(e, t);
      function s(e) {
        i(o, r, n, s, c, "next", e);
      }
      function c(e) {
        i(o, r, n, s, c, "throw", e);
      }
      s(void 0);
    });
  })() : document.addEventListener("DOMContentLoaded", function () {
    u();
  });
})();
},{"process":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/process/browser.js","buffer":"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/node_modules/buffer/index.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51662" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","public/bundle.js"], null)
//# sourceMappingURL=/bundle.fd84112c.js.map