const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { measurementService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');


const meaService = new measurementService()

const output = {
  /**
   * 최고의 게시물 목록
   */
  getBestPosts: catchAsync(async (req, res) => {
    const result_contents = await meaService.getBestPosts(req.user.user_id);
    res.send(resultDto(httpStatus.OK, "getBestPosts", result_contents));
  }),

  /**
   * 그래프 조회
   */
  getGraphData: catchAsync(async (req, res) => {
    const result_contents = await meaService.getGraphData(req.params.graphtype, req.params.postid);
    res.send(resultDto(httpStatus.OK, "getGraphData", result_contents));
  }),

  /**
   * 내 게시물 리스트
   */
  getMyPosts: catchAsync(async (req, res) => {
    const result_contents = await meaService.getMyPosts(
      req.user.user_id,
      req.params.posttype,
      req.params.criterion,
      req.query.offset,
      req.query.limit
    );
    res.send(resultDto(httpStatus.OK, "getMyPosts", result_contents));
  }),

  /**
 * 처음 들어 갔을 때 초기 데이터 값
 */
  getMeasurementInit: catchAsync(async (req, res) => {
    const bestPosts = await meaService.getBestPosts(req.user.user_id);
    const myPosts = await meaService.getMyPosts(
      req.user.user_id,
      0,
      0,
      0,
      10
    );
    const graphData = await meaService.getGraphData(0, bestPosts.getBestTotalVisit.post_id);
    const postCount = await meaService.getMyPostsCount(req.user.user_id);
    res.send(resultDto(httpStatus.OK, "getMyPosts", {
      bestPosts,
      myPosts,
      graphData,
      postCount
    }));
  }),
};

const input = {

};

module.exports = {
  output,
  input,
};
