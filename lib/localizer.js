'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.set = set
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _invariant = _interopRequireDefault(require('invariant'))

var localePropType = _propTypes.default.oneOfType([
  _propTypes.default.string,
  _propTypes.default.func,
])

function _format(localizer, formatter, value, format, culture) {
  var result =
    typeof format === 'function'
      ? format(value, culture, localizer)
      : formatter.call(localizer, value, format, culture)
  !(result == null || typeof result === 'string')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant.default)(
          false,
          '`localizer format(..)` must return a string, null, or undefined'
        )
      : invariant(false)
    : void 0
  return result
}

var DateLocalizer = function DateLocalizer(spec) {
  var _this = this

  !(typeof spec.format === 'function')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant.default)(
          false,
          'date localizer `format(..)` must be a function'
        )
      : invariant(false)
    : void 0
  !(typeof spec.parse === 'function')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant.default)(
          false,
          'date localizer `parse(..)` must be a function'
        )
      : invariant(false)
    : void 0
  !(typeof spec.firstOfWeek === 'function')
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant.default)(
          false,
          'date localizer `firstOfWeek(..)` must be a function'
        )
      : invariant(false)
    : void 0
  this.propType = spec.propType || localePropType
  this.formats = spec.formats
  this.startOfWeek = spec.firstOfWeek

  this.format = function() {
    for (
      var _len = arguments.length, args = new Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key]
    }

    return _format.apply(void 0, [_this, spec.format].concat(args))
  }

  this.parse = function(value, format, culture) {
    var result = spec.parse.call(_this, value, format, culture)
    !(result == null || (result instanceof Date && !isNaN(result.getTime())))
      ? process.env.NODE_ENV !== 'production'
        ? (0, _invariant.default)(
            false,
            'date localizer `parse(..)` must return a valid Date, null, or undefined'
          )
        : invariant(false)
      : void 0
    return result
  }
}

var localizer = {
  parse: error,
  format: error,
  startOfWeek: error,
}

function set(newLocalizer) {
  if (!newLocalizer.__isLocalizer__) {
    newLocalizer = new DateLocalizer(newLocalizer)
    newLocalizer.__isLocalizer__ = true
  }

  localizer = newLocalizer
  return localizer
}

var exp = {
  parse: function parse() {
    var _localizer

    return (_localizer = localizer).parse.apply(_localizer, arguments)
  },
  format: function format() {
    var _localizer2

    return (_localizer2 = localizer).format.apply(_localizer2, arguments)
  },
  startOfWeek: function startOfWeek() {
    var _localizer3

    return (_localizer3 = localizer).startOfWeek.apply(_localizer3, arguments)
  },
}
var _default = exp
exports.default = _default

function error() {
  throw new Error(
    'You have not selected a localization strategy for Big Calendar. ' +
      'Please use either of the two included.'
  )
}
