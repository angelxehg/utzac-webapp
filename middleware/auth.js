'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = process.env.SECRET || 'mi-clave-privada';

const loggedIn = (req, res, next) => {
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
    return res.status(403).send({ message: error.message });
  }
}

module.exports = {
  loggedIn
}
