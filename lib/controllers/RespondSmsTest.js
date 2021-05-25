const { Router } = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;


module.exports = Router()

  .post('/', (req, res, next) => {
    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);
    const twiml = new MessagingResponse();
    twiml.message(`Thanks for contacting the SleepyHead team! Did you just write "${req.body.Body}"?`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
  });
  

