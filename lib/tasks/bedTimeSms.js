require('dotenv').config();
const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const sendSms = require('../utils/SendSms')

const theDate = new Date()

User.findUserByBedTimeAlarm()
  .then(users => {
    return Promise.all(
      users.map(user => {
        sendSms(user.phoneNumber, `We sent you a message at this date: ${theDate}! Your name is ${user.userName}. Your bed time alarm was set for ${convertToStandardTime(user.windDownAlarm)}`
        );
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
