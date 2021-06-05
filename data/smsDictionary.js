const sendSms = require('../lib/utils/SendSms')

const smsDictionary = {
  windDownSms: function(phoneNumber, theDate, userName, windDownAlarm, cb) {
    sendSms(phoneNumber, `We sent you a message at this date: ${theDate}! Your name is ${userName}. Your wind down alarm was set for ${cb(windDownAlarm)}`
        )
  },
  bedTimeSms: 'three'
}

module.exports = smsDictionary;