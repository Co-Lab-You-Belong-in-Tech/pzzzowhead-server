require('dotenv').config();
const User = require('../models/User');
// const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary')

// const theDate = new Date()

User.findUserByWakeUpTime()
  .then(users => {
    return Promise.all(
      users.map(user => {
        smsDictionary.morning.main(user.phoneNumber, user.sleepLength);
        User.increaseAlarmTally(user.phoneNumber)
        ;
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
