'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDnd = require('react-dnd')

var _reactDndHtml5Backend = require('react-dnd-html5-backend')

var _classnames = _interopRequireDefault(require('classnames'))

var _compose = _interopRequireDefault(require('./compose'))

var _propTypes2 = require('../../utils/propTypes')

var _accessors = require('../../utils/accessors')

var _index = _interopRequireDefault(require('../../index'))

var DraggableEventWrapper =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(DraggableEventWrapper, _React$Component)

    function DraggableEventWrapper() {
      return _React$Component.apply(this, arguments) || this
    }

    var _proto = DraggableEventWrapper.prototype

    _proto.componentDidMount = function componentDidMount() {
      // this is needed to prevent the backend from
      // screenshot'ing the event during a resize which
      // would be very confusing visually
      var emptyImage = (0, _reactDndHtml5Backend.getEmptyImage)()
      var previewOptions = {
        captureDraggingState: true,
      }
      this.props.connectTopDragPreview(emptyImage, previewOptions)
      this.props.connectBottomDragPreview(emptyImage, previewOptions)
      this.props.connectLeftDragPreview(emptyImage, previewOptions)
      this.props.connectRightDragPreview(emptyImage, previewOptions)
    }

    _proto.render = function render() {
      var components = this.context.components
      var EventWrapper =
        components.eventWrapper || _index.default.components.eventWrapper
      var _this$props = this.props,
        connectDragSource = _this$props.connectDragSource,
        connectTopDragSource = _this$props.connectTopDragSource,
        connectBottomDragSource = _this$props.connectBottomDragSource,
        connectLeftDragSource = _this$props.connectLeftDragSource,
        connectRightDragSource = _this$props.connectRightDragSource,
        isDragging = _this$props.isDragging,
        isResizing = _this$props.isResizing,
        children = _this$props.children,
        event = _this$props.event,
        allDay = _this$props.allDay,
        isRow = _this$props.isRow,
        continuesPrior = _this$props.continuesPrior,
        continuesAfter = _this$props.continuesAfter
      var _this$context = this.context,
        draggableAccessor = _this$context.draggableAccessor,
        resizableAccessor = _this$context.resizableAccessor
      var isDraggable = draggableAccessor
        ? !!(0, _accessors.accessor)(event, draggableAccessor)
        : true
      /* Event is not draggable, no need to wrap it */

      if (!isDraggable) {
        return children
      }

      var StartAnchor = null,
        EndAnchor = null
      /*
     * The resizability of events depends on whether they are
     * allDay events and how they are displayed.
     *
     * 1. If the event is being shown in an event row (because
     * it is an allDay event shown in the header row or because as
     * in month view the view is showing all events as rows) then we
     * allow east-west resizing.
     *
     * 2. Otherwise the event is being displayed
     * normally, we can drag it north-south to resize the times.
     *
     * See `DropWrappers` for handling of the drop of such events.
     *
     * Notwithstanding the above, we never show drag anchors for
     * events which continue beyond current component. This happens
     * in the middle of events when showMultiDay is true, and to
     * events at the edges of the calendar's min/max location.
     */

      var isResizable = resizableAccessor
        ? !!(0, _accessors.accessor)(event, resizableAccessor)
        : true

      if (isResizable) {
        if (isRow || allDay) {
          var anchor = _react.default.createElement(
            'div',
            {
              className: 'rbc-addons-dnd-resize-ew-anchor',
            },
            _react.default.createElement('div', {
              className: 'rbc-addons-dnd-resize-ew-icon',
            })
          )

          StartAnchor = !continuesPrior && connectLeftDragSource(anchor)
          EndAnchor = !continuesAfter && connectRightDragSource(anchor)
        } else {
          var _anchor = _react.default.createElement(
            'div',
            {
              className: 'rbc-addons-dnd-resize-ns-anchor',
            },
            _react.default.createElement('div', {
              className: 'rbc-addons-dnd-resize-ns-icon',
            })
          )

          StartAnchor = !continuesPrior && connectTopDragSource(_anchor)
          EndAnchor = !continuesAfter && connectBottomDragSource(_anchor)
        }
        /*
      * props.children is the singular <Event> component.
      * BigCalendar positions the Event abolutely and we
      * need the anchors to be part of that positioning.
      * So we insert the anchors inside the Event's children
      * rather than wrap the Event here as the latter approach
      * would lose the positioning.
      */

        var childrenWithAnchors = _react.default.createElement(
          'div',
          {
            className: 'rbc-addons-dnd-resizable',
          },
          StartAnchor,
          children.props.children,
          EndAnchor
        )

        children = _react.default.cloneElement(children, {
          className: (0, _classnames.default)(
            children.props.className,
            isDragging && 'rbc-addons-dnd-dragging',
            isResizing && 'rbc-addons-dnd-resizing'
          ),
          children: childrenWithAnchors, // replace original event child with anchor-embellished child
        })
      }

      return _react.default.createElement(
        EventWrapper,
        {
          event: event,
          allDay: allDay,
        },
        connectDragSource(children)
      )
    }

    return DraggableEventWrapper
  })(_react.default.Component)
