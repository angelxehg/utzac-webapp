'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = process.env.SECRET || 'mi-clave-privada';
const error = require('../helpers/error-handler');

const logged = (req, res, next) => {
  if (!req.headers.authorization) {
    throw error.unauthorized('No authorization provided');
  }
  const token = req.headers.authorization.replace(/[""]+/g, '');
  const payload = jwt.decode(token, secret);
  const current = moment().unix();
  if (payload.exp <= current) {
    throw error.unauthorized('Token expired');
  }
  req.user = payload;
  next();
}

const admin = (req, res, next) => {
  if (!req.user) {
    throw error.unauthorized('Not logged as admin');
  }
  if (req.user.role !== 'ROLE_ADMIN') {
    throw error.unauthorized('Not logged as admin');
  }
  next();
}

module.exports = {
  logged,
  admin
}
