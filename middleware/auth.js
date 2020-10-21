'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = process.env.SECRET || 'mi-clave-privada';

const logged = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No authorization provided' });
  }
  const token = req.headers.authorization.replace(/[""]+/g, '');
  try {
    const payload = jwt.decode(token, secret);
    const current = moment().unix();
    if (payload.exp <= current) {
      throw 'Token expired';
    }
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).send({ message: error });
  }
}

const admin = (req, res, next) => {
  try {
    if (!req.user) {
      throw 'Not logged as admin';
    }
    if (req.user.role !== 'ROLE_ADMIN') {
      throw 'Not logged as admin';
    }
    next();
  } catch (error) {
    return res.status(403).send({ message: error });
  }
}

module.exports = {
  logged,
  admin
}
