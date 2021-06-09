const sendSms = require('../lib/utils/SendSms')

const smsDictionary = {
  confirmation: {
    main:
    function(phoneNumber, windDownAlarm, bedTimeAlarm, days, cb) {
      sendSms(phoneNumber, `Hi! I'm Pzzzow. I'll text you at ${cb(windDownAlarm)} for wind down and ${cb(bedTimeAlarm)} for bedtime on ${days}`)
    },
    followUp:
    function(phoneNumber) {
      sendSms(phoneNumber, `Creating new habits aren't easy- but you CAN do it and I will be here for you! Text 'EDIT' to change your settings or 'STOP' to unsubscribe`)
    }
  },
  windDown: {
    dayOne:
    function(phoneNumber, windDownLength, sleepLength) {
      sendSms(phoneNumber, `It's your wind down time! This is YOUR time to do whatever you need to so you feel relaxed and ready to go to bed.
      
      You've got ${windDownLength} before bedtime to hit your ${sleepLength} hour sleep goal, so get to it!`
        )
    },
    dayTwo:
    function(phoneNumber, windDownLength, sleepLength) {
      sendSms(phoneNumber, `Did you know that ${sleepLength} of sleep will improve your memory retention and focus? It's your wind down time again! You've got ${windDownLength} before bedtime to hit your ${sleepLength} sleep goal.`
        )
    },
    dayThree:
    function(phoneNumber, windDownLength, sleepLength) {
      sendSms(phoneNumber, `Exercising tomorrow? Getting ${sleepLength} of sleep can improve your performance. It's your wind down time. You've got ${windDownLength} before bedtime to hit your ${sleepLength} sleep goal.`
        )
    },
    dayFour:
    function(phoneNumber, windDownLength, sleepLength) {
      sendSms(phoneNumber, `Sleep improves your immune system, helps prevent weight gain, and strengthens your heart. It's wind down time. You've got ${windDownLength} before bedtime to hit your ${sleepLength} sleep goal.`
        )
    },
    dayFive:
    function(phoneNumber, windDownLength) {
      sendSms(phoneNumber, `What do you call a tired woodcutter?

      A SLUMBERJACK. Haha. It's your wind down time! You have ${windDownLength} before bedtime.`
        )
    },
    standard:
    function(phoneNumber, windDownLength, sleepLength) {
      sendSms(phoneNumber, `It's wind down time. You've got ${windDownLength} before bedtime to hit your ${sleepLength} sleep goal.`
        )
    }
  },
  bedTime: {
    dayOne: 
      function(phoneNumber, sleepLength) {
      sendSms(phoneNumber, `It's time for bed! Don't worry- you get to wind down again tomorrow. ${sleepLength} until you wake up!`
        )
      },
    standard:
      function(phoneNumber, sleepLength) {
      sendSms(phoneNumber, `It's bedtime! Head to bed now to meet your ${sleepLength} sleep goal.`
        )
      },
  },
  morning: {
    main: 
      function(phoneNumber, sleepLength) {
      sendSms(phoneNumber, `Good morning! Did you get ${sleepLength} of sleep last night? Text YES or NO to respond so we can count your streak!`
        )
      },
    dayOne: {
      yes: 
        function(phoneNumber) {
        sendSms(phoneNumber, `You're amazing! Day 1 ACCOMPLISHED!`)
        },
      no: 
        function(phoneNumber, sleepLength) {
        sendSms(phoneNumber, `Aww man... you can try again tomorrow. Remember your ${sleepLength} sleep goal. I believe in you.`)
        }
    },
    dayTwo: {
      yesYes: 
        function(phoneNumber) {
        sendSms(phoneNumber, `AW YEAH! That's a 2 day streak! Keep it going!`)
        },
      yesNo: 
        function(phoneNumber) {
        sendSms(phoneNumber, `Oh NO! You broke your streak!!! It's okay. Tomorrow is a brand new day.`)
        },
      noYes: 
        function(phoneNumber) {
        sendSms(phoneNumber, `You DID it you amazing human being! Your body's going to LOVE you!`)
        },
      noNo: 
        function(phoneNumber, sleepLength) {
        sendSms(phoneNumber, `Oh no... this is your second day in a row. You committed to a ${sleepLength} hour sleep goal. ${sleepLength} hours of sleep will improve your mental and physical functions AND reduce your risk of cancer. I know you can do this.`)
        }
    },
    standard: {
      yes: 
        function(phoneNumber, streakAmount) {
        sendSms(phoneNumber,  `You are on a ${streakAmount} day streak! You got this!`)
        },
      No: 
        function(phoneNumber) {
        sendSms(phoneNumber, `Sorry to hear that. Tomorrow is a brand new day!`)
        }
    }
  },
  stop: {
    response: 
    function(phoneNumber) {
      sendSms(phoneNumber, `We're sorry you want to stop receiving texts. Would you like to swap Pzzzow's personality or change your settings?`)
      },
      no: 
      function(phoneNumber, userName) {
        sendSms(phoneNumber, `${userName} is unsubscribed from service. We're sad to see you go. What's not working? 1. 2. 3.`)
        },
      yes: 
      function(phoneNumber) {
        sendSms(phoneNumber, `Here's a link to change your settings. www.pzzzowhead.com`)
      }
  },
  genericResponse:
  function(phoneNumber) {
    sendSms(phoneNumber, `Hello there! Please text EDIT to change your settings, FEEDBACK to leave us a comment, or STOP to unsubscribe.`)
  }
}

module.exports = smsDictionary;