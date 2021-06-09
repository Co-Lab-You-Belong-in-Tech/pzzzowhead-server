const User = require('../models/User');
const convertToStandardTime = require('../utils/convertToStandardTime');
const smsDictionary = require('../../data/smsDictionary');
const pool = require('../utils/pool');

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

  static async increaseAlarmTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET alarm_tally = alarm_tally + 1
      WHERE phoneNumber=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }

  static async increaseStreakTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET streak_tally = streak_tally + 1
      WHERE phoneNumber=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }

  static async resetStreakTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET streak_tally = 0
      WHERE phoneNumber=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }

  static async delete(phoneNumber) {
    const { rows } = await pool.query(
      `DELETE FROM users
      WHERE phone_number=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }
}