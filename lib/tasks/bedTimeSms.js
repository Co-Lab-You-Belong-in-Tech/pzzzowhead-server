require('dotenv').config();
const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary')

const theDate = new Date()

User.findUserByBedTimeAlarm()
  .then(users => {
    return Promise.all(
      users.map(user => {
        smsDictionary.bedTimeSms(user.phoneNumber, theDate, user.userName, user.windDownAlarm, convertToStandardTime)
        ;
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
