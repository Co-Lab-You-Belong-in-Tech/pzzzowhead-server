const { Router } = require('express');
const UserService = require('../services/UserService');

console.log("hello Contoller!");

module.exports = Router()
.post('/newuser', (req, res, next) => {
  console.log("UserController req");
  UserService.create(req.body)
    .then((user) => res.send(user))
    // .then((user) => console.log(`in the user Controller: ${user}`))
    //send stuff back to the front end
    .catch(next);
});