const sendSms = require('../lib/utils/SendSms')

const smsDictionary = {
  confirmation: 
    function(phoneNumber, userName, windDownLength, sleepLength, wakeUpTime, cb) {
      sendSms(phoneNumber, `Hello ${userName}. Welcome to a more rested life! You will receive a reminder to wind down ${windDownLength} before bedtime, sleep for ${sleepLength} hours 😴, and wake up at ${cb(wakeUpTime)}. 🛌🏿 ⏰`)
    },
  windDownSms: 
    function(phoneNumber, theDate, userName, windDownAlarm, cb) {
      sendSms(phoneNumber, `We sent you a message at this date: ${theDate}! Your name is ${userName}. Your wind down alarm was set for ${cb(windDownAlarm)}`
        )
  },
  bedTimeSms: 
    function(phoneNumber, theDate, userName, bedTimeAlarm, cb) {
    sendSms(phoneNumber, `We sent you a message at this date: ${theDate}! Your name is ${userName}. Your bed time alarm was set for ${cb(bedTimeAlarm)}`
        )
  }
}

module.exports = smsDictionary;