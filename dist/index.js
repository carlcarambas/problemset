'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// solutions here
// solution no 1
var doAsync = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(inputArrayOrString) {
        var _this = this;

        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, element, promises;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;

                        if (Array.isArray(inputArrayOrString)) {
                            _context2.next = 3;
                            break;
                        }

                        throw 'Input should be an array';

                    case 3:
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        _context2.prev = 6;
                        _iterator = inputArrayOrString[Symbol.iterator]();

                    case 8:
                        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                            _context2.next = 23;
                            break;
                        }

                        element = _step.value;

                        if (!Array.isArray(element)) {
                            _context2.next = 16;
                            break;
                        }

                        promises = element.map(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(str) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                _context.next = 2;
                                                return asyncOp(str);

                                            case 2:
                                                return _context.abrupt('return', _context.sent);

                                            case 3:
                                            case 'end':
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, _this);
                            }));

                            return function (_x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }());
                        _context2.next = 14;
                        return Promise.all(promises);

                    case 14:
                        _context2.next = 20;
                        break;

                    case 16:
                        if (!(typeof inputArrayOrString != 'string')) {
                            _context2.next = 18;
                            break;
                        }

                        throw 'Input should only be array of strings';

                    case 18:
                        _context2.next = 20;
                        return asyncOp(element);

                    case 20:
                        _iteratorNormalCompletion = true;
                        _context2.next = 8;
                        break;

                    case 23:
                        _context2.next = 29;
                        break;

                    case 25:
                        _context2.prev = 25;
                        _context2.t0 = _context2['catch'](6);
                        _didIteratorError = true;
                        _iteratorError = _context2.t0;

                    case 29:
                        _context2.prev = 29;
                        _context2.prev = 30;

                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }

                    case 32:
                        _context2.prev = 32;

                        if (!_didIteratorError) {
                            _context2.next = 35;
                            break;
                        }

                        throw _iteratorError;

                    case 35:
                        return _context2.finish(32);

                    case 36:
                        return _context2.finish(29);

                    case 37:
                        _context2.next = 42;
                        break;

                    case 39:
                        _context2.prev = 39;
                        _context2.t1 = _context2['catch'](0);
                        return _context2.abrupt('return', _context2.t1);

                    case 42:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[0, 39], [6, 25, 29, 37], [30,, 32, 36]]);
    }));

    return function doAsync(_x) {
        return _ref.apply(this, arguments);
    };
}();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var asyncOp = require('./lib/lib').asyncOp;
var RandStream = require('./lib/lib').RandStream;
var Events = require('events');
var stream = require('stream');
var genericPool = require('generic-pool');
var RandStringSource = function (_Events$EventEmitter) {
    _inherits(RandStringSource, _Events$EventEmitter);

    function RandStringSource(randStreamInstance) {
        _classCallCheck(this, RandStringSource);

        var _this2 = _possibleConstructorReturn(this, (RandStringSource.__proto__ || Object.getPrototypeOf(RandStringSource)).call(this));

        _this2.readStream = stream.Readable;
        _this2.nextEnclosedString = '';

        _this2.readStream = randStreamInstance;
        _this2.finish();
        return _this2;
    }

    _createClass(RandStringSource, [{
        key: 'finish',
        value: function finish() {
            var _this3 = this;

            var nextString = '';
            this.readStream.on('data', function (chunk) {
                var text = chunk.toString();

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = text[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var char = _step2.value;

                        if (char === '.') {
                            _this3.emit('data', nextString);
                            nextString = '\n';
                        } else {
                            nextString += char;
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            });

            setTimeout(function () {
                process.exit(0);
            }, 500);
        }
    }]);

    return RandStringSource;
}(Events.EventEmitter);

var ResourceManager = function () {
    function ResourceManager(count) {
        _classCallCheck(this, ResourceManager);

        this.initialize(count);
    }

    _createClass(ResourceManager, [{
        key: 'initialize',
        value: function initialize(count) {

            var factory = {
                create: function create() {
                    // 
                },
                destroy: function destroy(client) {
                    // 
                }
            };

            var opts = {
                max: count, // maximum size of the pool
                min: count // minimum size of the pool
            };

            this.myPool = genericPool.createPool(factory, opts);
        }
    }, {
        key: 'borrow',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(callback) {
                var client;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.myPool.acquire();

                            case 2:
                                client = _context3.sent;

                                callback({ client: client, pool: this.myPool });

                            case 4:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function borrow(_x3) {
                return _ref3.apply(this, arguments);
            }

            return borrow;
        }()
    }]);

    return ResourceManager;
}();

/** SAMPLES */

/**
 * Problem 1
 
let input = [
    'A',
    ['B', 'C'],
    'D'
]

doAsync(input);
*/
/**
 * Problem 2
 
const myEmitter = new RandStringSource(new RandStream());
myEmitter.on('data', (chunk) => {
    console.log('EMMITTED: ', chunk.toString())
})
*/

/**
 * Problem 3
 */

var pool = new ResourceManager(2);
console.log('START');

var timestamp = Date.now();

pool.borrow(function (res) {
    console.log('RES: 1');
    setTimeout(function () {
        res.pool.release(res.client);
    }, 500);
});

pool.borrow(function (res) {
    console.log('RES: 2');
    // res.pool.release(res.client)
});

pool.borrow(function (res) {
    console.log('RES: 3');
    console.log('DURATION: ' + (Date.now() - timestamp));
});

module.exports = {
    doAsync: doAsync
};
//# sourceMappingURL=index.js.map