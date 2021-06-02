require('dotenv').config();
const User = require('../models/User');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const twilio = process.env.TWILIO_PHONE_NUMBER;

const theDate = new Date()

User.findUserByWindDownAlarm()
  .then(users => {
    return Promise.all(
      users.map(user => {
        console.log(user);
        return client.messages.create({
          to: user.phone_number,
          from: twilio,
          body: `We sent you a message at this date: ${theDate}! Your name is ${user.user_name}. Your wind down alarm was set for ${user.wind_down_alarm}`
        });
      })
    );
  })

  .then(() => {
    console.log('Reminder message was sent!');
  })
  .catch(err => console.error(err));
