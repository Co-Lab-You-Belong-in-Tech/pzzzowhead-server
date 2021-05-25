const express = require('express');
const app = express();
app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// All of the good stuff goes here
app.use('/api/v1/user', require('./controllers/UserController'));
app.use('/sms', require('./controllers/RespondSmsTest'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

