'use strict';

const bcrypt = require('bcrypt-nodejs');

const User = require('../models/user');
const jwt = require('../services/jwt');
const error = require('../helpers/error-handler');

const register = (req, res, next) => {
  var user = new User();
  const params = req.body;
  if (params.name == '' || params.name == null) {
    throw error.badRequest('Missing parameter name');
  }
  if (params.email == '' || params.email == null) {
    throw error.badRequest('Missing parameter email');
  }
  if (params.password == '' || params.password == null) {
    throw error.badRequest('Missing parameter password');
  }
  if (params.passwordConfirmation == '' || params.passwordConfirmation == null) {
    throw error.badRequest('Missing parameter passwordConfirmation');
  }
  if (params.password !== params.passwordConfirmation) {
    throw error.badRequest('Passwords don\' match');
  }
  if (params.image == '' || params.image == null) {
    throw error.badRequest('Missing parameter image');
  }
  user.name = params.name;
  user.email = params.email;
  user.role = 'ROLE_USER';
  user.image = params.image;
  bcrypt.hash(params.password, null, null, (err, hash) => {
    if (err) {
      throw error.badRequest('Couldn\'t encrypt password');
    }
    user.password = hash;
  });
  return user.save()
    .then(user => res.status(201).send(user))
    .catch(err => next(error.mongodb(err)));
};

const login = (req, res, next) => {
  const params = req.body;
  if (params.email == '' || params.email == null) {
    throw error.badRequest('Missing parameter email');
  }
  if (params.password == '' || params.password == null) {
    throw error.badRequest('Missing parameter password');
  }
  const email = params.email;
  const password = params.password;
  return User.findOne({ email: email }).then(user => {
    if (!user) {
      throw error.notFound('No user found');
    }
    bcrypt.compare(password, user.password, (err, login) => {
      if (err || !login) {
        return next(error.unauthorized('Incorrect password'));
      }
      return res.send({ token: jwt.create(user) });
    })
  }).catch(err => next(error.mongodb(err)));
}

const index = (req, res, next) => {
  return User.find()
    .then(users => res.send(users))
    .catch(err => next(error.mongodb(err)));
}

const show = (req, res, next) => {
  const id = req.params.user;
  return User.findById(id).then(user => {
    if (!user) {
      throw error.notFound('No user found');
    }
    res.send(user);
  }).catch(err => next(error.mongodb(err)));
}

const update = (req, res, next) => {
  const id = req.params.user;
  const params = req.body;
  if (params.name == '' || params.name == null) {
    throw error.badRequest('Missing parameter name');
  }
  if (params.email == '' || params.email == null) {
    throw error.badRequest('Missing parameter email');
  }
  if (params.image == '' || params.image == null) {
    throw error.badRequest('Missing parameter image');
  }
  return User.findById(id).then(user => {
    if (!user) {
      throw error.notFound('No user found');
    }
    user.name = params.name;
    user.email = params.email;
    user.image = params.image;
    if (params.password) {
      bcrypt.hash(params.password, null, null, function (err, hash) {
        if (err) {
          return next(error.badRequest('Couldn\'t encrypt password'));
        }
        user.password = hash;
      });
    }
    user.save()
      .then(user => res.send(user))
      .catch(err => next(error.mongodb(err)));
  }).catch(err => next(error.mongodb(err)));
}

const destroy = (req, res, next) => {
  const id = req.params.user;
  return User.findById(id).then(user => {
    if (!user) {
      throw error.notFound('No user found');
    }
    user.remove()
      .then(() => res.status(204).send())
      .catch(err => next(error.mongodb(err)));
  }).catch(err => next(error.mongodb(err)));
}

module.exports = {
  register,
  login,
  index,
  show,
  update,
  destroy
};

