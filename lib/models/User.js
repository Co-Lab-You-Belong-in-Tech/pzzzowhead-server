const pool = require('../utils/pool');

module.exports = class User {
  id;
  userName;
  phoneNumber;
  wakeUpTime;
  sleepLength;
  windDownTime;
  personality;

  constructor(row) {
    this.id = String(row.id);
    this.userName = row.user_name,
    this.phoneNumber = row.phone_number;
    this.wakeUpTime = row.wake_up_time;
    this.sleepLength = row.sleep_length;
    this.windDownTime = row.wind_down_time;
    this.personality = row.personality;
  }

  static async insert(userName, phoneNumber, wakeUpTime, sleepLength, windDownTime, personality) {
    const {rows} = await pool.query(
      `INSERT INTO users (
        user_name,
        phone_number,
        wake_up_time,
        sleep_length,
        wind_down_time,
        personality)
        VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        [userName, phoneNumber, wakeUpTime, sleepLength, windDownTime, personality]
    );
    return new User(rows[0])
  }
};
