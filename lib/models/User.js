const pool = require('../utils/pool');

module.exports = class User {
  id;
  userName;
  phoneNumber;
  wakeUpTime;
  weekday;
  sleepLength;
  bedTimeAlarm;
  windDownLength;
  windDownAlarm;
  personality;
  signUpDate;
  alarmTally;
  streakTally;
  

  constructor(row) {
    this.id = String(row.id);
    this.userName = row.user_name,
    this.phoneNumber = row.phone_number;
    this.wakeUpTime = row.wake_up_time;
    this.weekday = row.weekday;
    this.sleepLength = row.sleep_length;
    this.bedTimeAlarm = row.bed_time_alarm;
    this.windDownLength = row.wind_down_length;
    this.windDownAlarm = row.wind_down_alarm;
    this.personality = row.personality;
    this.signUpDate = row.sign_up_date;
    this.alarmTally = row.alarm_tally;
    this.streakTally = row.streak_tally;
  }

  static async insert(userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality, signUpDate) {

    const {rows} = await pool.query(
      `INSERT INTO users (
        user_name,
        phone_number,
        wake_up_time,
        weekday,
        sleep_length,
        bed_time_alarm,
        wind_down_length,
        wind_down_alarm,
        personality,
        sign_up_date,
        alarm_tally,
        streak_tally)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, '1', '0') RETURNING *`,
        [userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality, signUpDate]
    );
    console.log("Model:");
    console.log(rows[0]);
    return new User(rows[0])
  }

  static async findByPhoneNumber(phoneNumber) {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE phone_number = $1`,
      [phoneNumber]
    )
    if(!rows[0]) throw new Error('No users exist with this Phone Number');
    return rows.map(row => new User(row))
  }

  static async findUserByWindDownAlarm() {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE wind_down_alarm AT TIME ZONE 'UTC' > CURRENT_TIME -INTERVAL '5 MINUTES'
      AND wind_down_alarm AT TIME ZONE 'UTC' < CURRENT_TIME +INTERVAL '5 MINUTES';`,
    );

    if(!rows[0]) throw new Error('No users need wind down alarms at this time');
    return rows.map(row => new User(row));
  }

  static async findUserByBedTimeAlarm() {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE bed_time_alarm AT TIME ZONE 'UTC' > CURRENT_TIME -INTERVAL '5 MINUTES'
      AND bed_time_alarm AT TIME ZONE 'UTC' < CURRENT_TIME +INTERVAL '5 MINUTES';`,
    );

    if(!rows[0]) throw new Error('No users need bed time alarms at this time');
    return rows.map(row => new User(row));
  }

  static async findUserByWakeUpTime() {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE wake_up_time AT TIME ZONE 'UTC' > CURRENT_TIME -INTERVAL '5 MINUTES'
      AND wake_up_time AT TIME ZONE 'UTC' < CURRENT_TIME +INTERVAL '5 MINUTES';`,
    );

    if(!rows[0]) throw new Error('No users need wake up alarms at this time');
    return rows.map(row => new User(row));
  }

  static async updateUser({phoneNumber, userName, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality}) {
    const { rows }  = await pool.query(
      `UPDATE users
        SET user_name = $2,
          wake_up_time = $3, 
          weekday = $4, 
          sleep_length = $5, 
          bed_time_alarm = $6, 
          wind_down_length = $7, 
          wind_down_alarm = $8, 
          personality = $9
        WHERE phone_number = $1
        RETURNING *`,
        [phoneNumber, userName, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality]
    );
    if(!rows[0]) throw new Error('No user exists with this phone number');
    return rows.map(row => new User(row));
  }

  static async increaseAlarmTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET alarm_tally = alarm_tally + 1
      WHERE phone_number=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }

  static async increaseStreakTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET streak_tally = streak_tally + 1
      WHERE phone_number=$1
      RETURNING *`,
      [phoneNumber]
    );

    return new User(rows[0]);
  }

  static async resetStreakTally(phoneNumber) {
    const { rows } = await pool.query(
      `UPDATE users
        SET streak_tally = 0
      WHERE phone_number=$1
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

    if(!rows[0]) throw new Error('No user exists with this phone number');
    return new User(rows[0]);
  }
  //
};
