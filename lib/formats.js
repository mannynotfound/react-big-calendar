'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.set = set
exports.default = format

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _dates = _interopRequireDefault(require('./utils/dates'))

function inSame12Hr(start, end) {
  var s = 12 - _dates.default.hours(start)

  var e = 12 - _dates.default.hours(end)

  return (s <= 0 && e <= 0) || (s >= 0 && e >= 0)
}

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end
  return (
    local.format(start, 'd', culture) + ' — ' + local.format(end, 'd', culture)
  )
}

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end
  return (
    local.format(start, 'h:mmtt', culture) +
    ' — ' +
    local.format(end, inSame12Hr(start, end) ? 'h:mm' : 'h:mmtt', culture)
  )
}

var timeRangeStartFormat = function timeRangeStartFormat(
  _ref3,
  culture,
  local
) {
  var start = _ref3.start,
    end = _ref3.end
  return local.format(start, 'h:mmtt', culture) + ' — '
}

var timeRangeEndFormat = function timeRangeEndFormat(_ref4, culture, local) {
  var start = _ref4.start,
    end = _ref4.end
  return ' — ' + local.format(end, 'h:mmtt', culture)
}

var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end
  return (
    local.format(start, 'MMM dd', culture) +
    ' - ' +
    local.format(
      end,
      _dates.default.eq(start, end, 'month') ? 'dd' : 'MMM dd',
      culture
    )
  )
}

var formats = {
  dateFormat: 'dd',
  dayFormat: 'ddd dd/MM',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 'h:mm tt',
  monthHeaderFormat: 'MMMM yyyy',
  dayHeaderFormat: 'dddd MMM dd',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM dd',
  agendaTimeFormat: 'hh:mm tt',
  agendaTimeRangeFormat: timeRangeFormat,
}

function set(_formats) {
  var _formats2

  if (arguments.length > 1)
    _formats = ((_formats2 = {}),
    (_formats2[_formats] = arguments[1]),
    _formats2)
  ;(0, _extends2.default)(formats, _formats)
}

function format(fmts) {
  return (0, _extends2.default)({}, formats, fmts)
}
