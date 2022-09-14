const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { manageService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');


const mService = new manageService()

const output = {
  getUsers: catchAsync(async (req, res) => {
    const result_contents = await mService.getUsers(req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "getUsers", result_contents));
  }),
  getReports: catchAsync(async (req, res) => {
    const result_contents = await mService.getReports(req.params.reporttype, req.params.reporttargettype, req.query.startDate, req.query.endDate, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "getReports", result_contents));
  }),
  getReport: catchAsync(async (req, res) => {
    const result_contents = await mService.getReport(req.params.reportid);
    res.send(resultDto(httpStatus.OK, "getReport", result_contents));
  }),
};

const input = {
  deleteReport: catchAsync(async (req, res) => {
    const result_contents = await mService.deleteReport(req.params.reportid);
    res.send(resultDto(httpStatus.OK, "getReport", result_contents));
  }),
  createReport: catchAsync(async (req, res) => {
    const result_contents = await mService.deleteReport(req.body);
    res.send(resultDto(httpStatus.OK, "getReport", result_contents));
  }),
};

module.exports = {
  output,
  input,
};
