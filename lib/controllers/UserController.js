const { Router } = require('express');
const UserService = require('../services/UserService');

module.exports = Router()
.post('/newuser', (req, res, next) => {
  UserService.create(req.body)
    .then((user) => res.send(user))
    // .then((user) => console.log(`in the user Controller: ${user}`))
    //send stuff back to the front end
    .catch(next);
});