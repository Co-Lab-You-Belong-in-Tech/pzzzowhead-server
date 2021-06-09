require('dotenv').config();
const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary');
const UserService = require('../services/UserService');

// const theDate = new Date()

UserService.sendBedTimeAlarmByWeekDay()
  .then(users => {
    return Promise.all(
      users.map(user => {
        console.log(user.alarmTally);
        if(user.alarmTally === 1) {
        smsDictionary.bedTime.dayOne(user.phoneNumber, user.sleepLength)
        } else smsDictionary.bedTime.standard(user.phoneNumber, user.sleepLength)
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
