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

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _classnames = _interopRequireDefault(require('classnames'))

var _height = _interopRequireDefault(require('dom-helpers/query/height'))

var _querySelectorAll = _interopRequireDefault(
  require('dom-helpers/query/querySelectorAll')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _reactDom = require('react-dom')

var _dates = _interopRequireDefault(require('./utils/dates'))

var _propTypes2 = require('./utils/propTypes')

var _eventLevels2 = require('./utils/eventLevels')

var _BackgroundCells = _interopRequireDefault(require('./BackgroundCells'))

var _EventRow = _interopRequireDefault(require('./EventRow'))

var _EventEndingRow = _interopRequireDefault(require('./EventEndingRow'))

var isSegmentInSlot = function isSegmentInSlot(seg, slot) {
  return seg.left <= slot && seg.right >= slot
}

var propTypes = {
  date: _propTypes.default.instanceOf(Date),
  events: _propTypes.default.array.isRequired,
  range: _propTypes.default.array.isRequired,
  rtl: _propTypes.default.bool,
  renderForMeasure: _propTypes.default.bool,
  renderHeader: _propTypes.default.func,
  container: _propTypes.default.func,
  selected: _propTypes.default.object,
  selectable: _propTypes.default.oneOf([true, false, 'ignoreEvents']),
  longPressThreshold: _propTypes.default.number,
  onShowMore: _propTypes.default.func,
  onSelectSlot: _propTypes.default.func,
  onSelectEnd: _propTypes.default.func,
  onSelectStart: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func,
  getNow: _propTypes.default.func.isRequired,
  startAccessor: _propTypes2.accessor.isRequired,
  endAccessor: _propTypes2.accessor.isRequired,
  eventComponent: _propTypes2.elementType,
  eventWrapperComponent: _propTypes2.elementType.isRequired,
  dateCellWrapperComponent: _propTypes2.elementType,
  minRows: _propTypes.default.number.isRequired,
  maxRows: _propTypes.default.number.isRequired,
}
var defaultProps = {
  minRows: 0,
  maxRows: Infinity,
}

var DateContentRow =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(DateContentRow, _React$Component)

    function DateContentRow() {
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

      _this.handleSelectSlot = function(slot) {
        var _this$props = _this.props,
          range = _this$props.range,
          onSelectSlot = _this$props.onSelectSlot
        onSelectSlot(range.slice(slot.start, slot.end + 1), slot)
      }

      _this.handleShowMore = function(slot) {
        var _this$props2 = _this.props,
          range = _this$props2.range,
          onShowMore = _this$props2.onShowMore
        var row = (0, _querySelectorAll.default)(
          (0, _reactDom.findDOMNode)(
            (0, _assertThisInitialized2.default)(
              (0, _assertThisInitialized2.default)(_this)
            )
          ),
          '.rbc-row-bg'
        )[0]
        var cell
        if (row) cell = row.children[slot - 1]

        var events = _this.segments
          .filter(function(seg) {
            return isSegmentInSlot(seg, slot)
          })
          .map(function(seg) {
            return seg.event
          })

        onShowMore(events, range[slot - 1], cell, slot)
      }

      _this.createHeadingRef = function(r) {
        _this.headingRow = r
      }

      _this.createEventRef = function(r) {
        _this.eventRow = r
      }

      _this.getContainer = function() {
        var container = _this.props.container
        return container
          ? container()
          : (0, _reactDom.findDOMNode)(
              (0, _assertThisInitialized2.default)(
                (0, _assertThisInitialized2.default)(_this)
              )
            )
      }

      _this.renderHeadingCell = function(date, index) {
        var _this$props3 = _this.props,
          renderHeader = _this$props3.renderHeader,
          getNow = _this$props3.getNow
        return renderHeader({
          date: date,
          key: 'header_' + index,
          className: (0, _classnames.default)(
            'rbc-date-cell',
            _dates.default.eq(date, getNow(), 'day') && 'rbc-now'
          ),
        })
      }

      _this.renderDummy = function() {
        var _this$props4 = _this.props,
          className = _this$props4.className,
          range = _this$props4.range,
          renderHeader = _this$props4.renderHeader
        return _react.default.createElement(
          'div',
          {
            className: className,
          },
          _react.default.createElement(
            'div',
            {
              className: 'rbc-row-content',
            },
            renderHeader &&
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row',
                  ref: _this.createHeadingRef,
                },
                range.map(_this.renderHeadingCell)
              ),
            _react.default.createElement(
              'div',
              {
                className: 'rbc-row',
                ref: _this.createEventRef,
              },
              _react.default.createElement(
                'div',
                {
                  className: 'rbc-row-segment',
                },
                _react.default.createElement(
                  'div',
                  {
                    className: 'rbc-event',
                  },
                  _react.default.createElement(
                    'div',
                    {
                      className: 'rbc-event-content',
                    },
                    '\xA0'
                  )
                )
              )
            )
          )
        )
      }

      return _this
    }

    var _proto = DateContentRow.prototype

    _proto.getRowLimit = function getRowLimit() {
      var eventHeight = (0, _height.default)(this.eventRow)
      var headingHeight = this.headingRow
        ? (0, _height.default)(this.headingRow)
        : 0
      var eventSpace =
        (0, _height.default)((0, _reactDom.findDOMNode)(this)) - headingHeight
      return Math.max(Math.floor(eventSpace / eventHeight), 1)
    }

    _proto.render = function render() {
      var _this$props5 = this.props,
        date = _this$props5.date,
        rtl = _this$props5.rtl,
        events = _this$props5.events,
        range = _this$props5.range,
        className = _this$props5.className,
        selectable = _this$props5.selectable,
        dayPropGetter = _this$props5.dayPropGetter,
        renderForMeasure = _this$props5.renderForMeasure,
        startAccessor = _this$props5.startAccessor,
        endAccessor = _this$props5.endAccessor,
        getNow = _this$props5.getNow,
        renderHeader = _this$props5.renderHeader,
        minRows = _this$props5.minRows,
        maxRows = _this$props5.maxRows,
        dateCellWrapperComponent = _this$props5.dateCellWrapperComponent,
        eventComponent = _this$props5.eventComponent,
        eventWrapperComponent = _this$props5.eventWrapperComponent,
        onSelectStart = _this$props5.onSelectStart,
        onSelectEnd = _this$props5.onSelectEnd,
        longPressThreshold = _this$props5.longPressThreshold,
        props = (0, _objectWithoutPropertiesLoose2.default)(_this$props5, [
          'date',
          'rtl',
          'events',
          'range',
          'className',
          'selectable',
          'dayPropGetter',
          'renderForMeasure',
          'startAccessor',
          'endAccessor',
          'getNow',
          'renderHeader',
          'minRows',
          'maxRows',
          'dateCellWrapperComponent',
          'eventComponent',
          'eventWrapperComponent',
          'onSelectStart',
          'onSelectEnd',
          'longPressThreshold',
        ])
      if (renderForMeasure) return this.renderDummy()

      var _endOfRange = (0, _eventLevels2.endOfRange)(range),
        first = _endOfRange.first,
        last = _endOfRange.last

      var segments = (this.segments = events.map(function(evt) {
        return (0, _eventLevels2.eventSegments)(
          evt,
          first,
          last,
          {
            startAccessor: startAccessor,
            endAccessor: endAccessor,
          },
          range
        )
      }))

      var _eventLevels = (0, _eventLevels2.eventLevels)(
          segments,
          Math.max(maxRows - 1, 1)
        ),
        levels = _eventLevels.levels,
        extra = _eventLevels.extra

      while (levels.length < minRows) {
        levels.push([])
      }

      return _react.default.createElement(
        'div',
        {
          className: className,
        },
        _react.default.createElement(_BackgroundCells.default, {
          date: date,
          getNow: getNow,
          rtl: rtl,
          range: range,
          selectable: selectable,
          container: this.getContainer,
          dayPropGetter: dayPropGetter,
          onSelectStart: onSelectStart,
          onSelectEnd: onSelectEnd,
          onSelectSlot: this.handleSelectSlot,
          cellWrapperComponent: dateCellWrapperComponent,
          longPressThreshold: longPressThreshold,
        }),
        _react.default.createElement(
          'div',
          {
            className: 'rbc-row-content',
          },
          renderHeader &&
            _react.default.createElement(
              'div',
              {
                className: 'rbc-row',
                ref: this.createHeadingRef,
              },
              range.map(this.renderHeadingCell)
            ),
          levels.map(function(segs, idx) {
            return _react.default.createElement(
              _EventRow.default,
              (0, _extends2.default)({}, props, {
                key: idx,
                start: first,
                end: last,
                segments: segs,
                slots: range.length,
                eventComponent: eventComponent,
                eventWrapperComponent: eventWrapperComponent,
                startAccessor: startAccessor,
                endAccessor: endAccessor,
              })
            )
          }),
          !!extra.length &&
            _react.default.createElement(
              _EventEndingRow.default,
              (0, _extends2.default)({}, props, {
                start: first,
                end: last,
                segments: extra,
                onShowMore: this.handleShowMore,
                eventComponent: eventComponent,
                eventWrapperComponent: eventWrapperComponent,
                startAccessor: startAccessor,
                endAccessor: endAccessor,
              })
            )
        )
      )
    }

    return DateContentRow
  })(_react.default.Component)

DateContentRow.propTypes = propTypes
DateContentRow.defaultProps = defaultProps
var _default = DateContentRow
exports.default = _default
module.exports = exports['default']
