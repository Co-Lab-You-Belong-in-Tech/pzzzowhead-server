const { Router } = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

const UserService = require('../services/UserService');

module.exports = Router()

  .post('/', (req, res, next) => {

    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

//Take input into uppercase
    const smsInput = req.body.Body.toUpperCase()

//Start with an if Statement
    if (smsInput === 'NO THANKS') {
        return UserService.delete(req.body.From)
    } if (smsInput === 'START') {
      const twiml = new MessagingResponse();
    twiml.message(`Thanks for contacting the SleepyHead team! go to https://sleepyhead-dev.netlify.app to meet Pzzowhead.`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
    return;
    }

    const twiml = new MessagingResponse();
    twiml.message(`Thanks for contacting the SleepyHead team! Did you just write "${req.body.Body}"?`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
  });
  

