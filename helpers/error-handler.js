'use strict';

const mongoose = require('mongoose');

const handle = (err, req, res, next) => {
  if (err) {
    const code = err.code || 503;
    const message = err.message || 'Service unavailable';
    return res.status(code).send({ message: message });
  }
}

const error = (code, message) => {
  return { code, message };
}

const badRequest = (message) => error(400, message);

const unauthorized = (message) => error(401, message);

const notFound = (message) => error(404, message);

const mongodb = (err) => {
  console.error(err);
  if (err.code) {
    return err;
  }
  if (err instanceof mongoose.Error.CastError) {
    return error(404, 'Couldn\'t find document');
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return error(404, 'Couldn\'t find document');
  }
  return error(503, 'Service unavailable');
}

module.exports = {
  error,
  handle,
  badRequest,
  unauthorized,
  notFound,
  mongodb
};
