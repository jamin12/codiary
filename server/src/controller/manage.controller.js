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
  searchUsers: catchAsync(async (req, res) => {
    const result_contents = await mService.searchUsers(req.params.searchword, req.query.offset, req.query.limit);
    res.send(resultDto(httpStatus.OK, "searchUsers", result_contents));
  }),

};

const input = {
  deleteReport: catchAsync(async (req, res) => {
    const result_contents = await mService.deleteReport(req.params.reportid);
    res.send(resultDto(httpStatus.OK, "deleteReport", result_contents));
  }),
  createReport: catchAsync(async (req, res) => {
    const result_contents = await mService.createReport(req.body);
    res.send(resultDto(httpStatus.OK, "createReport", result_contents));
  }),
  deleteUser: catchAsync(async (req, res) => {
    const result_contents = await mService.deletehUser(req.params.uniqueid);
    res.send(resultDto(httpStatus.OK, "deleteUser", result_contents));
  }),
  deleteReportTarget: catchAsync(async (req, res) => {
    const result_contents = await mService.deleteReportTarget(req.params.reporttype,req.params.reporttargetid);
    res.send(resultDto(httpStatus.OK, "deleteReportTarget", result_contents));
  }),
};

module.exports = {
  output,
  input,
};
