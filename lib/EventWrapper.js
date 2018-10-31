'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _react = _interopRequireDefault(require('react'))

var EventWrapper =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(EventWrapper, _React$Component)

    function EventWrapper() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = EventWrapper.prototype

    _proto.render = function render() {
      return this.props.children
    }

    return EventWrapper
  })(_react.default.Component)

var _default = EventWrapper
exports.default = _default
module.exports = exports['default']
