'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _classnames = _interopRequireDefault(require('classnames'))

var _Selection = _interopRequireWildcard(require('./Selection'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _selection = require('./utils/selection')

var _localizer = _interopRequireDefault(require('./localizer'))

var _helpers = require('./utils/helpers')

var _propTypes2 = require('./utils/propTypes')

var _accessors = require('./utils/accessors')

var DayEventLayout = _interopRequireWildcard(require('./utils/DayEventLayout'))

var _TimeSlotGroup = _interopRequireDefault(require('./TimeSlotGroup'))

var DayColumn =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(DayColumn, _React$Component)

    function DayColumn() {
      var _this

      for (
        var _len = arguments.length, _args = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        _args[_key] = arguments[_key]
      }

      _this =
        _React$Component.call.apply(_React$Component, [this].concat(_args)) ||
        this
      _this.state = {
        selecting: false,
      }

      _this.renderEvents = function() {
        var _this$props = _this.props,
          EventComponent = _this$props.components.event,
          culture = _this$props.culture,
          endAccessor = _this$props.endAccessor,
          eventPropGetter = _this$props.eventPropGetter,
          eventTimeRangeEndFormat = _this$props.eventTimeRangeEndFormat,
          eventTimeRangeFormat = _this$props.eventTimeRangeFormat,
          eventTimeRangeStartFormat = _this$props.eventTimeRangeStartFormat,
          EventWrapper = _this$props.eventWrapperComponent,
          events = _this$props.events,
          max = _this$props.max,
          messages = _this$props.messages,
          min = _this$props.min,
          isRtl = _this$props.rtl,
          selected = _this$props.selected,
          startAccessor = _this$props.startAccessor,
          titleAccessor = _this$props.titleAccessor,
          tooltipAccessor = _this$props.tooltipAccessor
        var styledEvents = DayEventLayout.getStyledEvents({
          events: events,
          startAccessor: startAccessor,
          endAccessor: endAccessor,
          slotMetrics: _this.slotMetrics,
        })
        return styledEvents.map(function(_ref, idx) {
          var _extends2

          var event = _ref.event,
            style = _ref.style
          var _eventTimeRangeFormat = eventTimeRangeFormat
          var _continuesPrior = false
          var _continuesAfter = false
          var start = (0, _accessors.accessor)(event, startAccessor)
          var end = (0, _accessors.accessor)(event, endAccessor)

          if (start < min) {
            start = min
            _continuesPrior = true
            _eventTimeRangeFormat = eventTimeRangeEndFormat
          }

          if (end > max) {
            end = max
            _continuesAfter = true
            _eventTimeRangeFormat = eventTimeRangeStartFormat
          }

          var continuesPrior = _this.slotMetrics.startsBefore(start)

          var continuesAfter = _this.slotMetrics.startsAfter(end)

          var title = (0, _accessors.accessor)(event, titleAccessor)
          var tooltip = (0, _accessors.accessor)(event, tooltipAccessor)
          var label

          if (_continuesPrior && _continuesAfter) {
            label = messages.allDay
          } else {
            label = _localizer.default.format(
              {
                start: start,
                end: end,
              },
              _eventTimeRangeFormat,
              culture
            )
          }

          var _isSelected = (0, _selection.isSelected)(event, selected)

          if (eventPropGetter)
            var _eventPropGetter = eventPropGetter(
                event,
                start,
                end,
                _isSelected
              ),
              xStyle = _eventPropGetter.style,
              className = _eventPropGetter.className
          var height = style.height,
            top = style.top,
            width = style.width,
            xOffset = style.xOffset
          var wrapperProps = {
            event: event,
            continuesPrior: _continuesPrior,
            continuesAfter: _continuesAfter,
          }
          return _react.default.createElement(
            EventWrapper,
            (0, _extends3.default)({}, wrapperProps, {
              key: 'evt_' + idx,
            }),
            _react.default.createElement(
              'div',
              {
                style: (0, _extends3.default)(
                  {},
                  xStyle,
                  ((_extends2 = {
                    top: top + '%',
                    height: height + '%',
                  }),
                  (_extends2[isRtl ? 'right' : 'left'] =
                    Math.max(0, xOffset) + '%'),
                  (_extends2.width = width + '%'),
                  _extends2)
                ),
                title: tooltip
                  ? (typeof label === 'string' ? label + ': ' : '') + tooltip
                  : undefined,
                onClick: function onClick(e) {
                  return _this._select(event, e)
                },
                onDoubleClick: function onDoubleClick(e) {
                  return _this._doubleClick(event, e)
                },
                className: (0, _classnames.default)('rbc-event', className, {
                  'rbc-selected': _isSelected,
                  'rbc-event-continues-earlier': continuesPrior,
                  'rbc-event-continues-later': continuesAfter,
                  'rbc-event-continues-day-prior': _continuesPrior,
                  'rbc-event-continues-day-after': _continuesAfter,
                }),
              },
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-event-label',
                },
                label
              ),
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-event-content',
                },
                EventComponent
                  ? _react.default.createElement(EventComponent, {
                      event: event,
                      title: title,
                    })
                  : title
              )
            )
          )
        })
      }

      _this._selectable = function() {
        var node = (0, _reactDom.findDOMNode)(
          (0, _assertThisInitialized2.default)(
            (0, _assertThisInitialized2.default)(_this)
          )
        )
        var selector = (_this._selector = new _Selection.default(
          function() {
            return (0, _reactDom.findDOMNode)(
              (0, _assertThisInitialized2.default)(
                (0, _assertThisInitialized2.default)(_this)
              )
            )
          },
          {
            longPressThreshold: _this.props.longPressThreshold,
          }
        ))

        var maybeSelect = function maybeSelect(box) {
          var onSelecting = _this.props.onSelecting
          var current = _this.state || {}
          var state = selectionState(box)
          var start = state.startDate,
            end = state.endDate

          if (onSelecting) {
            if (
              (_dates.default.eq(current.startDate, start, 'minutes') &&
                _dates.default.eq(current.endDate, end, 'minutes')) ||
              onSelecting({
                start: start,
                end: end,
              }) === false
            )
              return
          }

          if (
            _this.state.start !== state.start ||
            _this.state.end !== state.end ||
            _this.state.selecting !== state.selecting
          ) {
            _this.setState(state)
          }
        }

        var selectionState = function selectionState(_ref2) {
          var y = _ref2.y

          var _getBoundsForNode = (0, _Selection.getBoundsForNode)(node),
            top = _getBoundsForNode.top,
            bottom = _getBoundsForNode.bottom

          var range = Math.abs(top - bottom)

          var currentSlot = _this.slotMetrics.closestSlotToPosition(
            (y - top) / range
          )

          if (!_this.state.selecting) _this._initialSlot = currentSlot
          var initialSlot = _this._initialSlot
          if (initialSlot === currentSlot)
            currentSlot = _this.slotMetrics.nextSlot(initialSlot)

          var selectRange = _this.slotMetrics.getRange(
            _dates.default.min(initialSlot, currentSlot),
            _dates.default.max(initialSlot, currentSlot)
          )

          return (0, _extends3.default)({}, selectRange, {
            selecting: true,
            top: selectRange.top + '%',
            height: selectRange.height + '%',
          })
        }

        var selectorClicksHandler = function selectorClicksHandler(
          box,
          actionType
        ) {
          if (
            !(0, _Selection.isEvent)(
              (0, _reactDom.findDOMNode)(
                (0, _assertThisInitialized2.default)(
                  (0, _assertThisInitialized2.default)(_this)
                )
              ),
              box
            )
          ) {
            var _selectionState = selectionState(box),
              startDate = _selectionState.startDate,
              endDate = _selectionState.endDate

            _this._selectSlot({
              startDate: startDate,
              endDate: endDate,
              action: actionType,
              box: box,
            })
          }

          _this.setState({
            selecting: false,
          })
        }

        selector.on('selecting', maybeSelect)
        selector.on('selectStart', maybeSelect)
        selector.on('beforeSelect', function(box) {
          if (_this.props.selectable !== 'ignoreEvents') return
          return !(0,
          _Selection.isEvent)((0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))), box)
        })
        selector.on('click', function(box) {
          return selectorClicksHandler(box, 'click')
        })
        selector.on('doubleClick', function(box) {
          return selectorClicksHandler(box, 'doubleClick')
        })
        selector.on('select', function(bounds) {
          if (_this.state.selecting) {
            _this._selectSlot(
              (0, _extends3.default)({}, _this.state, {
                action: 'select',
                bounds: bounds,
              })
            )

            _this.setState({
              selecting: false,
            })
          }
        })
      }

      _this._teardownSelectable = function() {
        if (!_this._selector) return

        _this._selector.teardown()

        _this._selector = null
      }

      _this._selectSlot = function(_ref3) {
        var startDate = _ref3.startDate,
          endDate = _ref3.endDate,
          action = _ref3.action,
          bounds = _ref3.bounds,
          box = _ref3.box
        var current = startDate,
          slots = []

        while (_dates.default.lte(current, endDate)) {
          slots.push(current)
          current = _dates.default.add(current, _this.props.step, 'minutes')
        }

        ;(0, _helpers.notify)(_this.props.onSelectSlot, {
          slots: slots,
          start: startDate,
          end: endDate,
          resourceId: _this.props.resource,
          action: action,
          bounds: bounds,
          box: box,
        })
      }

      _this._select = function() {
        for (
          var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
          _key2 < _len2;
          _key2++
        ) {
          args[_key2] = arguments[_key2]
        }

        ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
      }

      _this._doubleClick = function() {
        for (
          var _len3 = arguments.length, args = new Array(_len3), _key3 = 0;
          _key3 < _len3;
          _key3++
        ) {
          args[_key3] = arguments[_key3]
        }

        ;(0, _helpers.notify)(_this.props.onDoubleClickEvent, args)
      }

      _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props)
      return _this
    }

    var _proto = DayColumn.prototype

    _proto.componentDidMount = function componentDidMount() {
      this.props.selectable && this._selectable()
    }

    _proto.componentWillUnmount = function componentWillUnmount() {
      this._teardownSelectable()
    }

    _proto.componentWillReceiveProps = function componentWillReceiveProps(
      nextProps
    ) {
      if (nextProps.selectable && !this.props.selectable) this._selectable()
      if (!nextProps.selectable && this.props.selectable)
        this._teardownSelectable()
      this.slotMetrics = this.slotMetrics.update(nextProps)
    }

    _proto.render = function render() {
      var _this$props2 = this.props,
        max = _this$props2.max,
        rtl = _this$props2.rtl,
        date = _this$props2.date,
        getNow = _this$props2.getNow,
        selectRangeFormat = _this$props2.selectRangeFormat,
        culture = _this$props2.culture,
        slotPropGetter = _this$props2.slotPropGetter,
        resource = _this$props2.resource,
        timeSlotWrapperComponent = _this$props2.timeSlotWrapperComponent,
        dayPropGetter = _this$props2.dayPropGetter
      var slotMetrics = this.slotMetrics
      var _this$state = this.state,
        selecting = _this$state.selecting,
        top = _this$state.top,
        height = _this$state.height,
        startDate = _this$state.startDate,
        endDate = _this$state.endDate
      var selectDates = {
        start: startDate,
        end: endDate,
      }

      var _ref4 = (dayPropGetter && dayPropGetter(max)) || {},
        className = _ref4.className,
        style = _ref4.style

      var current = getNow()
      return _react.default.createElement(
        'div',
        {
          style: style,
          className: (0, _classnames.default)(
            className,
            'rbc-day-slot',
            'rbc-time-column',
            selecting && 'rbc-slot-selecting',
            _dates.default.eq(date, current, 'day') && 'rbc-today'
          ),
        },
        slotMetrics.groups.map(function(grp, idx) {
          return _react.default.createElement(_TimeSlotGroup.default, {
            key: idx,
            group: grp,
            resource: resource,
            slotPropGetter: slotPropGetter,
            timeSlotWrapperComponent: timeSlotWrapperComponent,
          })
        }),
        _react.default.createElement(
          'div',
          {
            className: (0, _classnames.default)(
              'rbc-events-container',
              rtl && 'rtl'
            ),
          },
          this.renderEvents()
        ),
        selecting &&
          _react.default.createElement(
            'div',
            {
              className: 'rbc-slot-selection',
              style: {
                top: top,
                height: height,
              },
            },
            _react.default.createElement(
              'span',
              null,
              _localizer.default.format(selectDates, selectRangeFormat, culture)
            )
          )
      )
    }

    return DayColumn
  })(_react.default.Component)

