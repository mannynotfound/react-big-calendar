'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = _default
exports.formats = void 0

var _dates = _interopRequireDefault(require('../utils/dates'))

var _formats = require('../formats')

var _localizer = require('../localizer')

var dateRangeFormat = function dateRangeFormat(_ref, culture, local) {
  var start = _ref.start,
    end = _ref.end
  return (
    local.format(start, 'L', culture) + ' — ' + local.format(end, 'L', culture)
  )
}

var timeRangeFormat = function timeRangeFormat(_ref2, culture, local) {
  var start = _ref2.start,
    end = _ref2.end
  return (
    local.format(start, 'LT', culture) +
    ' — ' +
    local.format(end, 'LT', culture)
  )
}

var timeRangeStartFormat = function timeRangeStartFormat(
  _ref3,
  culture,
  local
) {
  var start = _ref3.start,
    end = _ref3.end
  return local.format(start, 'h:mma', culture) + ' — '
}

var timeRangeEndFormat = function timeRangeEndFormat(_ref4, culture, local) {
  var start = _ref4.start,
    end = _ref4.end
  return ' — ' + local.format(end, 'h:mma', culture)
}

var weekRangeFormat = function weekRangeFormat(_ref5, culture, local) {
  var start = _ref5.start,
    end = _ref5.end
  return (
    local.format(start, 'MMMM DD', culture) +
    ' - ' +
    local.format(
      end,
      _dates.default.eq(start, end, 'month') ? 'DD' : 'MMMM DD',
      culture
    )
  )
}

var formats = {
  dateFormat: 'DD',
  dayFormat: 'DD ddd',
  weekdayFormat: 'ddd',
  selectRangeFormat: timeRangeFormat,
  eventTimeRangeFormat: timeRangeFormat,
  eventTimeRangeStartFormat: timeRangeStartFormat,
  eventTimeRangeEndFormat: timeRangeEndFormat,
  timeGutterFormat: 'LT',
  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd MMM DD',
  dayRangeHeaderFormat: weekRangeFormat,
  agendaHeaderFormat: dateRangeFormat,
  agendaDateFormat: 'ddd MMM DD',
  agendaTimeFormat: 'LT',
  agendaTimeRangeFormat: timeRangeFormat,
}
exports.formats = formats

function _default(moment) {
  var locale = function locale(m, c) {
    return c ? m.locale(c) : m
  }

  ;(0, _formats.set)(formats)
  return (0, _localizer.set)({
    firstOfWeek: function firstOfWeek(culture) {
      var data = culture ? moment.localeData(culture) : moment.localeData()
      return data ? data.firstDayOfWeek() : 0
    },
    parse: function parse(value, format, culture) {
      return locale(moment(value, format), culture).toDate()
    },
    format: function format(value, _format, culture) {
      return locale(moment(value), culture).format(_format)
    },
  })
}
