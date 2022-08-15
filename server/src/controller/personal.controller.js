const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { personalService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');

const pService = new personalService()

const output = {
  getPersonalContents: catchAsync(async (req, res) => {
    const result_contents = await pService.getPersonalContents(req.params.uniqueid, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "getContents", result_contents));
  }),
  searchPersonalContents: catchAsync(async (req, res) => {
    const result_contents = await pService.searchPersonalContents(req.params.uniqueid, req.params.searchword, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "searchContents", result_contents));
  }),
};

const input = {

};

module.exports = {
	output,
	input,
};
