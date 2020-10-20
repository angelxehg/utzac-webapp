'use strict';

const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const message = require('../models/message');
const jwt = require('../services/jwt');

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

const login = (req, res) => {
  const params = req.body;
  if (params.email == '' || params.email == null) {
    return res.status(400).send(message.missing('email'));
  }
  if (params.password == '' || params.password == null) {
    return res.status(400).send(message.missing('password'));
  }
  const email = params.email;
  const password = params.password;
  User.findOne({ email: email }).then(user => {
    if (!user) {
      return res.status(404).send(message.error('Can\'t get user'));
    }
    bcrypt.compare(password, user.password, (err, login) => {
      if (err || !login) {
        return res.status(403).send(message.error('Wrong password'));
      }

      return res.send({ token: jwt.create(user) });
    })
  }).catch((err) => {
    return res.status(403).send(message.error('Can\'t get user', err));
  })
}

module.exports = {
  register,
  login
};

