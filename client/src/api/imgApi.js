
/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
	let mainUrl = "https://www.jaminimg.shop/file";
	mainUrl += startUrl;
	for (let index = 0; index < params.length; index++) {
		mainUrl = mainUrl + "/" + params[index];
	}
	return mainUrl;
};

const main = {
	/**
	 * 메인 페이지 URL [GET]
	 * @returns {String}
	 */
	createImg: (...params) => createUrl("", params),
	/**
	 * 메인 페이지 검색 URL 반환 [GET]
	 * @param  {...any} params Path Variables 값들
	 * @returns {String}
	 */
	getImg: (...params) => createUrl("", params),
};
export default main;
