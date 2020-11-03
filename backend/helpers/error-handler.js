'use strict';

const mongoose = require('mongoose');

const handle = (err, req, res, next) => {
  if (err) {
    console.trace(err);
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

const mongoError = (err) => {
  if (err.code === 11000) {
    return badRequest(err.message);
  }
  return error(500, 'Server error');
}

const mongodb = (err) => {
  if (err instanceof mongoose.Error.CastError) {
    return error(404, 'Couldn\'t find document');
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return error(404, 'Couldn\'t find document');
  }
  if (err.name === 'MongoError') {
    return mongoError(err);
  }
  if (err.code) {
    return err;
  }
  return error(500, 'Server error');
}

module.exports = {
  error,
  handle,
  badRequest,
  unauthorized,
  notFound,
  mongodb
};
