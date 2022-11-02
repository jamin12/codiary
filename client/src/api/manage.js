import { baseUrl } from ".";

let manageUrl = baseUrl + "/manage";

/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
	manageUrl += startUrl;
	for (let index = 0; index < params.length; index++) {
		manageUrl = manageUrl + "/" + params[index];
	}
	return manageUrl;
};

const manage = {
	/**
	 * 유저 목록 조회URL  [GET]
	 * @return {string}
	 */
	getUsers: manageUrl,
	/**
	 * 신고 하기 URL [POST]
	 * @return {string}
	 */
	createReport: manageUrl,
	/**
	 * 신고 조회 URL [GET]
	 * @return {string}
	 */
	getReport: (...params) => createUrl("", params),
	/**
	 * 신고 삭제 URL [DELETE]
	 * @return {string}
	 */
	deleteReport: (...params) => createUrl("", params),
	/**
	 * 신고 목록 조회 URL [GET]
	 * @return {string}
	 */
	getReports: (...params) => createUrl("", params),
};

export default manage;
