import { baseUrl } from ".";

/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
  var personalUrl = baseUrl + "/measurement";
  personalUrl += startUrl;
  for (let index = 0; index < params.length; index++) {
    personalUrl = personalUrl + "/" + params[index];
  }
  return personalUrl;
};

const measurement = {
  /**
 *  통계 페이지 첫 데이터 URL [GET]
 * @return {string}
 */
  getMeasurementInit: (...params) => createUrl("", params),
  /**
  * 베스트 게시물 조회 URL [GET]
  * @return {string}
  */
  getBestPosts: (...params) => createUrl("/best", params),
  /**
 * 그래프 데이터 조회 URL [GET]
 * @return {string}
 */
  getGraphData: (...params) => createUrl("/graph", params),
  /**
  * 내 포스트 목록 조회 URL [GET]
  * @return {string}
  */
  getMyPosts: (...params) => createUrl("/myposts", params),
}

export default measurement;