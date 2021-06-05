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
  }

  static async insert(userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength,  windDownAlarm, personality) {
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
        personality)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [userName, phoneNumber, wakeUpTime, weekday, sleepLength, bedTimeAlarm, windDownLength, windDownAlarm, personality]
    );
    console.log("Model:");
    console.log(rows[0]);
    return new User(rows[0])
  }

  static async findUserByWindDownAlarm() {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE wind_down_alarm AT TIME ZONE 'UTC' > CURRENT_TIME -INTERVAL '5 MINUTES'
      AND wind_down_alarm AT TIME ZONE 'UTC' < CURRENT_TIME +INTERVAL '5 MINUTES';`,
    );
    return rows;
    
  }
};
