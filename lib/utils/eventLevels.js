'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.endOfRange = endOfRange
exports.eventSegments = eventSegments
exports.eventLevels = eventLevels
exports.inRange = inRange
exports.segsOverlap = segsOverlap
exports.sortEvents = sortEvents

var _findIndex = _interopRequireDefault(require('lodash/findIndex'))

var _dates = _interopRequireDefault(require('./dates'))

var _accessors = require('./accessors')

function endOfRange(dateRange, unit) {
  if (unit === void 0) {
    unit = 'day'
  }

  return {
    first: dateRange[0],
    last: _dates.default.add(dateRange[dateRange.length - 1], 1, unit),
  }
}

function eventSegments(event, first, last, _ref, range) {
  var startAccessor = _ref.startAccessor,
    endAccessor = _ref.endAccessor

  var slots = _dates.default.diff(first, last, 'day')

  var start = _dates.default.max(
    _dates.default.startOf(
      (0, _accessors.accessor)(event, startAccessor),
      'day'
    ),
    first
  )

  var end = _dates.default.min(
    _dates.default.ceil((0, _accessors.accessor)(event, endAccessor), 'day'),
    last
  )

  var padding = (0, _findIndex.default)(range, function(x) {
    return _dates.default.eq(x, start, 'day')
  })

  var span = _dates.default.diff(start, end, 'day')

  span = Math.min(span, slots)
  span = Math.max(span, 1)
  return {
    event: event,
    span: span,
    left: padding + 1,
    right: Math.max(padding + span, 1),
  }
}

function eventLevels(rowSegments, limit) {
  if (limit === void 0) {
    limit = Infinity
  }

  var i,
    j,
    seg,
    levels = [],
    extra = []

  for (i = 0; i < rowSegments.length; i++) {
    seg = rowSegments[i]

    for (j = 0; j < levels.length; j++) {
      if (!segsOverlap(seg, levels[j])) break
    }

    if (j >= limit) {
      extra.push(seg)
    } else {
      ;(levels[j] || (levels[j] = [])).push(seg)
    }
  }

  for (i = 0; i < levels.length; i++) {
    levels[i].sort(function(a, b) {
      return a.left - b.left
    }) //eslint-disable-line
  }

  return {
    levels: levels,
    extra: extra,
  }
}

function inRange(e, start, end, _ref2) {
  var startAccessor = _ref2.startAccessor,
    endAccessor = _ref2.endAccessor

  var eStart = _dates.default.startOf(
    (0, _accessors.accessor)(e, startAccessor),
    'day'
  )

  var eEnd = (0, _accessors.accessor)(e, endAccessor)

  var startsBeforeEnd = _dates.default.lte(eStart, end, 'day') // when the event is zero duration we need to handle a bit differently

  var endsAfterStart = !_dates.default.eq(eStart, eEnd, 'minutes')
    ? _dates.default.gt(eEnd, start, 'minutes')
    : _dates.default.gte(eEnd, start, 'minutes')
  return startsBeforeEnd && endsAfterStart
}

function segsOverlap(seg, otherSegs) {
  return otherSegs.some(function(otherSeg) {
    return otherSeg.left <= seg.right && otherSeg.right >= seg.left
  })
}

function sortEvents(evtA, evtB, _ref3) {
  var startAccessor = _ref3.startAccessor,
    endAccessor = _ref3.endAccessor,
    allDayAccessor = _ref3.allDayAccessor
  var startSort =
    +_dates.default.startOf(
      (0, _accessors.accessor)(evtA, startAccessor),
      'day'
    ) -
    +_dates.default.startOf(
      (0, _accessors.accessor)(evtB, startAccessor),
      'day'
    )

  var durA = _dates.default.diff(
    (0, _accessors.accessor)(evtA, startAccessor),
    _dates.default.ceil((0, _accessors.accessor)(evtA, endAccessor), 'day'),
    'day'
  )

  var durB = _dates.default.diff(
    (0, _accessors.accessor)(evtB, startAccessor),
    _dates.default.ceil((0, _accessors.accessor)(evtB, endAccessor), 'day'),
    'day'
  )

  return (
    startSort || // sort by start Day first
    Math.max(durB, 1) - Math.max(durA, 1) || // events spanning multiple days go first
    !!(0, _accessors.accessor)(evtB, allDayAccessor) -
      !!(0, _accessors.accessor)(evtA, allDayAccessor) || // then allDay single day events
    +(0, _accessors.accessor)(evtA, startAccessor) -
      +(0, _accessors.accessor)(evtB, startAccessor)
  ) // then sort by start time
}
