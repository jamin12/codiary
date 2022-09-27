import { baseUrl } from ".";

let personalUrl = baseUrl + "/personal";

const personal = {
  /**********************************************
   * post
   ***********************************************/
  /**
   * 유저 달력 포스트 페이지 URL 반환 [GET]
   * @param  {...String} params Path Variables 값들
   * @returns {String}
   */
  getPersonalPostsByDate: (...params) => {
    personalUrl += "/posts";
    for (let index = 0; index < params.length; index++) {
      personalUrl = personalUrl + "/" + params[index];
    }
    return personalUrl;
  },
  /**
 * 유저 포스트 리스트 페이지 URL 반환 [GET]
 * @param  {...String} params Path Variables 값들
 * @returns {String}
 */
  getPsersonalPosts: (...params) => {
    personalUrl += "/posts";
    for (let index = 0; index < params.length; index++) {
      personalUrl = personalUrl + "/" + params[index];
    }
    return personalUrl;
  },
  /**
  * 유저 포스트 URL 반환 [GET]
  * @param  {...String} params Path Variables 값들
  * @returns {String}
  */
  getPersonalPost: (...params) => {
    personalUrl += "/post";
    for (let index = 0; index < params.length; index++) {
      personalUrl = personalUrl + "/" + params[index];
    }
    return personalUrl;
  },
  /**
  * 유저 포스트 URL 반환 [GET]
  * @param  {...String} params Path Variables 값들
  * @returns {String}
  */
  getPersonalPost: (...params) => {
    for (let index = 0; index < params.length; index++) {
      personalUrl = personalUrl + "/" + params[index];
    }
    return personalUrl;
  },
}

export default personal;