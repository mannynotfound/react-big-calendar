'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _propTypes = _interopRequireDefault(require('prop-types'))

var _react = _interopRequireDefault(require('react'))

var _class = _interopRequireDefault(require('dom-helpers/class'))

var _width = _interopRequireDefault(require('dom-helpers/query/width'))

var _scrollbarSize = _interopRequireDefault(
  require('dom-helpers/util/scrollbarSize')
)

var _localizer = _interopRequireDefault(require('./localizer'))

var _messages = _interopRequireDefault(require('./utils/messages'))

var _dates = _interopRequireDefault(require('./utils/dates'))

var _constants = require('./utils/constants')

var _accessors = require('./utils/accessors')

var _propTypes2 = require('./utils/propTypes')

var _eventLevels = require('./utils/eventLevels')

var _selection = require('./utils/selection')

var Agenda =
  /*#__PURE__*/
  (function(_React$Component) {
    ;(0, _inheritsLoose2.default)(Agenda, _React$Component)

    function Agenda() {
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

      _this.renderDay = function(day, events, dayKey) {
        var _this$props = _this.props,
          culture = _this$props.culture,
          components = _this$props.components,
          titleAccessor = _this$props.titleAccessor,
          agendaDateFormat = _this$props.agendaDateFormat,
          eventPropGetter = _this$props.eventPropGetter,
          startAccessor = _this$props.startAccessor,
          endAccessor = _this$props.endAccessor,
          selected = _this$props.selected
        var EventComponent = components.event
        var DateComponent = components.date
        events = events.filter(function(e) {
          return (0,
          _eventLevels.inRange)(e, _dates.default.startOf(day, 'day'), _dates.default.endOf(day, 'day'), _this.props)
        })
        return events.map(function(event, idx) {
          var _ref = eventPropGetter
              ? eventPropGetter(
                  event,
                  (0, _accessors.accessor)(event, startAccessor),
                  (0, _accessors.accessor)(event, endAccessor),
                  (0, _selection.isSelected)(event, selected)
                )
              : {},
            className = _ref.className,
            style = _ref.style

          var dateLabel =
            idx === 0 &&
            _localizer.default.format(day, agendaDateFormat, culture)

          var first =
            idx === 0
              ? _react.default.createElement(
                  'td',
                  {
                    rowSpan: events.length,
                    className: 'rbc-agenda-date-cell',
                  },
                  DateComponent
                    ? _react.default.createElement(DateComponent, {
                        day: day,
                        label: dateLabel,
                      })
                    : dateLabel
                )
              : false
          var title = (0, _accessors.accessor)(event, titleAccessor)
          return _react.default.createElement(
            'tr',
            {
              key: dayKey + '_' + idx,
              className: className,
              style: style,
            },
            first,
            _react.default.createElement(
              'td',
              {
                className: 'rbc-agenda-time-cell',
              },
              _this.timeRangeLabel(day, event)
            ),
            _react.default.createElement(
              'td',
              {
                className: 'rbc-agenda-event-cell',
              },
              EventComponent
                ? _react.default.createElement(EventComponent, {
                    event: event,
                    title: title,
                  })
                : title
            )
          )
        }, [])
      }

      _this.timeRangeLabel = function(day, event) {
        var _this$props2 = _this.props,
          endAccessor = _this$props2.endAccessor,
          startAccessor = _this$props2.startAccessor,
          allDayAccessor = _this$props2.allDayAccessor,
          culture = _this$props2.culture,
          messages = _this$props2.messages,
          components = _this$props2.components
        var labelClass = '',
          TimeComponent = components.time,
          label = (0, _messages.default)(messages).allDay
        var start = (0, _accessors.accessor)(event, startAccessor)
        var end = (0, _accessors.accessor)(event, endAccessor)

        if (!(0, _accessors.accessor)(event, allDayAccessor)) {
          if (_dates.default.eq(start, end, 'day')) {
            label = _localizer.default.format(
              {
                start: start,
                end: end,
              },
              _this.props.agendaTimeRangeFormat,
              culture
            )
          } else if (_dates.default.eq(day, start, 'day')) {
            label = _localizer.default.format(
              start,
              _this.props.agendaTimeFormat,
              culture
            )
          } else if (_dates.default.eq(day, end, 'day')) {
            label = _localizer.default.format(
              end,
              _this.props.agendaTimeFormat,
              culture
            )
          }
        }

        if (_dates.default.gt(day, start, 'day'))
          labelClass = 'rbc-continues-prior'
        if (_dates.default.lt(day, end, 'day'))
          labelClass += ' rbc-continues-after'
        return _react.default.createElement(
          'span',
          {
            className: labelClass.trim(),
          },
          TimeComponent
            ? _react.default.createElement(TimeComponent, {
                event: event,
                day: day,
                label: label,
              })
            : label
        )
      }

      _this._adjustHeader = function() {
        var header = _this.refs.header
        var firstRow = _this.refs.tbody.firstChild
        if (!firstRow) return
        var isOverflowing =
          _this.refs.content.scrollHeight > _this.refs.content.clientHeight
        var widths = _this._widths || []
        _this._widths = [
          (0, _width.default)(firstRow.children[0]),
          (0, _width.default)(firstRow.children[1]),
        ]

        if (widths[0] !== _this._widths[0] || widths[1] !== _this._widths[1]) {
          _this.refs.dateCol.style.width = _this._widths[0] + 'px'
          _this.refs.timeCol.style.width = _this._widths[1] + 'px'
        }

        if (isOverflowing) {
          _class.default.addClass(header, 'rbc-header-overflowing')

          header.style.marginRight = (0, _scrollbarSize.default)() + 'px'
        } else {
          _class.default.removeClass(header, 'rbc-header-overflowing')
        }
      }

      return _this
    }

    var _proto = Agenda.prototype

    _proto.componentDidMount = function componentDidMount() {
      this._adjustHeader()
    }

    _proto.componentDidUpdate = function componentDidUpdate() {
      this._adjustHeader()
    }

    _proto.render = function render() {
      var _this2 = this

      var _this$props3 = this.props,
        length = _this$props3.length,
        date = _this$props3.date,
        events = _this$props3.events,
        startAccessor = _this$props3.startAccessor
      var messages = (0, _messages.default)(this.props.messages)

      var end = _dates.default.add(date, length, 'day')

      var range = _dates.default.range(date, end, 'day')

      events = events.filter(function(event) {
        return (0, _eventLevels.inRange)(event, date, end, _this2.props)
      })
      events.sort(function(a, b) {
        return (
          +(0, _accessors.accessor)(a, startAccessor) -
          +(0, _accessors.accessor)(b, startAccessor)
        )
      })
      return _react.default.createElement(
        'div',
        {
          className: 'rbc-agenda-view',
        },
        _react.default.createElement(
          'table',
          {
            ref: 'header',
            className: 'rbc-agenda-table',
          },
          _react.default.createElement(
            'thead',
            null,
            _react.default.createElement(
              'tr',
              null,
              _react.default.createElement(
                'th',
                {
                  className: 'rbc-header',
                  ref: 'dateCol',
                },
                messages.date
              ),
              _react.default.createElement(
                'th',
                {
                  className: 'rbc-header',
                  ref: 'timeCol',
                },
                messages.time
              ),
              _react.default.createElement(
                'th',
                {
                  className: 'rbc-header',
                },
                messages.event
              )
            )
          )
        ),
        _react.default.createElement(
          'div',
          {
            className: 'rbc-agenda-content',
            ref: 'content',
          },
          _react.default.createElement(
            'table',
            {
              className: 'rbc-agenda-table',
            },
            _react.default.createElement(
              'tbody',
              {
                ref: 'tbody',
              },
              range.map(function(day, idx) {
                return _this2.renderDay(day, events, idx)
              })
            )
          )
        )
      )
    }

    return Agenda
  })(_react.default.Component)

