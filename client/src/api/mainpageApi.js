import { baseUrl } from ".";

let mainUrl = baseUrl + "/main";

const main = {
  /**
   * 메인 페이지 URL
   */
	mainPage: mainUrl,
	/**
	 * 메인 페이지 검색 URL 반환
	 * @param  {...any} params Path Variables 값들
	 * @returns {String}
	 */
	searchPostInMain: (...params) => {
		for (let index = 0; index < params.length; index++) {
			mainUrl = mainUrl + "/" + params[index];
		}
		return mainUrl;
	},
};
export default main;
