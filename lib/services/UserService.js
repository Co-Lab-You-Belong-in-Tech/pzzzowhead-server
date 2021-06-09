const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary')

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
    
    return user; 
  }
}