DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT,
  phone_number VARCHAR(20),
  wake_up_time TIME with time zone,
  weekday TEXT ARRAY,
  sleep_length VARCHAR(50),
  bed_Time_alarm TIME with time zone,
  wind_down_time VARCHAR(10),
  wind_down_alarm TIME with time zone,
  personality VARCHAR(50)
);