import { baseUrl } from ".";

let userUrl = baseUrl + "/user";

const user = {
	/**
	 * 내 정보 조회 URL [GET]
	 * @return {string}
	 */
	getMyInfo: userUrl,
	/**
	 * 내 정보 수정 URL [PATCH]
	 * @return {string}
	 */
	updateUser: userUrl,
	/**
	 * 내 정보 삭제 URL [DELETE]
	 * @return {string}
	 */
	deleteUser: userUrl,
};


export default user;
