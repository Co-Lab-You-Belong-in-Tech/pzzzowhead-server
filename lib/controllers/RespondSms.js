const { Router } = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const smsDictionary = require('../../data/smsDictionary')

const UserService = require('../services/UserService');

module.exports = Router()

  .post('/', (req, res, next) => {

    console.log(`Incoming message from ${req.body.From}: ${req.body.Body}`);

//Take input into uppercase
    const smsInput = req.body.Body.toUpperCase()

//Start with an if Statement
    if (smsInput === 'NO THANKS') {
        return smsDictionary
    } 
    if (smsInput === 'YES') {
      return smsDictionary.morning.dayTwo.yesYes(req.body.From)
    }
    if (smsInput === 'EDIT') {
      const twiml = new MessagingResponse();
      twiml.message(`Thanks for contacting the SleepyHead team! go to https://pzzzowhead.netlify.app to adjust your pzzzowhead settings.`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
    return;
    }
    if (smsInput === 'START') {
      const twiml = new MessagingResponse();
    twiml.message(`Thanks for contacting the SleepyHead team! go to https://pzzzowhead.netlify.app to meet Pzzowhead.`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
    return;
    }

  // as a final straw, let's put in this bland response
    const twiml = new MessagingResponse();
    twiml.message(`Thanks for contacting the SleepyHead team! Did you just write "${req.body.Body}"?`);
    res.writeHead(200, {'Content-Type': 'text/xml'})
    res.end(twiml.toString());
  });
  