DayColumn.propTypes = {
  events: _propTypes.default.array.isRequired,
  components: _propTypes.default.object,
  step: _propTypes.default.number.isRequired,
  date: _propTypes.default.instanceOf(Date).isRequired,
  min: _propTypes.default.instanceOf(Date).isRequired,
  max: _propTypes.default.instanceOf(Date).isRequired,
  getNow: _propTypes.default.func.isRequired,
  rtl: _propTypes.default.bool,
  titleAccessor: _propTypes2.accessor,
  tooltipAccessor: _propTypes2.accessor,
  allDayAccessor: _propTypes2.accessor.isRequired,
  startAccessor: _propTypes2.accessor.isRequired,
  endAccessor: _propTypes2.accessor.isRequired,
  selectRangeFormat: _propTypes2.dateFormat,
  eventTimeRangeFormat: _propTypes2.dateFormat,
  eventTimeRangeStartFormat: _propTypes2.dateFormat,
  eventTimeRangeEndFormat: _propTypes2.dateFormat,
  showMultiDayTimes: _propTypes.default.bool,
  culture: _propTypes.default.string,
  timeslots: _propTypes.default.number,
  messages: _propTypes.default.object,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  eventOffset: _propTypes.default.number,
  longPressThreshold: _propTypes.default.number,
  onSelecting: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func.isRequired,
  onSelectEvent: _propTypes.default.func.isRequired,
  onDoubleClickEvent: _propTypes.default.func.isRequired,
  className: _propTypes.default.string,
  dragThroughEvents: _propTypes.default.bool,
  eventPropGetter: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func,
  slotPropGetter: _propTypes.default.func,
  timeSlotWrapperComponent: _propTypes2.elementType,
  eventComponent: _propTypes2.elementType,
  eventWrapperComponent: _propTypes2.elementType.isRequired,
  resource: _propTypes.default.any,
}
DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}
var _default = DayColumn
exports.default = _default
module.exports = exports['default']
