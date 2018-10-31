'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _classnames = _interopRequireDefault(require('classnames'))

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireWildcard(require('react'))

var _propTypes2 = require('./utils/propTypes')

var _BackgroundWrapper = _interopRequireDefault(require('./BackgroundWrapper'))

var TimeSlotGroup =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(TimeSlotGroup, _Component)

    function TimeSlotGroup() {
      return _Component.apply(this, arguments) || this
    }

    var _proto = TimeSlotGroup.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        renderSlot = _this$props.renderSlot,
        resource = _this$props.resource,
        group = _this$props.group,
        slotPropGetter = _this$props.slotPropGetter,
        Wrapper = _this$props.timeSlotWrapperComponent
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-timeslot-group',
        },
        group.map(function(value, idx) {
          var slotProps = (slotPropGetter && slotPropGetter(value)) || {}
          return _react.default.createElement(
            Wrapper,
            {
              key: idx,
              value: value,
              resource: resource,
            },
            _react.default.createElement(
              'div',
              (0, _extends2.default)({}, slotProps, {
                className: (0, _classnames.default)(
                  'rbc-time-slot',
                  slotProps.className
                ),
              }),
              renderSlot && renderSlot(value, idx)
            )
          )
        })
      )
    }

    return TimeSlotGroup
  })(_react.Component)

exports.default = TimeSlotGroup
TimeSlotGroup.propTypes = {
  renderSlot: _propTypes.default.func,
  timeSlotWrapperComponent: _propTypes2.elementType,
  group: _propTypes.default.array.isRequired,
  slotPropGetter: _propTypes.default.func,
  resource: _propTypes.default.any,
}
TimeSlotGroup.defaultProps = {
  timeSlotWrapperComponent: _BackgroundWrapper.default,
}
module.exports = exports['default']
