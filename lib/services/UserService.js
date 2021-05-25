const User = require('../models/User');
const sendSms = require('../utils/SendSms');

module.exports = class UserService {

  static async create({
    userName,
    phoneNumber,
    wakeUpTime,
    sleepLength,
    windDownTime,
    personality}) {
   
    const user = await User
      .insert(userName,
        phoneNumber,
        wakeUpTime,
        sleepLength,
        windDownTime,
        personality)
      .then((user) => sendSms(user.phoneNumber, 
        `Hello ${user.userName}. Welcome to a more rested life! You will receive a reminder to wind down ${user.windDownTime} minutes before bedtime, sleep for ${user.sleepLength} hours 😴, and wake up at ${user.wakeUpTime}. 🛌🏿 ⏰`));

    return user; 
    }
}