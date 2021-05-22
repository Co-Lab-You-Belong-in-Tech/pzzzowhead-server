const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All of the good stuff goes here

//Single route for all SMS --> Problem, how to add the detailed layers of complexity to a single route
app.use('/sms', require('./controllers/sms'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
