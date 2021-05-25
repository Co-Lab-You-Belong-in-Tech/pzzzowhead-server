require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const twilio = process.env.TWILIO_PHONE_NUMBER;

const sendSms = (phoneNumber, message) => {
  console.log(`calling ${phoneNumber} from ${twilio}`);

  return client.messages.create({
    to: phoneNumber,
    from: twilio,
    body: message
  })
    .then(() => {
      console.log(`Message sent to ${phoneNumber}!`, message);
    })
    .catch(err => console.error(err));
};

module.exports = sendSms; 