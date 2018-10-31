'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _react = _interopRequireDefault(require('react'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var BackgroundWrapper =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(BackgroundWrapper, _React$Component)

    function BackgroundWrapper() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = BackgroundWrapper.prototype

    _proto.render = function render() {
      return this.props.children
    }

    return BackgroundWrapper
  })(_react.default.Component)

BackgroundWrapper.propTypes = {
  children: _propTypes.default.element,
  value: _propTypes.default.instanceOf(Date),
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
}
var _default = BackgroundWrapper
exports.default = _default
module.exports = exports['default']
