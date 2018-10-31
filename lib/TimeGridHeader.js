'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _classnames = _interopRequireDefault(require('classnames'))

var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/util/scrollbarSize')
)

var _react = _interopRequireDefault(require('react'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var _propTypes2 = require('./utils/propTypes')

var _localizer = _interopRequireDefault(require('./localizer'))

var _DateContentRow = _interopRequireDefault(require('./DateContentRow'))

var _Header = _interopRequireDefault(require('./Header'))

var _helpers = require('./utils/helpers')

var _accessors = require('./utils/accessors')

var TimeGridHeader =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(TimeGridHeader, _React$Component)

    function TimeGridHeader() {
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

      _this.handleHeaderClick = function(date, view, e) {
        e.preventDefault()
        ;(0, _helpers.notify)(_this.props.onDrillDown, [date, view])
      }

      return _this
    }

    var _proto = TimeGridHeader.prototype

    _proto.renderHeaderResources = function renderHeaderResources(
      range,
      resources
    ) {
      var _this$props = this.props,
        resourceTitleAccessor = _this$props.resourceTitleAccessor,
        getNow = _this$props.getNow
      var today = getNow()
      return range.map(function(date, i) {
        return resources.map(function(resource, j) {
          return _react.default.createElement(
            'div',
            {
              key: i + '-' + j,
              className: (0, _classnames.default)(
                'rbc-header',
                _dates.default.eq(date, today, 'day') && 'rbc-today'
              ),
            },
            (0, _accessors.accessor)(resource, resourceTitleAccessor)
          )
        })
      })
    }

    _proto.renderHeaderCells = function renderHeaderCells(range) {
      var _this2 = this

      var _this$props2 = this.props,
        dayFormat = _this$props2.dayFormat,
        culture = _this$props2.culture,
        dayPropGetter = _this$props2.dayPropGetter,
        getDrilldownView = _this$props2.getDrilldownView,
        getNow = _this$props2.getNow,
        Header = _this$props2.headerComponent
      var today = getNow()
      return range.map(function(date, i) {
        var drilldownView = getDrilldownView(date)

        var label = _localizer.default.format(date, dayFormat, culture)

        var _ref = (dayPropGetter && dayPropGetter(date)) || {},
          className = _ref.className,
          style = _ref.style

        var header = _react.default.createElement(Header, {
          date: date,
          label: label,
          localizer: _localizer.default,
          format: dayFormat,
          culture: culture,
        })

        return _react.default.createElement(
          'div',
          {
            key: i,
            style: style,
            className: (0, _classnames.default)(
              'rbc-header',
              className,
              _dates.default.eq(date, today, 'day') && 'rbc-today'
            ),
          },
          drilldownView
            ? _react.default.createElement(
                'a',
                {
                  href: '#',
                  onClick: function onClick(e) {
                    return _this2.handleHeaderClick(date, drilldownView, e)
                  },
                },
                header
              )
            : _react.default.createElement('span', null, header)
        )
      })
    }

    _proto.render = function render() {
      var _this$props3 = this.props,
        width = _this$props3.width,
        events = _this$props3.events,
        rtl = _this$props3.rtl,
        selectable = _this$props3.selectable,
        resources = _this$props3.resources,
        getNow = _this$props3.getNow,
        range = _this$props3.range,
        isOverflowing = _this$props3.isOverflowing,
        eventComponent = _this$props3.eventComponent,
        dateCellWrapperComponent = _this$props3.dateCellWrapperComponent,
        eventWrapperComponent = _this$props3.eventWrapperComponent
      var style = {}

      if (isOverflowing) {
        style[rtl ? 'marginLeft' : 'marginRight'] =
          (0, _scrollbarSize.default)() + 'px'
      }

      return _react.default.createElement(
        'div',
        {
          ref: 'headerCell',
          style: style,
          className: (0, _classnames.default)(
            'rbc-time-header',
            isOverflowing && 'rbc-overflowing'
          ),
        },
        _react.default.createElement('div', {
          className: 'rbc-label rbc-time-header-gutter',
          style: {
            width: width,
          },
        }),
        _react.default.createElement(
          'div',
          {
            className: 'rbc-time-header-content',
          },
          _react.default.createElement(
            'div',
            {
              className: 'rbc-row rbc-time-header-cell',
            },
            this.renderHeaderCells(range)
          ),
          resources &&
            _react.default.createElement(
              'div',
              {
                className: 'rbc-row rbc-row-resource',
              },
              this.renderHeaderResources(range, resources)
            ),
          _react.default.createElement(_DateContentRow.default, {
            isAllDay: true,
            rtl: rtl,
            getNow: getNow,
            minRows: 2,
            range: range,
            events: events,
            className: 'rbc-allday-cell',
            selectable: selectable,
            selected: this.props.selected,
            eventComponent: eventComponent,
            eventWrapperComponent: eventWrapperComponent,
            dateCellWrapperComponent: dateCellWrapperComponent,
            dayPropGetter: this.props.dayPropGetter,
            titleAccessor: this.props.titleAccessor,
            tooltipAccessor: this.props.tooltipAccessor,
            startAccessor: this.props.startAccessor,
            endAccessor: this.props.endAccessor,
            allDayAccessor: this.props.allDayAccessor,
            eventPropGetter: this.props.eventPropGetter,
            onSelect: this.props.onSelectEvent,
            onDoubleClick: this.props.onDoubleClickEvent,
            onSelectSlot: this.props.onSelectSlot,
            longPressThreshold: this.props.longPressThreshold,
          })
        )
      )
    }

    return TimeGridHeader
  })(_react.default.Component)

TimeGridHeader.propTypes = {
  range: _propTypes.default.array.isRequired,
  events: _propTypes.default.array.isRequired,
  resources: _propTypes.default.array,
  getNow: _propTypes.default.func.isRequired,
  isOverflowing: _propTypes.default.bool,
  dayFormat: _propTypes2.dateFormat,
  eventPropGetter: _propTypes.default.func,
  dayPropGetter: _propTypes.default.func,
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
  headerComponent: _propTypes2.elementType,
  eventComponent: _propTypes2.elementType,
  eventWrapperComponent: _propTypes2.elementType.isRequired,
  dateCellWrapperComponent: _propTypes2.elementType,
  onSelectSlot: _propTypes.default.func,
  onSelectEvent: _propTypes.default.func,
  onDoubleClickEvent: _propTypes.default.func,
  onDrillDown: _propTypes.default.func,
  getDrilldownView: _propTypes.default.func.isRequired,
}
TimeGridHeader.defaultProps = {
  headerComponent: _Header.default,
}
var _default = TimeGridHeader
exports.default = _default
module.exports = exports['default']
