'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var _classnames = _interopRequireDefault(require('classnames'))

var _propTypes2 = require('./utils/propTypes')

var TimeSlot =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(TimeSlot, _Component)

    function TimeSlot() {
      return _Component.apply(this, arguments) || this
    }

    var _proto = TimeSlot.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        value = _this$props.value,
        slotPropGetter = _this$props.slotPropGetter,
        resource = _this$props.resource,
        children = _this$props.children
      var Wrapper = this.props.timeSlotWrapperComponent

      var _ref = (slotPropGetter && slotPropGetter(value)) || {},
        className = _ref.className,
        style = _ref.style

      return _react.default.createElement(
        Wrapper,
        {
          value: value,
          resource: resource,
        },
        _react.default.createElement(
          'div',
          {
            style: style,
            className: (0, _classnames.default)(
              'rbc-time-slot',
              className,
              children && 'rbc-label'
            ),
          },
          children
        )
      )
    }

    return TimeSlot
  })(_react.Component)

exports.default = TimeSlot
TimeSlot.propTypes = {
  timeSlotWrapperComponent: _propTypes2.elementType,
  value: _propTypes.default.instanceOf(Date).isRequired,
  showLabel: _propTypes.default.bool,
  slotPropGetter: _propTypes.default.func,
  resource: _propTypes.default.string,
}
TimeSlot.defaultProps = {
  showLabel: false,
  content: '',
}
module.exports = exports['default']
