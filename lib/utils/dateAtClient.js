const moment = require('moment');

const dateAtClient = (clientTimeStamp) => {

  const TZ = clientTimeStamp.split('').slice(-3).join('')

  if (TZ[0] == '-') {
    return moment().subtract(`${TZ.split('').slice(-2).join('')}`, 'hours').format('dddd')
  } else if (TZ[0] == '+') {
    return moment().add(`${TZ.split('').slice(-2).join('')}`, 'hours').format('dddd')
  } else return 'error grabbing the timestamps day of the week'
}

module.exports = dateAtClient;