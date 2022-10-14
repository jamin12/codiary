const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { measurementService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');


const meaService = new measurementService()

const output = {
  getBestPosts: catchAsync(async (req, res) => {
    const result_contents = await meaService.getBestPosts(req.user.user_id);
    res.send(resultDto(httpStatus.OK, "getBestPosts", result_contents));
  }),
  
  getGraphData: catchAsync(async (req, res) => {
    const result_contents = await meaService.getGraphData(req.params.graphtype, req.params.postid);
    res.send(resultDto(httpStatus.OK, "getGraphData", result_contents));
  }),

};

const input = {

};

module.exports = {
  output,
  input,
};
