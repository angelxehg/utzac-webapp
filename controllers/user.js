'use strict';

const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const message = require('../models/message');

const register = (req, res) => {
  var user = new User();
  const params = req.body;
  if (params.name == '' || params.name == null) {
    return res.status(400).send(message.missing('name'));
  }
  if (params.email == '' || params.email == null) {
    return res.status(400).send(message.missing('email'));
  }
  if (params.password == '' || params.password == null) {
    return res.status(400).send(message.missing('password'));
  }
  user.name = params.name;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = 'null'
  bcrypt.hash(params.password, null, null, function (err, hash) {
    if (err) {
      return res.status(400).send(message.error(err));
    }
    user.password = hash;
  });
  user.save().then((user) => {
    return res.status(201).send(user);
  }).catch((err) => {
    return res.status(400).send(message.error('Can\'t save user', err));
  })
};

module.exports = {
  register
};

