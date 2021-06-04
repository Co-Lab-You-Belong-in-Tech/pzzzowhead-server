const User = require('../models/User');
const sendSms = require('../utils/SendSms');

module.exports = class UserService {

  static async create({userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality}) {
   
    const user = await User
      .insert(userName,
              phoneNumber,
              wakeUpTime,
              weekday,
              sleepLength,
              bedTimeAlarm,
              windDownLength,
              windDownAlarm,
              personality)
      .then((user) => sendSms(user.phoneNumber, 
        `Hello ${user.userName}. Welcome to a more rested life! You will receive a reminder to wind down ${user.windDownLength} before bedtime, sleep for ${user.sleepLength} hours 😴, and wake up at ${user.wakeUpTime}. 🛌🏿 ⏰`));

    return user; 
    }
}