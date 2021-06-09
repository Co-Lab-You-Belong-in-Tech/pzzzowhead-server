DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT,
  phone_number VARCHAR(20),
  wake_up_time TIME with time zone,
  weekday TEXT ARRAY,
  sleep_length VARCHAR(30),
  bed_Time_alarm TIME with time zone,
  wind_down_length VARCHAR(30),
  wind_down_alarm TIME with time zone,
  personality VARCHAR(30),
  sign_up_date VARCHAR(128),
  alarm_tally INTEGER NOT NULL,
  streak_tally INTEGER NOT NULL,
);