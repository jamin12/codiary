import { baseUrl } from ".";

/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
	var userUrl = baseUrl + "/user";
	userUrl += startUrl;
	for (let index = 0; index < params.length; index++) {
		userUrl = userUrl + "/" + params[index];
	}
	return userUrl;
};

const user = {
	/**
	 * 내 정보 조회 URL [GET]
	 * @return {string}
	 */
	getMyInfo: (...params) => createUrl("", params),
	/**
	 * 내 정보 수정 URL [PATCH]
	 * @return {string}
	 */
	updateUser: (...params) => createUrl("", params),
	/**
	 * 내 정보 삭제 URL [DELETE]
	 * @return {string}
	 */
	deleteUser: (...params) => createUrl("", params),
};

export default user;
