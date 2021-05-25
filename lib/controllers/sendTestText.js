require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
  to: '+15419489651',
  from: '+16473722335',
  body: 'Parasite. It\'s so metaphorical 💩'
})
.then(message => console.log(message))
.catch(err => console.error(err));