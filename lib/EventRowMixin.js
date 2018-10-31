'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _EventCell = _interopRequireDefault(require('./EventCell'))

var _height = _interopRequireDefault(require('dom-helpers/query/height'))

var _propTypes2 = require('./utils/propTypes')

var _selection = require('./utils/selection')

/* eslint-disable react/prop-types */
var _default = {
  propTypes: {
    slots: _propTypes.default.number.isRequired,
    end: _propTypes.default.instanceOf(Date),
    start: _propTypes.default.instanceOf(Date),
    selected: _propTypes.default.object,
    isAllDay: _propTypes.default.bool,
    eventPropGetter: _propTypes.default.func,
    titleAccessor: _propTypes2.accessor,
    tooltipAccessor: _propTypes2.accessor,
    allDayAccessor: _propTypes2.accessor,
    startAccessor: _propTypes2.accessor,
    endAccessor: _propTypes2.accessor,
    eventComponent: _propTypes2.elementType,
    eventWrapperComponent: _propTypes2.elementType.isRequired,
    onSelect: _propTypes.default.func,
    onDoubleClick: _propTypes.default.func,
  },
  defaultProps: {
    segments: [],
    selected: {},
    slots: 7,
  },
  renderEvent: function renderEvent(props, event) {
    var eventPropGetter = props.eventPropGetter,
      selected = props.selected,
      isAllDay = props.isAllDay,
      start = props.start,
      end = props.end,
      startAccessor = props.startAccessor,
      endAccessor = props.endAccessor,
      titleAccessor = props.titleAccessor,
      tooltipAccessor = props.tooltipAccessor,
      allDayAccessor = props.allDayAccessor,
      eventComponent = props.eventComponent,
      eventWrapperComponent = props.eventWrapperComponent,
      onSelect = props.onSelect,
      onDoubleClick = props.onDoubleClick
    return _react.default.createElement(_EventCell.default, {
      event: event,
      eventWrapperComponent: eventWrapperComponent,
      eventPropGetter: eventPropGetter,
      onSelect: onSelect,
      onDoubleClick: onDoubleClick,
      selected: (0, _selection.isSelected)(event, selected),
      isAllDay: isAllDay,
      startAccessor: startAccessor,
      endAccessor: endAccessor,
      titleAccessor: titleAccessor,
      tooltipAccessor: tooltipAccessor,
      allDayAccessor: allDayAccessor,
      slotStart: start,
      slotEnd: end,
      eventComponent: eventComponent,
    })
  },
  renderSpan: function renderSpan(slots, len, key, content) {
    if (content === void 0) {
      content = ' '
    }

    var per = (Math.abs(len) / slots) * 100 + '%'
    return _react.default.createElement(
      'div',
      {
        key: key,
        className: 'rbc-row-segment', // IE10/11 need max-width. flex-basis doesn't respect box-sizing
        style: {
          WebkitFlexBasis: per,
          flexBasis: per,
          maxWidth: per,
        },
      },
      content
    )
  },
  getRowHeight: function getRowHeight() {
    ;(0, _height.default)((0, _reactDom.findDOMNode)(this))
  },
}
exports.default = _default
module.exports = exports['default']
