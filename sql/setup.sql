DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name TEXT,
  phone_number VARCHAR(20),
  wake_up_time VARCHAR(10),
  sleep_length VARCHAR(10),
  wind_down_time INTEGER,
  personality VARCHAR(50),
  wind_down_alarm TIME with time zone,
  bed_alarm TIME with time zone
);