/* drag sources */

DraggableEventWrapper.contextTypes = {
  components: _propTypes.default.object,
  draggableAccessor: _propTypes2.accessor,
  resizableAccessor: _propTypes2.accessor,
}
DraggableEventWrapper.propTypes = {
  event: _propTypes.default.object.isRequired,
  connectDragSource: _propTypes.default.func.isRequired,
  connectTopDragPreview: _propTypes.default.func.isRequired,
  connectTopDragSource: _propTypes.default.func.isRequired,
  connectBottomDragPreview: _propTypes.default.func.isRequired,
  connectBottomDragSource: _propTypes.default.func.isRequired,
  connectLeftDragPreview: _propTypes.default.func.isRequired,
  connectLeftDragSource: _propTypes.default.func.isRequired,
  connectRightDragPreview: _propTypes.default.func.isRequired,
  connectRightDragSource: _propTypes.default.func.isRequired,
  draggable: _propTypes.default.bool,
  allDay: _propTypes.default.bool,
  isRow: _propTypes.default.bool,
  continuesPrior: _propTypes.default.bool,
  continuesAfter: _propTypes.default.bool,
  isDragging: _propTypes.default.bool,
  isResizing: _propTypes.default.bool,
}

var makeEventSource = function makeEventSource(anchor) {
  return {
    beginDrag: function beginDrag(_ref) {
      var event = _ref.event
      return {
        event: event,
        anchor: anchor,
      }
    }, //canDrag: ({ event }) => true, // support per-event dragability/sizability
  }
}

var _default = (0, _compose.default)(
  (0, _reactDnd.DragSource)('event', makeEventSource('drop'), function(
    connect,
    monitor
  ) {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }
  }),
  (0, _reactDnd.DragSource)('event', makeEventSource('resizeTop'), function(
    connect,
    monitor
  ) {
    return {
      connectTopDragSource: connect.dragSource(),
      connectTopDragPreview: connect.dragPreview(),
      isResizing: monitor.isDragging(),
    }
  }),
  (0, _reactDnd.DragSource)('event', makeEventSource('resizeBottom'), function(
    connect,
    monitor
  ) {
    return {
      connectBottomDragSource: connect.dragSource(),
      connectBottomDragPreview: connect.dragPreview(),
      isResizing: monitor.isDragging(),
    }
  }),
  (0, _reactDnd.DragSource)('event', makeEventSource('resizeLeft'), function(
    connect,
    monitor
  ) {
    return {
      connectLeftDragSource: connect.dragSource(),
      connectLeftDragPreview: connect.dragPreview(),
      isResizing: monitor.isDragging(),
    }
  }),
  (0, _reactDnd.DragSource)('event', makeEventSource('resizeRight'), function(
    connect,
    monitor
  ) {
    return {
      connectRightDragSource: connect.dragSource(),
      connectRightDragPreview: connect.dragPreview(),
      isResizing: monitor.isDragging(),
    }
  })
)(DraggableEventWrapper)

exports.default = _default
module.exports = exports['default']
