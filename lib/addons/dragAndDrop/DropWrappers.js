'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.DroppableDayWrapper = exports.DroppableDateCellWrapper = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDnd = require('react-dnd')

var _classnames = _interopRequireDefault(require('classnames'))

var _noop = _interopRequireDefault(require('lodash/noop'))

var _propTypes2 = require('../../utils/propTypes')

var _accessors = require('../../utils/accessors')

var _dates = _interopRequireDefault(require('../../utils/dates'))

var _index = _interopRequireDefault(require('../../index'))

function getEventDropProps(start, end, dropDate, droppedInAllDay) {
  // Calculate duration between original start and end dates
  var duration = _dates.default.diff(start, end)
  /*
   * If the event is dropped in a "Day" cell, preserve an event's start time by extracting the hours and minutes off
   * the original start date and add it to newDate.value
   *
   * note: this behavior remains for backward compatibility, but might be counter-intuitive to some:
   * dragging an event from the grid to the day header might more commonly mean "make this an allDay event
   * on that day" - but the behavior here implements "keep the times of the event, but move it to the
   * new day".
   *
   * To permit either interpretation, we embellish a new `allDay` parameter which determines whether the
   * event was dropped on the day header or not.
   */

  var nextStart = droppedInAllDay
    ? _dates.default.merge(dropDate, start)
    : dropDate

  var nextEnd = _dates.default.add(nextStart, duration, 'milliseconds')

  return {
    start: nextStart,
    end: nextEnd,
    allDay: droppedInAllDay,
  }
}

var DropWrapper =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(DropWrapper, _React$Component)

    function DropWrapper() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = DropWrapper.prototype

    _proto.render = function render() {
      var _this$props = this.props,
        connectDropTarget = _this$props.connectDropTarget,
        children = _this$props.children,
        isOver = _this$props.isOver,
        range = _this$props.range,
        type = _this$props.type,
        value = _this$props.value // Check if wrapper component of this type was passed in, otherwise use library default

      var components = this.context.components
      var BackgroundWrapper =
        components[type] || _index.default.components[type]
      var backgroundWrapperProps = {
        value: value,
      }

      if (range) {
        backgroundWrapperProps.range = range
      }

      var resultingChildren = children

      if (isOver) {
        resultingChildren = _react.default.cloneElement(children, {
          className: (0, _classnames.default)(
            children.props.className,
            'rbc-addons-dnd-over'
          ),
        })
      }

      return _react.default.createElement(
        BackgroundWrapper,
        backgroundWrapperProps,
        connectDropTarget(resultingChildren)
      )
    }

    return DropWrapper
  })(_react.default.Component)

DropWrapper.propTypes = {
  connectDropTarget: _propTypes.default.func.isRequired,
  isOver: _propTypes.default.bool,
  range: _propTypes.default.arrayOf(_propTypes.default.instanceOf(Date)),
  type: _propTypes.default.string,
  value: _propTypes.default.instanceOf(Date),
}
DropWrapper.contextTypes = {
  onEventDrop: _propTypes.default.func,
  onEventResize: _propTypes.default.func,
  components: _propTypes.default.object,
  dragDropManager: _propTypes.default.object,
  startAccessor: _propTypes2.accessor,
  endAccessor: _propTypes2.accessor,
  allDayAccessor: _propTypes2.accessor,
  step: _propTypes.default.number, // TODO: this is WIP to retain the drag offset so the
  // drag target better tracks the mouseDown location, not
  // just the top of the event.
  //
  // constructor(...args) {
  //   super(...args);
  //   this.state = { isOver: false };
  // }
  //
  // componentWillMount() {
  //   let monitor = this.context.dragDropManager.getMonitor()
  //
  //   this.monitor = monitor
  //
  //   this.unsubscribeToStateChange = monitor
  //     .subscribeToStateChange(this.handleStateChange)
  //
  //   this.unsubscribeToOffsetChange = monitor
  //     .subscribeToOffsetChange(this.handleOffsetChange)
  // }
  //
  // componentWillUnmount() {
  //   this.monitor = null
  //   this.unsubscribeToStateChange()
  //   this.unsubscribeToOffsetChange()
  // }
  //
  // handleStateChange = () => {
  //   const event = this.monitor.getItem();
  //   if (!event && this.state.isOver) {
  //     this.setState({ isOver: false });
  //   }
  // }
  //
  // handleOffsetChange = () => {
  //   const { value } = this.props;
  //   const { start, end } = this.monitor.getItem();
  //
  //   const isOver = dates.inRange(value, start, end, 'minute');
  //   if (this.state.isOver !== isOver) {
  //     this.setState({ isOver });
  //   }
  // };
}