Agenda.propTypes = {
  events: _propTypes.default.array,
  date: _propTypes.default.instanceOf(Date),
  length: _propTypes.default.number.isRequired,
  titleAccessor: _propTypes2.accessor.isRequired,
  tooltipAccessor: _propTypes2.accessor.isRequired,
  allDayAccessor: _propTypes2.accessor.isRequired,
  startAccessor: _propTypes2.accessor.isRequired,
  endAccessor: _propTypes2.accessor.isRequired,
  eventPropGetter: _propTypes.default.func,
  selected: _propTypes.default.object,
  agendaDateFormat: _propTypes2.dateFormat,
  agendaTimeFormat: _propTypes2.dateFormat,
  agendaTimeRangeFormat: _propTypes2.dateRangeFormat,
  culture: _propTypes.default.string,
  components: _propTypes.default.object.isRequired,
  messages: _propTypes.default.shape({
    date: _propTypes.default.string,
    time: _propTypes.default.string,
  }),
}
Agenda.defaultProps = {
  length: 30,
}

Agenda.range = function(start, _ref2) {
  var _ref2$length = _ref2.length,
    length = _ref2$length === void 0 ? Agenda.defaultProps.length : _ref2$length

  var end = _dates.default.add(start, length, 'day')

  return {
    start: start,
    end: end,
  }
}

Agenda.navigate = function(date, action, _ref3) {
  var _ref3$length = _ref3.length,
    length = _ref3$length === void 0 ? Agenda.defaultProps.length : _ref3$length

  switch (action) {
    case _constants.navigate.PREVIOUS:
      return _dates.default.add(date, -length, 'day')

    case _constants.navigate.NEXT:
      return _dates.default.add(date, length, 'day')

    default:
      return date
  }
}

Agenda.title = function(start, _ref4) {
  var _ref4$length = _ref4.length,
    length =
      _ref4$length === void 0 ? Agenda.defaultProps.length : _ref4$length,
    formats = _ref4.formats,
    culture = _ref4.culture

  var end = _dates.default.add(start, length, 'day')

  return _localizer.default.format(
    {
      start: start,
      end: end,
    },
    formats.agendaHeaderFormat,
    culture
  )
}

var _default = Agenda
exports.default = _default
module.exports = exports['default']
