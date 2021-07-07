const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary');
const dateAtClient = require('../utils/dateAtClient');
const dayAfterToday = require('../../data/dayAfterToday');

module.exports = class UserService {

  static async create({userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality, signUpDate}) {
  
    const user = await User
      .insert(userName,
              phoneNumber,
              wakeUpTime,
              weekday,
              sleepLength,
              bedTimeAlarm,
              windDownLength,
              windDownAlarm,
              personality,
              signUpDate);

    smsDictionary.confirmation.main(user.phoneNumber, user.windDownAlarm, user.bedTimeAlarm, weekday, convertToStandardTime);
    setTimeout(() => {
      smsDictionary.confirmation.followUp(user.phoneNumber)
    }, 5000);
    
    return user; 
  }

  static async delete(phoneNumber) {
    const user = await User
      .delete(phoneNumber);

    smsDictionary.stop.genericStop(user.phoneNumber, user.userName)
   
    return user
  }

  static async sendWindDownAlarmByWeekDay() {
    //gets all users - remember to set up for multiple rows promise?
    const users = await User 
      .findUserByWindDownAlarm()
      .then(users => {
        return Promise.all(
          users.map(user => {
            // Find out if user is supposed to have an alarm for tomorrow's date
            const clientAlarmDay = dateAtClient(user.windDownAlarm)
            const tomorrow = dayAfterToday[clientAlarmDay];
            if (user.weekday.includes(tomorrow)) {
              return user
            } else return null
          })
        )
      });
    return users;
  } 
  
  static async sendBedTimeAlarmByWeekDay() {
    //gets all users - remember to set up for multiple rows promise?
    const users = await User 
      .findUserByBedTimeAlarm()
      .then(users => {
        return Promise.all(
          users.map(user => {
            // Find out if user is supposed to have an alarm for tomorrow's date
            const clientAlarmDay = dateAtClient(user.bedTimeAlarm)
            const tomorrow = dayAfterToday[clientAlarmDay];
            if (user.weekday.includes(tomorrow)) {
              return user
            } else return null
          })
        )
      });
    return users;
  }
  static async increaseStreakResponse(phoneNumber) {
    const user = await User.findByPhoneNumber(phoneNumber);

    switch (user.streakTally) {
      case 0: smsDictionary.morning.dayOne.yes(user.phoneNumber);
        break;
      case 1: smsDictionary.morning.dayTwo.yesYes(user.phoneNumber);
        break;
      default: smsDictionary.morning.standard.yes(user.phoneNumber, user.streakTally);
    }
    return User.increaseStreakTally(phoneNumber)
  }

  static async resetStreakResponse(phoneNumber) {
    const user = await User.findByPhoneNumber(phoneNumber);

    const mySleepLength = (sleepLength) => {
      const lengthArray = sleepLength.split(' ');
      let newLength = [];
      newLength.push(lengthArray[0])
      newLength.push('hour');
      return newLength.join(' ');

    }
    smsDictionary.morning.dayOne.no(phoneNumber, mySleepLength(user.sleepLength))
    return User.resetStreakTally(phoneNumber)
  }
}