function createDropWrapper(type) {
  function collectTarget(connect, monitor) {
    return {
      type: type,
      connectDropTarget: connect.dropTarget(),
      isOver: monitor.isOver(),
    }
  }

  var dropTarget = {
    drop: function drop(_, monitor, _ref) {
      var props = _ref.props,
        context = _ref.context
      var itemType = monitor.getItemType()
      if (itemType !== 'event') return
      var item = monitor.getItem()
      var event = item.event,
        anchor = item.anchor
      var value = props.value,
        resource = props.resource
      var _context$onEventDrop = context.onEventDrop,
        onEventDrop =
          _context$onEventDrop === void 0
            ? _noop.default
            : _context$onEventDrop,
        _context$onEventResiz = context.onEventResize,
        onEventResize =
          _context$onEventResiz === void 0
            ? _noop.default
            : _context$onEventResiz,
        startAccessor = context.startAccessor,
        endAccessor = context.endAccessor,
        allDayAccessor = context.allDayAccessor,
        step = context.step
      var start = (0, _accessors.accessor)(event, startAccessor)
      var end = (0, _accessors.accessor)(event, endAccessor)
      var allDay = (0, _accessors.accessor)(event, allDayAccessor)
      var droppedInAllDay = type === 'dateCellWrapper'

      switch (anchor) {
        case 'drop':
          onEventDrop(
            (0, _extends2.default)(
              {
                event: event,
              },
              getEventDropProps(start, end, value, droppedInAllDay),
              {
                resourceId: resource,
              }
            )
          )
          return
        // all the other cases issue resize action...
        // the remaining cases are all resizes...

        case 'resizeTop':
          // dragging the top means the event isn't an allDay
          // dropping into the header changes the date, preserves the time
          // dropping elsewhere is just a normal resize
          start = droppedInAllDay ? _dates.default.merge(value, start) : value
          break

        case 'resizeBottom':
          // dragging the bottom means the event isn't an allDay
          // dropping into the header changes the date, preserves the time
          // dropping elsewhere is just a normal resize
          // ... but end dates are exclusive so advance it the next slot (e.g. just past the end of this one)
          end = droppedInAllDay
            ? _dates.default.merge(value, end)
            : _dates.default.add(value, step, 'minutes')
          break

        case 'resizeLeft':
          // dragging the left means we're dragging something from an event row
          // all cases are the same:
          // preserve its start time, but change the date (works for both allDay and non-allDay)
          start = _dates.default.merge(value, start)
          break

        case 'resizeRight':
          // dragging the right means we're dragging something from an event row
          // this case is tricky: for non-allDay events, we just want to change
          // the end date (preserving the end time). For allDay events, we want to change
          // the end date to one day later than the drop date because end dates are exclusive
          end = allDay
            ? _dates.default.add(value, 1, 'day')
            : _dates.default.merge(value, end)
          break

        default:
          return
        // don't issue resize
      } // fall here for all of the resize cases
      // note: the 'drop' param is here for backward compatibility - maybe remove in future?

      onEventResize('drop', {
        event: event,
        start: start,
        end: end,
        resourceId: resource,
        allDay: droppedInAllDay,
      })
    },
  }
  return (0, _reactDnd.DropTarget)('event', dropTarget, collectTarget)(
    DropWrapper
  )
}

var DroppableDateCellWrapper = createDropWrapper('dateCellWrapper')
exports.DroppableDateCellWrapper = DroppableDateCellWrapper
var DroppableDayWrapper = createDropWrapper('dayWrapper')
exports.DroppableDayWrapper = DroppableDayWrapper
