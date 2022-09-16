const httpStatus = require('http-status')

const errorCode = {
    SERVER_ERROR: { status:httpStatus.SERVER_ERROR, message: 'Server Error' },
    CURPAGE_MUST_BE_NUMBER: { status:httpStatus.PRECONDITION_FAILED, message: 'curpage is must be a number' },
};

module.exports = errorCode;


