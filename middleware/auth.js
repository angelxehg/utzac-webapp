'use strict';

const jwt = require('../services/jwt');
const error = require('../helpers/error-handler');

const logged = (req, res, next) => {
  if (!req.headers.authorization) {
    throw error.unauthorized('No authorization provided');
  }
  const token = req.headers.authorization.replace(/[""]+/g, '');
  req.user = jwt.decode(token);
  next();
}

const admin = (req, res, next) => {
  if (!req.headers.authorization) {
    throw error.unauthorized('No authorization provided');
  }
  const token = req.headers.authorization.replace(/[""]+/g, '');
  req.user = jwt.decode(token);
  if (req.user.role !== 'ROLE_ADMIN') {
    throw error.unauthorized('Not logged as admin');
  }
  next();
}

module.exports = {
  logged,
  admin
}
