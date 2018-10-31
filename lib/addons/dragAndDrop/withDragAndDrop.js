'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = withDragAndDrop

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

var _reactDnd = require('react-dnd')

var _classnames = _interopRequireDefault(require('classnames'))

var _propTypes2 = require('../../utils/propTypes')

var _DraggableEventWrapper = _interopRequireDefault(
  require('./DraggableEventWrapper')
)

var _DropWrappers = require('./DropWrappers')

var html5Backend

try {
  html5Backend = require('react-dnd-html5-backend')
} catch (err) {}
/* optional dep missing */

/**
 * Creates a higher-order component (HOC) supporting drag & drop and optionally resizing
 * of events:
 *
 * ```js
 *    import Calendar from 'react-big-calendar'
 *    import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
 *    export default withDragAndDrop(Calendar)
 * ```
 * (you can optionally pass any dnd backend as an optional second argument to `withDragAndDrop`.
 * It defaults to `react-dnd-html5-backend` which you should probably include in
 * your project if using this default).
 *
 * Set `resizable` to true in your calendar if you want events to be resizable.
 *
 * The HOC adds `onEventDrop` and `onEventResize` callback properties if the events are
 * moved or resized. They are called with these signatures:
 *
 * ```js
 *    function onEventDrop({ event, start, end, allDay }) {...}
 *    function onEventResize(type, { event, start, end, allDay }) {...}  // type is always 'drop'
 * ```
 *
 * Moving and resizing of events has some subtlety which one should be aware of.
 *
 * In some situations, non-allDay events are displayed in "row" format where they
 * are rendered horizontally. This is the case for ALL events in a month view. It
 * is also occurs with multi-day events in a day or week view (unless `showMultiDayTimes`
 * is set).
 *
 * When dropping or resizing non-allDay events into a the header area or when
 * resizing them horizontally because they are displayed in row format, their
 * times are preserved, only their date is changed.
 *
 * If you care about these corner cases, you can examine the `allDay` param suppled
 * in the callback to determine how the user dropped or resized the event.
 *
 * @param {*} Calendar
 * @param {*} backend
 */

function withDragAndDrop(Calendar, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    _ref$backend = _ref.backend,
    backend = _ref$backend === void 0 ? html5Backend : _ref$backend

  var DragAndDropCalendar =
    /*#__PURE__*/
    (function(_React$Component) {
      ;(0, _inheritsLoose2.default)(DragAndDropCalendar, _React$Component)
      var _proto = DragAndDropCalendar.prototype

      _proto.getChildContext = function getChildContext() {
        return {
          onEventDrop: this.props.onEventDrop,
          onEventResize: this.props.onEventResize,
          components: this.props.components,
          startAccessor: this.props.startAccessor,
          endAccessor: this.props.endAccessor,
          step: this.props.step,
          draggableAccessor: this.props.draggableAccessor,
          resizableAccessor: this.props.resizableAccessor,
        }
      }

      function DragAndDropCalendar() {
        var _this

        for (
          var _len = arguments.length, args = new Array(_len), _key = 0;
          _key < _len;
          _key++
        ) {
          args[_key] = arguments[_key]
        }

        _this =
          _React$Component.call.apply(_React$Component, [this].concat(args)) ||
          this

        _this.handleStateChange = function() {
          var isDragging = !!_this.monitor.getItem()

          if (isDragging !== _this.state.isDragging) {
            setTimeout(function() {
              return _this.setState({
                isDragging: isDragging,
              })
            })
          }
        }

        _this.state = {
          isDragging: false,
        }
        return _this
      }

      _proto.componentWillMount = function componentWillMount() {
        var monitor = this.context.dragDropManager.getMonitor()
        this.monitor = monitor
        this.unsubscribeToStateChange = monitor.subscribeToStateChange(
          this.handleStateChange
        )
      }

      _proto.componentWillUnmount = function componentWillUnmount() {
        this.monitor = null
        this.unsubscribeToStateChange()
      }

      _proto.render = function render() {
        var _this$props = this.props,
          selectable = _this$props.selectable,
          components = _this$props.components,
          props = (0, _objectWithoutPropertiesLoose2.default)(_this$props, [
            'selectable',
            'components',
          ])
        delete props.onEventDrop
        delete props.onEventResize
        props.selectable = selectable ? 'ignoreEvents' : false
        props.className = (0, _classnames.default)(
          props.className,
          'rbc-addons-dnd',
          this.state.isDragging && 'rbc-addons-dnd-is-dragging'
        )
        props.components = (0, _extends2.default)({}, components, {
          dateCellWrapper: _DropWrappers.DroppableDateCellWrapper,
          dayWrapper: _DropWrappers.DroppableDayWrapper,
          eventWrapper: _DraggableEventWrapper.default,
        })
        return _react.default.createElement(Calendar, props)
      }

      return DragAndDropCalendar
    })(_react.default.Component)

  DragAndDropCalendar.propTypes = {
    onEventDrop: _propTypes.default.func,
    onEventResize: _propTypes.default.func,
    startAccessor: _propTypes2.accessor,
    endAccessor: _propTypes2.accessor,
    allDayAccessor: _propTypes2.accessor,
    draggableAccessor: _propTypes2.accessor,
    resizableAccessor: _propTypes2.accessor,
    selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
    resizable: _propTypes.default.bool,
    components: _propTypes.default.object,
    step: _propTypes.default.number,
  }
  DragAndDropCalendar.defaultProps = {
    // TODO: pick these up from Calendar.defaultProps
    components: {},
    startAccessor: 'start',
    endAccessor: 'end',
    allDayAccessor: 'allDay',
    draggableAccessor: null,
    resizableAccessor: null,
    step: 30,
  }
  DragAndDropCalendar.contextTypes = {
    dragDropManager: _propTypes.default.object,
  }
  DragAndDropCalendar.childContextTypes = {
    onEventDrop: _propTypes.default.func,
    onEventResize: _propTypes.default.func,
    components: _propTypes.default.object,
    startAccessor: _propTypes2.accessor,
    endAccessor: _propTypes2.accessor,
    draggableAccessor: _propTypes2.accessor,
    resizableAccessor: _propTypes2.accessor,
    step: _propTypes.default.number,
  }

  if (backend === false) {
    return DragAndDropCalendar
  } else {
    return (0, _reactDnd.DragDropContext)(backend)(DragAndDropCalendar)
  }
}

module.exports = exports['default']
