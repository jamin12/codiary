const httpStatus = require('http-status');
const logger = require('../config/logger');
const customError = require('../utils/Error/customError');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof customError)) {
    const message = error.message || httpStatus[statusCode];
    error = new customError(httpStatus.INTERNAL_SERVER_ERROR, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (process.env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    status: 'fail',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (process.env.NODE_ENV === 'development') {
    logger.error(`${err.message}\n${err.stack}`);
  }
  
  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
