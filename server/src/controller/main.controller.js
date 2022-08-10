const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { mainService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');


const output = {
  getContents: catchAsync(async (req, res) => {
    const mService = new mainService()
    const result_contents = await mService.getPopularContents(req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "getPopularContents", result_contents));
  }),
};

const input = {

};

module.exports = {
	output,
	input,
};
