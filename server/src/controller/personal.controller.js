const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { personalService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');

const pService = new personalService()

const output = {
  getPersonalCategory: catchAsync(async (req, res) => {
    const result_contents = await pService.getPersonalCategory(req.params.uniqueid);
    res.send(resultDto(httpStatus.OK, "getCategory", result_contents));
  }),
  getPsersonalPost: catchAsync(async (req, res) => {
    const result_contents = await pService.getPsersonalPost(req.params.uniqueid, req.params.categoryid, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "getPost", result_contents));
  }),
  getPersonalPostByDate: catchAsync(async (req, res) => {
    const result_contents = await pService.getPersonalPostByDate(req.params.uniqueid, req.query.startdate, req.query.enddate);
    res.send(resultDto(httpStatus.OK, "getPost", result_contents));
  }),
  getPersonalTmppost: catchAsync(async (req, res) => {
    const result_contents = await pService.getPersonalTmppost(req.user.user_id);
    res.send(resultDto(httpStatus.OK, "gettempPost", result_contents));
  }),
  searchPersonalposts: catchAsync(async (req, res) => {
    const result_contents = await pService.searchPersonalposts(req.params.uniqueid, req.params.searchword, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "searchContents", result_contents));
  }),
};

const input = {

};

module.exports = {
	output,
	input,
};
