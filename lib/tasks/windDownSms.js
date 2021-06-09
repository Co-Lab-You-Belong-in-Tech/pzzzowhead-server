require('dotenv').config();
const UserService = require('../services/UserService');
const User = require('../models/User')
// const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary')

// const theDate = new Date()

UserService.sendWindDownAlarmByWeekDay()
  .then(users => {
    return Promise.all(
      users.map(user => {
        switch (user.alarmTally) {
          case 1: smsDictionary.windDown.dayOne(user.phoneNumber, user.windDownLength, user.sleepLength);
            break;
          case 2: smsDictionary.windDown.dayTwo(user.phoneNumber, user.windDownLength, user.sleepLength);
            break;
          case 3: smsDictionary.windDown.dayThree(user.phoneNumber, user.windDownLength, user.sleepLength);
            break;
          case 4: smsDictionary.windDown.dayFour(user.phoneNumber, user.windDownLength, user.sleepLength);
            break;
          case 5: smsDictionary.windDown.dayFive(user.phoneNumber, user.windDownLength);
            break;
          default: smsDictionary.windDown.standard(user.phoneNumber, user.windDownLength, user.sleepLength);
        }
        ;
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
