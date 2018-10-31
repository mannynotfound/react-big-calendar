'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.set = set
exports.result = result
exports.default = messages

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _invariant = _interopRequireDefault(require('invariant'))

var defaultMessages = {
  date: 'Date',
  time: 'Time',
  event: 'Event',
  allDay: 'all day',
  week: 'week',
  work_week: 'work week',
  day: 'day',
  month: 'month',
  previous: 'back',
  next: 'next',
  yesterday: 'yesterday',
  tomorrow: 'tomorrow',
  today: 'today',
  agenda: 'agenda',
  showMore: function showMore(total) {
    return '+' + total + ' more'
  },
}

function set(key, msg) {
  !messages.hasOwnProperty(key)
    ? process.env.NODE_ENV !== 'production'
      ? (0, _invariant.default)(
          false,
          'The message key: "' +
            key +
            '" is not a valid message name. ' +
            ('valid keys are: ' + Object.keys(messages).join(', '))
        )
      : invariant(false)
    : void 0
  messages[key] = msg
}

function result(msg) {
  for (
    var _len = arguments.length,
      args = new Array(_len > 1 ? _len - 1 : 0),
      _key = 1;
    _key < _len;
    _key++
  ) {
    args[_key - 1] = arguments[_key]
  }

  return typeof msg === 'function' ? msg(args) : msg
}

function messages(msgs) {
  return (0, _extends2.default)({}, defaultMessages, msgs)
}
