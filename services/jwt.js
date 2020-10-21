'use strict';

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = process.env.SECRET || 'mi-clave-privada';

const create = (user) => {
  const payload = {
    user: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    image: user.image,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix(),
  };
  return jwt.encode(payload, secret);
}

const decode = (token) => {
  const payload = jwt.decode(token, secret);
  const current = moment().unix();
  if (payload.exp <= current) {
    throw error.unauthorized('Token expired');
  }
  return payload;
}

module.exports = {
  create,
  decode
}
