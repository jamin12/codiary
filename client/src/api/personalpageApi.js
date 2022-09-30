import { baseUrl } from ".";

let personalUrl = baseUrl + "/personal";

/**
 * url 만들기
 * @param {string} startUrl
 * @param  {string[]} params
 * @returns
 */
const createUrl = (startUrl, params) => {
	personalUrl += startUrl;
	for (let index = 0; index < params.length; index++) {
		personalUrl = personalUrl + "/" + params[index];
	}
	return personalUrl;
};

const personal = {
	/**********************************************
	 * post
	 ***********************************************/
	/**
	 * 유저 달력 포스트 페이지 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalPostsByDate: (...params) => createUrl("/posts", params),
	/**
	 * 유저 포스트 리스트 페이지 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPsersonalPosts: (...params) => createUrl("/posts", params),
	/**
	 * 유저 포스트 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalPost: (...params) => createUrl("/post", params),
	/**
	 * 유저 포스트 생성 URL [POST]
	 * @returns {String}
	 */
	createPersonalPost: (...params) => createUrl("/post", params),
	/**
	 * 유저 포스트 업데이트 URL [PATCH]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	updatePersonalPost: (...params) => createUrl("/post", params),
	/**
	 * 유저 포스트 삭제 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalPost: (...params) => createUrl("/post", params),
	/**********************************************
	 * category
	 ***********************************************/
	/**
	 * 유저 카테고리 목록 조회(유니크 아이디로) URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalCategory: (...params) => createUrl("/category", params),
	/**
	 * 자신 카테고리 목록 조회 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalMyCategory: (...params) => createUrl("/category", params),
	/**
	 * 카테고리 생성 URL [POST]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	createPersonalCategory: (...params) => createUrl("/category", params),
	/**
	 * 카테고리 수정 URL [PATCH]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	updatePersonalCategory: (...params) => createUrl("/category", params),
	/**
	 * 카테고리 삭제 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalCategory: (...params) => createUrl("/category", params),
	/**********************************************
	 * Tmpposts
	 ***********************************************/
	/**
	 * 임시저장 게시물 목록 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalTmpposts: (...params) => createUrl("/tmpposts", params),
	/**
	 * 임시저장 게시물 저장 URL [POST]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	createPersonalTmpPost: (...params) => createUrl("/tmpposts", params),
	/**
	 * 임시저장 게시물 조회 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalTmppost: (...params) => createUrl("/tmpposts", params),
	/**
	 * 임시저장 게시물 수정 URL [PATCH]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	updatePersonalTmpPost: (...params) => createUrl("/tmpposts", params),
	/**
	 * 임시저장 게시물 삭제 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalTmpPost: (...params) => createUrl("/tmpposts", params),
	/**********************************************
	 * visitrecord
	 ***********************************************/
	/**
	 * 방문 목록 조회 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalVisitRecord: (...params) => createUrl("/visitrecord", params),
	/**
	 * 방문 생성 URL [POST]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	createPersonalVisitRecord: (...params) => createUrl("/visitrecord", params),
	/**
	 * 방문 삭제 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalVisitRecord: (...params) => createUrl("/visitrecord", params),
	/**********************************************
	 * likerecord
	 ***********************************************/
	/**
	 * 좋아요 목록 조회 URL [GET]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	getPersonalLikeRecord: (...params) => createUrl("/likerecord", params),
	/**
	 * 좋아요 생성 URL [POST]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	createPersonalLikeRecord: (...params) => createUrl("/likerecord", params),
	/**
	 * 좋아요 삭제(like 아이디로) URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalLikeRecord: (...params) => createUrl("/likerecord", params),
	/**
	 * 좋아요 삭제(post 아이디로) URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deletePersonalLikeRecordByPostId: (...params) =>
		createUrl("/likerecord/post", params),
	/**********************************************
	 * commnets
	 ***********************************************/
	/**
	 * 댓글 생성 URL [POST]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	createComment: (...params) => createUrl("/comments", params),
	/**
	 * 댓글 업데이트 URL [PATCH]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	updateComment: (...params) => createUrl("/comments", params),
	/**
	 * 댓글 삭제 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	deleteComment: (...params) => createUrl("/comments", params),
	/**********************************************
	 * search
	 ***********************************************/
	/**
	 * 개인 검색 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	searchPersonalposts: (...params) => createUrl("/search/personal", params),
	/**
	 * 공통 검색 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	searchCommonposts: (...params) => createUrl("/search/common", params),
	/**********************************************
	 * associate
	 ***********************************************/
	/**
	 * 관련 게시물 URL [DELETE]
	 * @param  {...String} params Path Variables 값들
	 * @returns {String}
	 */
	associatePersonalposts: (...params) => createUrl("/associate", params),
};

export default personal;
