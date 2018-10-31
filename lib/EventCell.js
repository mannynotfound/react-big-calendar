'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _classnames = _interopRequireDefault(require('classnames'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var _propTypes2 = require('./utils/propTypes')

var _accessors = require('./utils/accessors')

var propTypes = {
  event: _propTypes.default.object.isRequired,
  slotStart: _propTypes.default.instanceOf(Date),
  slotEnd: _propTypes.default.instanceOf(Date),
  selected: _propTypes.default.bool,
  isAllDay: _propTypes.default.bool,
  eventPropGetter: _propTypes.default.func,
  titleAccessor: _propTypes2.accessor,
  tooltipAccessor: _propTypes2.accessor,
  allDayAccessor: _propTypes2.accessor,
  startAccessor: _propTypes2.accessor,
  endAccessor: _propTypes2.accessor,
  eventComponent: _propTypes2.elementType,
  eventWrapperComponent: _propTypes2.elementType.isRequired,
  onSelect: _propTypes.default.func.isRequired,
  onDoubleClick: _propTypes.default.func.isRequired,
}

var EventCell =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(EventCell, _React$Component)

    function EventCell() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = EventCell.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        className = _this$props.className,
        event = _this$props.event,
        selected = _this$props.selected,
        isAllDay = _this$props.isAllDay,
        eventPropGetter = _this$props.eventPropGetter,
        startAccessor = _this$props.startAccessor,
        endAccessor = _this$props.endAccessor,
        titleAccessor = _this$props.titleAccessor,
        tooltipAccessor = _this$props.tooltipAccessor,
        allDayAccessor = _this$props.allDayAccessor,
        slotStart = _this$props.slotStart,
        slotEnd = _this$props.slotEnd,
        onSelect = _this$props.onSelect,
        _onDoubleClick = _this$props.onDoubleClick,
        Event = _this$props.eventComponent,
        EventWrapper = _this$props.eventWrapperComponent,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
          'className',
          'event',
          'selected',
          'isAllDay',
          'eventPropGetter',
          'startAccessor',
          'endAccessor',
          'titleAccessor',
          'tooltipAccessor',
          'allDayAccessor',
          'slotStart',
          'slotEnd',
          'onSelect',
          'onDoubleClick',
          'eventComponent',
          'eventWrapperComponent',
        ])

      var title = (0, _accessors.accessor)(event, titleAccessor),
        tooltip = (0, _accessors.accessor)(event, tooltipAccessor),
        end = (0, _accessors.accessor)(event, endAccessor),
        start = (0, _accessors.accessor)(event, startAccessor),
        allDay = (0, _accessors.accessor)(event, allDayAccessor),
        showAsAllDay =
          isAllDay ||
          allDay ||
          _dates.default.diff(start, _dates.default.ceil(end, 'day'), 'day') >
            1,
        continuesPrior = _dates.default.lt(start, slotStart, 'day'),
        continuesAfter = _dates.default.gte(end, slotEnd, 'day')

      if (eventPropGetter)
        var _eventPropGetter = eventPropGetter(event, start, end, selected),
          style = _eventPropGetter.style,
          xClassName = _eventPropGetter.className
      var wrapperProps = {
        event: event,
        allDay: allDay,
        continuesPrior: continuesPrior,
        continuesAfter: continuesAfter,
      }
      return (
        // give EventWrapper some extra info to help it determine whether it
        // it's in a row, etc. Useful for dnd, etc.
        _react.default.createElement(
          EventWrapper,
          (0, _extends2.default)({}, wrapperProps, {
            isRow: true,
          }),
          _react.default.createElement(
            'div',
            {
              style: (0, _extends2.default)({}, props.style, style),
              className: (0, _classnames.default)(
                'rbc-event',
                className,
                xClassName,
                {
                  'rbc-selected': selected,
                  'rbc-event-allday': showAsAllDay,
                  'rbc-event-continues-prior': continuesPrior,
                  'rbc-event-continues-after': continuesAfter,
                }
              ),
              onClick: function onClick(e) {
                return onSelect(event, e)
              },
              onDoubleClick: function onDoubleClick(e) {
                return _onDoubleClick(event, e)
              },
            },
            _react.default.createElement(
              'div',
              {
                className: 'rbc-event-content',
                title: tooltip || undefined,
              },
              Event
                ? _react.default.createElement(Event, {
                    event: event,
                    title: title,
                    isAllDay: allDay,
                  })
                : title
            )
          )
        )
      )
    }

    return EventCell
  })(_react.default.Component)

EventCell.propTypes = propTypes
var _default = EventCell
exports.default = _default
module.exports = exports['default']
