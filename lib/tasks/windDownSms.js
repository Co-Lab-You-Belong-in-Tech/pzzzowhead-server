require('dotenv').config();
const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary')

const theDate = new Date()

User.findUserByWindDownAlarm()
  .then(users => {
    return Promise.all(
      users.map(user => {
        smsDictionary.windDown.standard(user.phoneNumber, user.windDownLength, user.sleepLength)
        ;
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
