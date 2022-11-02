import { baseUrl } from ".";

/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
	let authUrl = baseUrl;
	authUrl += startUrl;
	for (let index = 0; index < params.length; index++) {
		authUrl = authUrl + "/" + params[index];
	}
	return authUrl;
};
const auth = {
	/**
	 * 로그인 URL
	 */
	login: (...params) => createUrl("/login", params),
	/**
	 * 로그아웃 URL
	 */
	logout: (...params) => createUrl("/logout", params),
};

export default auth;
