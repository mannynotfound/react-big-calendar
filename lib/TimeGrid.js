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

var _propTypes = _interopRequireDefault(require('prop-types'))

var _classnames = _interopRequireDefault(require('classnames'))

var _requestAnimationFrame = _interopRequireDefault(
  require('dom-helpers/util/requestAnimationFrame')
)

var _react = _interopRequireWildcard(require('react'))

var _reactDom = require('react-dom')

var _dates = _interopRequireDefault(require('./utils/dates'))

var _DayColumn = _interopRequireDefault(require('./DayColumn'))

var _TimeGutter = _interopRequireDefault(require('./TimeGutter'))

var _width = _interopRequireDefault(require('dom-helpers/query/width'))

var _TimeGridHeader = _interopRequireDefault(require('./TimeGridHeader'))

var _propTypes2 = require('./utils/propTypes')

var _helpers = require('./utils/helpers')

var _accessors = require('./utils/accessors')

var _eventLevels = require('./utils/eventLevels')

var TimeGrid =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(TimeGrid, _Component)

    function TimeGrid(props) {
      var _this

      _this = _Component.call(this, props) || this

      _this.handleResize = function() {
        _requestAnimationFrame.default.cancel(_this.rafHandle)

        _this.rafHandle = (0, _requestAnimationFrame.default)(
          _this.checkOverflow
        )
      }

      _this.gutterRef = function(ref) {
        _this.gutter = ref && (0, _reactDom.findDOMNode)(ref)
      }

      _this.handleSelectAlldayEvent = function() {
        //cancel any pending selections so only the event click goes through.
        _this.clearSelection()

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        ;(0, _helpers.notify)(_this.props.onSelectEvent, args)
      }

      _this.handleSelectAllDaySlot = function(slots, slotInfo) {
        var onSelectSlot = _this.props.onSelectSlot
        ;(0, _helpers.notify)(onSelectSlot, {
          slots: slots,
          start: slots[0],
          end: slots[slots.length - 1],
          action: slotInfo.action,
        })
      }

      _this.checkOverflow = function() {
        if (_this._updatingOverflow) return
        var isOverflowing =
          _this.refs.content.scrollHeight > _this.refs.content.clientHeight

        if (_this.state.isOverflowing !== isOverflowing) {
          _this._updatingOverflow = true

          _this.setState(
            {
              isOverflowing: isOverflowing,
            },
            function() {
              _this._updatingOverflow = false
            }
          )
        }
      }

      _this.state = {
        gutterWidth: undefined,
        isOverflowing: null,
      }
      return _this
    }

    var _proto = TimeGrid.prototype

    _proto.componentWillMount = function componentWillMount() {
      this.calculateScroll()
    }

    _proto.componentDidMount = function componentDidMount() {
      this.checkOverflow()

      if (this.props.width == null) {
        this.measureGutter()
      }

      this.applyScroll()
      this.positionTimeIndicator()
      this.triggerTimeIndicatorUpdate()
      window.addEventListener('resize', this.handleResize)
    }

    _proto.componentWillUnmount = function componentWillUnmount() {
      window.clearTimeout(this._timeIndicatorTimeout)
      window.removeEventListener('resize', this.handleResize)

      _requestAnimationFrame.default.cancel(this.rafHandle)
    }

    _proto.componentDidUpdate = function componentDidUpdate() {
      if (this.props.width == null) {
        this.measureGutter()
      }

      this.applyScroll()
      this.positionTimeIndicator() //this.checkOverflow()
    }

    _proto.componentWillReceiveProps = function componentWillReceiveProps(
      nextProps
    ) {
      var _this$props = this.props,
        range = _this$props.range,
        scrollToTime = _this$props.scrollToTime // When paginating, reset scroll

      if (
        !_dates.default.eq(nextProps.range[0], range[0], 'minute') ||
        !_dates.default.eq(nextProps.scrollToTime, scrollToTime, 'minute')
      ) {
        this.calculateScroll(nextProps)
      }
    }

    _proto.renderEvents = function renderEvents(
      range,
      events,
      today,
      resources
    ) {
      var _this2 = this

      var _this$props2 = this.props,
        min = _this$props2.min,
        max = _this$props2.max,
        endAccessor = _this$props2.endAccessor,
        startAccessor = _this$props2.startAccessor,
        resourceAccessor = _this$props2.resourceAccessor,
        resourceIdAccessor = _this$props2.resourceIdAccessor,
        components = _this$props2.components
      return range.map(function(date, idx) {
        var daysEvents = events.filter(function(event) {
          return _dates.default.inRange(
            date,
            (0, _accessors.accessor)(event, startAccessor),
            (0, _accessors.accessor)(event, endAccessor),
            'day'
          )
        })
        return resources.map(function(resource, id) {
          var eventsToDisplay = !resource
            ? daysEvents
            : daysEvents.filter(function(event) {
                return (
                  (0, _accessors.accessor)(event, resourceAccessor) ===
                  (0, _accessors.accessor)(resource, resourceIdAccessor)
                )
              })
          return _react.default.createElement(
            _DayColumn.default,
            (0, _extends2.default)({}, _this2.props, {
              min: _dates.default.merge(date, min),
              max: _dates.default.merge(date, max),
              resource: (0, _accessors.accessor)(resource, resourceIdAccessor),
              eventComponent: components.event,
              eventWrapperComponent: components.eventWrapper,
              timeSlotWrapperComponent: components.dayWrapper,
              className: (0, _classnames.default)({
                'rbc-now': _dates.default.eq(date, today, 'day'),
              }),
              key: idx + '-' + id,
              date: date,
              events: eventsToDisplay,
            })
          )
        })
      })
    }

    _proto.render = function render() {
      var _this3 = this

      var _this$props3 = this.props,
        events = _this$props3.events,
        range = _this$props3.range,
        width = _this$props3.width,
        startAccessor = _this$props3.startAccessor,
        endAccessor = _this$props3.endAccessor,
        selected = _this$props3.selected,
        getNow = _this$props3.getNow,
        resources = _this$props3.resources,
        components = _this$props3.components,
        allDayAccessor = _this$props3.allDayAccessor,
        eventPropGetter = _this$props3.eventPropGetter,
        showMultiDayTimes = _this$props3.showMultiDayTimes,
        longPressThreshold = _this$props3.longPressThreshold
      width = width || this.state.gutterWidth
      var start = range[0],
        end = range[range.length - 1]
      this.slots = range.length
      var allDayEvents = [],
        rangeEvents = []
      events.forEach(function(event) {
        if ((0, _eventLevels.inRange)(event, start, end, _this3.props)) {
          var eStart = (0, _accessors.accessor)(event, startAccessor),
            eEnd = (0, _accessors.accessor)(event, endAccessor)

          if (
            (0, _accessors.accessor)(event, allDayAccessor) ||
            (_dates.default.isJustDate(eStart) &&
              _dates.default.isJustDate(eEnd)) ||
            (!showMultiDayTimes && !_dates.default.eq(eStart, eEnd, 'day'))
          ) {
            allDayEvents.push(event)
          } else {
            rangeEvents.push(event)
          }
        }
      })
      allDayEvents.sort(function(a, b) {
        return (0, _eventLevels.sortEvents)(a, b, _this3.props)
      })
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-time-view',
        },
        _react.default.createElement(_TimeGridHeader.default, {
          range: range,
          events: allDayEvents,
          width: width,
          getNow: getNow,
          dayFormat: this.props.dayFormat,
          culture: this.props.culture,
          resources: resources,
          selected: selected,
          selectable: this.props.selectable,
          startAccessor: startAccessor,
          endAccessor: endAccessor,
          titleAccessor: this.props.titleAccessor,
          tooltipAccessor: this.props.tooltipAccessor,
          allDayAccessor: this.props.allDayAccessor,
          resourceAccessor: this.props.resourceAccessor,
          resourceIdAccessor: this.props.resourceIdAccessor,
          resourceTitleAccessor: this.props.resourceTitleAccessor,
          isOverflowing: this.state.isOverflowing,
          dayPropGetter: this.props.dayPropGetter,
          eventPropGetter: eventPropGetter,
          longPressThreshold: longPressThreshold,
          headerComponent: components.header,
          eventComponent: components.event,
          eventWrapperComponent: components.eventWrapper,
          dateCellWrapperComponent: components.dateCellWrapper,
          onSelectSlot: this.handleSelectAllDaySlot,
          onSelectEvent: this.handleSelectAlldayEvent,
          onDoubleClickEvent: this.props.onDoubleClickEvent,
          onDrillDown: this.props.onDrillDown,
          getDrilldownView: this.props.getDrilldownView,
        }),
        _react.default.createElement(
          'div',
          {
            ref: 'content',
            className: 'rbc-time-content',
          },
          _react.default.createElement(
            _TimeGutter.default,
            (0, _extends2.default)({}, this.props, {
              date: start,
              ref: this.gutterRef,
              className: 'rbc-time-gutter',
            })
          ),
          this.renderEvents(range, rangeEvents, getNow(), resources || [null]),
          _react.default.createElement('div', {
            ref: 'timeIndicator',
            className: 'rbc-current-time-indicator',
          })
        )
      )
    }

    _proto.clearSelection = function clearSelection() {
      clearTimeout(this._selectTimer)
      this._pendingSelection = []
    }

    _proto.measureGutter = function measureGutter() {
      var width = (0, _width.default)(this.gutter)

      if (width && this.state.gutterWidth !== width) {
        this.setState({
          gutterWidth: width,
        })
      }
    }

    _proto.applyScroll = function applyScroll() {
      if (this._scrollRatio) {
        var content = this.refs.content
        content.scrollTop = content.scrollHeight * this._scrollRatio // Only do this once

        this._scrollRatio = null
      }
    }

    _proto.calculateScroll = function calculateScroll(props) {
      if (props === void 0) {
        props = this.props
      }

      var _props = props,
        min = _props.min,
        max = _props.max,
        scrollToTime = _props.scrollToTime

      var diffMillis =
        scrollToTime - _dates.default.startOf(scrollToTime, 'day')

      var totalMillis = _dates.default.diff(max, min)

      this._scrollRatio = diffMillis / totalMillis
    }

    _proto.positionTimeIndicator = function positionTimeIndicator() {
      var _this$props4 = this.props,
        rtl = _this$props4.rtl,
        min = _this$props4.min,
        max = _this$props4.max,
        getNow = _this$props4.getNow,
        range = _this$props4.range
      var current = getNow()

      var secondsGrid = _dates.default.diff(max, min, 'seconds')

      var secondsPassed = _dates.default.diff(current, min, 'seconds')

      var timeIndicator = this.refs.timeIndicator
      var factor = secondsPassed / secondsGrid
      var timeGutter = this.gutter
      var content = this.refs.content

      if (timeGutter && current >= min && current <= max) {
        var pixelHeight = timeGutter.offsetHeight
        var dayPixelWidth =
          (content.offsetWidth - timeGutter.offsetWidth) / this.slots
        var dayOffset =
          range.findIndex(function(d) {
            return _dates.default.eq(d, _dates.default.today(), 'day')
          }) * dayPixelWidth
        var offset = Math.floor(factor * pixelHeight)
        timeIndicator.style.display = dayOffset >= 0 ? 'block' : 'none'
        timeIndicator.style[rtl ? 'left' : 'right'] = 0
        timeIndicator.style[rtl ? 'right' : 'left'] =
          timeGutter.offsetWidth + dayOffset + 'px'
        timeIndicator.style.top = offset + 'px'
        timeIndicator.style.width = dayPixelWidth + 'px'
      } else {
        timeIndicator.style.display = 'none'
      }
    }

    _proto.triggerTimeIndicatorUpdate = function triggerTimeIndicatorUpdate() {
      var _this4 = this

      // Update the position of the time indicator every minute
      this._timeIndicatorTimeout = window.setTimeout(function() {
        _this4.positionTimeIndicator()

        _this4.triggerTimeIndicatorUpdate()
      }, 60000)
    }

    return TimeGrid
  })(_react.Component)

