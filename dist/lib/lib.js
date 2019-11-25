'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stream = require('stream'),
    randtoken = require('rand-token');

var RandStream = function (_stream$Readable) {
  _inherits(RandStream, _stream$Readable);

  function RandStream() {
    _classCallCheck(this, RandStream);

    var _this = _possibleConstructorReturn(this, (RandStream.__proto__ || Object.getPrototypeOf(RandStream)).call(this, {
      encoding: 'utf8',
      objectMode: false
    }));

    _this.generate();
    return _this;
  }

  _createClass(RandStream, [{
    key: '_read',
    value: function _read() {}
  }, {
    key: 'generate',
    value: function generate() {
      var _this2 = this;

      var chunk = randtoken.generate(Math.floor(5 + Math.random() * 25), '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.');

      console.log('CHUNK: ' + chunk);

      this.push(chunk, 'utf8');

      setTimeout(function () {
        _this2.generate();
      }, Math.random * 1000);
    }
  }]);

  return RandStream;
}(stream.Readable);

function asyncOp(input, callback) {
  console.log('START: ' + input);

  var prom = new Promise(function (resolve) {
    setTimeout(function () {
      console.log('FINISH: ' + input);
      resolve();
    }, Math.random() * 1000);
  });

  if (!callback) {
    return prom;
  }

  prom.then(callback);
}

module.exports = {
  RandStream: RandStream,
  asyncOp: asyncOp
};
//# sourceMappingURL=lib.js.map