'use strict';

function error(message, data) {
  return {
    error: true,
    message: message,
    content: data
  };
}

function missing(parameter) {
  return {
    error: true,
    message: `Missing '${parameter}' parameter`
  };
}

module.exports = {
  error,
  missing
};