exports.default = TimeGrid
TimeGrid.propTypes = {
  events: _propTypes.default.array.isRequired,
  resources: _propTypes.default.array,
  step: _propTypes.default.number,
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  min: _propTypes.default.instanceOf(Date),
  max: _propTypes.default.instanceOf(Date),
  getNow: _propTypes.default.func.isRequired,
  scrollToTime: _propTypes.default.instanceOf(Date),
  eventPropGetter: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func,
  dayFormat: _propTypes2.dateFormat,
  showMultiDayTimes: _propTypes.default.bool,
  culture: _propTypes.default.string,
  rtl: _propTypes.default.bool,
  width: _propTypes.default.number,
  titleAccessor: _propTypes2.accessor.isRequired,
  tooltipAccessor: _propTypes2.accessor.isRequired,
  allDayAccessor: _propTypes2.accessor.isRequired,
  startAccessor: _propTypes2.accessor.isRequired,
  endAccessor: _propTypes2.accessor.isRequired,
  resourceAccessor: _propTypes2.accessor.isRequired,
  resourceIdAccessor: _propTypes2.accessor.isRequired,
  resourceTitleAccessor: _propTypes2.accessor.isRequired,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onNavigate: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func,
  onSelectEnd: _propTypes.default.func,
  onSelectStart: _propTypes.default.func,
  onSelectEvent: _propTypes.default.func,
  onDoubleClickEvent: _propTypes.default.func,
  onDrillDown: _propTypes.default.func,
  getDrilldownView: _propTypes.default.func.isRequired,
  messages: _propTypes.default.object,
  components: _propTypes.default.object.isRequired,
}
TimeGrid.defaultProps = {
  step: 30,
  timeslots: 2,
  min: _dates.default.startOf(new Date(), 'day'),
  max: _dates.default.endOf(new Date(), 'day'),
  scrollToTime: _dates.default.startOf(new Date(), 'day'),
}
module.exports = exports['default']
