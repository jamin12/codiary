const { personalService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");
const CustomError = require("../../../src/utils/Error/customError");
const httpStatus = require("http-status");

const pService = new personalService();

describe("PersonalService", () => {
	const categoryBody = {
		category_id: 50,
		category_name: "create test",
	};
	const postBody = {
		post: {
			post_id: 150,
			post_title: "test title",
			post_body_md: "test md",
			post_body_html: "test html",
			post_txt: "test txt",
			category_id: 1,
		},
		tag: {
			tag_name: ["tag1", "tag2"],
		},
	};
	const tempPostBody = {
		tmppost_id: 100,
		tmppost_title: "test tmpPost title",
		tmppost_body_md: "test tmpPost md",
		tmppost_body_html: "test tmpPost html",
		tmppost_txt: "test tmpPost txt",
	};
	const visitRecordBody = {
		visit_record_id: 150,
		post_id: 155,
	};
	const likeRecordBody = {
		like_record_id: 150,
		post_id: 155,
	};
	const commentBody = {
		comments_id: 150,
		post_id: 111,
		comments_body: "안녕안녕 나는 테스트야",
	};
	// 카테고리 테스트
	describe("Catogory", () => {
		// 사용자 카테고리 목록 조회
		it("getPersonalCategory", async () => {
			const getCategory = await pService.getPersonalCategory("test");
			expect(getCategory.length).toEqual(7);
		});

		// 내 카테고리 목록 조회
		it("getPersonalMyCategory", async () => {
			const getCategory = await pService.getPersonalMyCategory(
				"100625979022689944834"
			);
			expect(getCategory.length).toEqual(7);
		});

		// 사용자 카테고리 생성
		it("createPersonalCategory", async () => {
			const createdCategory = await pService.createPersonalCategory(
				"100625979022689944834",
				categoryBody
			);
			expect(createdCategory.category_id).toEqual(50);
		});

		// 사용자 카테고리 생성 에러: 서브 카테고리
		it("createCategory Error : sub category already exists", async () => {
			categoryBody.sub_category_id = 5;
			await pService
				.createPersonalCategory("100625979022689944834", categoryBody)
				.catch((err) => {
					expect(err.message).toEqual("sub category already exists");
				});
		});

		// 사용자 카테고리 수정 에러 : 서브 카테고리
		it("updateCategory Error : sub category already exists", async () => {
			categoryBody.sub_category_id = 5;
			await pService
				.updatePersonalCategory(
					"100625979022689944834",
					50,
					categoryBody
				)
				.catch((err) => {
					expect(err.message).toEqual("sub category already exists");
				});
		});

		// 사용자 카테고리 수정 에러: 없는 카테고리
		it("updateCategory Error : category not found", async () => {
			await pService
				.updatePersonalCategory(
					"100625979022689944834",
					51,
					categoryBody
				)
				.catch((err) => {
					expect(err.message).toEqual("category not found");
				});
		});

		// 사용자 카테고리 수정
		it("updatePersonalCategory", async () => {
			categoryBody.category_name = "update category";
			delete categoryBody.sub_category_id;
			await pService.updatePersonalCategory(
				"100625979022689944834",
				50,
				categoryBody
			);
		});

		// 사용자 카테고리 삭제 에러: 없는 카테고리
		it("deleteCategory Error : category not found", async () => {
			await pService
				.deletePersonalCategory("100625979022689944834", 51)
				.catch((err) => {
					expect(err.message).toEqual("category not found");
				});
		});

		// 사용자 카테고리 삭제
		it("deletePersonalCategory", async () => {
			await pService.deletePersonalCategory("100625979022689944834", 50);
		});
	});

	// 포스트 테스트
	describe("post", () => {
		// 사용자 포스트 목록 조회
		it("getPersonalPosts", async () => {
			const postList = await pService.getPersonalPosts("test", 1, 1, 10);
			expect(postList.length).toEqual(4);
		});

		// 사용자 포스트 목록 조회 에러 : 유저 없음
		it("getPersonalPosts error : user not found ", async () => {
			await pService.getPersonalPosts("test1", 1, 1, 10).catch((err) => {
				expect(err.message).toEqual("User not found");
			});
		});

		// 사용자 날짜 별 포스트 목록 조회 에러 : 유저 없음
		it("getPersonalPostsByDate error : user not found ", async () => {
			await pService
				.getPersonalPostsByDate(
					"test1",
					"2022-08-15 00:00:00",
					"2022-09-23 00:00:00"
				)
				.catch((err) => {
					expect(err.message).toEqual("User not found");
				});
		});

		// 사용자 날짜 별 포스트 목록 조회
		it("getPersonalPostsByDate", async () => {
			const getPostListByDate = await pService.getPersonalPostsByDate(
				"test",
				"2022-08-15 00:00:00",
				"2022-09-23 00:00:00"
			);
			expect(getPostListByDate.length).toEqual(7);
		});

		// 사용자 포스트 조회 에러 : 유저 없음
		it("getPersonalPost error : user not found ", async () => {
			await pService.getPersonalPost("test1", 1).catch((err) => {
				expect(err.message).toEqual("User not found");
			});
		});

		// 사용자 포스트 조회 에러 : 포스트 없음
		it("getPersonalPost error : post not found ", async () => {
			await pService.getPersonalPost("test", 10).catch((err) => {
				expect(err.message).toEqual("post not found");
			});
		});

		// 사용자 포스트 조회
		it("getPersonalPost", async () => {
			const getPost = await pService.getPersonalPost("test", 4);
			expect(getPost.getPost?.post_id).toEqual(4);
		});

		// 사용자 포스트 생성
		it("createPersonalPost", async () => {
			const getPost = await pService.createPersonalPost(
				"100625979022689944834",
				postBody
			);
			expect(getPost.post_id).toEqual(150);
		});

		// 사용자 포스트 생성 에러 : 카테고리 없음
		it("createPersonalPost error : category not found", async () => {
			postBody.post.category_id = 100;
			await pService
				.createPersonalPost("100625979022689944834", postBody)
				.catch((err) => {
					expect(err.message).toEqual("category not found");
				});
		});

		// 사용자 포스트 수정 에러 : 카테고리 없음
		it("updatePersonalPost error : category not found", async () => {
			postBody.post.category_id = 100;
			await pService
				.updatePersonalPost("100625979022689944834", 4, postBody)
				.catch((err) => {
					expect(err.message).toEqual("category not found");
				});
		});

		// 사용자 포스트 수정 에러: 게시글 없음
		it("updatePersonalPost error : post not found", async () => {
			postBody.post.category_id = 1;
			await pService
				.updatePersonalPost("100625979022689944834", 151, postBody)
				.catch((err) => {
					expect(err.message).toEqual("Post not found");
				});
		});

		// 사용자 포스트 수정
		it("updatePersonalPost", async () => {
			delete postBody.post.post_id;
			await pService
				.updatePersonalPost("100625979022689944834", 4, postBody)
				.catch((err) => {
					logger.error(err.message);
				});
		});

		// 사용자 포스트 삭제 에러 : 게시글 없음
		it("deletePersonalPost error : post not found", async () => {
			await pService
				.deletePersonalPost("100625979022689944834", 100)
				.catch((err) => {
					expect(err.message).toEqual("Post not found");
				});
		});

		// 사용자 포스트 삭제
		it("deletePersonalPost", async () => {
			await pService.deletePersonalPost("100625979022689944834", 150);
		});
	});

	// 임시 포스트 테스트
	describe("tempPost", () => {
		// 임시 포스트 조회
		it("getPersonalTmppost", async () => {
			const getTempPost = await pService.getPersonalTmppost(
				"100625979022689944834",
				1
			);
			expect(getTempPost.tmppost_id).toEqual(1);
		});

		// 임시 포스트 조회 에러 : 포스트 없음
		it("getPersonalTmppost", async () => {
			await pService
				.getPersonalTmppost("100625979022689944834", 100)
				.catch((err) => {
					expect(err.message).toEqual("tmppost not found");
				});
		});

		// 임시 포스트 목록 조회
		it("getPersonalTmpposts", async () => {
			const getTempPosts = await pService.getPersonalTmpposts(
				"100625979022689944834"
			);
			expect(getTempPosts.length).toEqual(3);
		});

		// 임시 포스트 저장
		it("createPersonalTmpPost", async () => {
			const createdTempPost = await pService.createPersonalTmpPost(
				"100625979022689944834",
				tempPostBody
			);
			expect(createdTempPost.tmppost_id).toEqual(100);
		});

		// 임시 포스트 수정
		it("updatePersonalTmpPost", async () => {
			tempPostBody.tmppost_title = "Updated title";
			await pService.updatePersonalTmpPost(
				"100625979022689944834",
				100,
				tempPostBody
			);
		});

		// 임시 포스트 수정 에러 : 포스트 없음
		it("updatePersonalTmpPost", async () => {
			tempPostBody.tmppost_title = "Updated title";
			await pService
				.updatePersonalTmpPost(
					"100625979022689944834",
					1001,
					tempPostBody
				)
				.catch((err) => {
					expect(err.message).toEqual("post not found");
				});
		});

		// 임시 포스트 삭제 에러 : 포스트 없음
		it("deletePersonalTmpPost", async () => {
			await pService
				.deletePersonalTmpPost("100625979022689944834", 1001)
				.catch((err) => {
					expect(err.message).toEqual("post not found");
				});
		});

		// 임시 포스트 삭제
		it("deletePersonalTmpPost", async () => {
			await pService.deletePersonalTmpPost("100625979022689944834", 100);
		});
	});

	// 방문 & 좋아요 기록 테스트
	describe("visit like record", () => {
		// 방문 기록 조회
		it("getPersonalVisitRecord", async () => {
			const getVisitRecord = await pService.getPersonalVisitRecord(
				"100625979022689944834",
				1,
				10
			);
			expect(getVisitRecord.length).toEqual(3);
		});

		// 방문 기록 저장 에러 : 포스트 없음
		it("createPersonalVisitRecord error : Post not found", async () => {
			await pService
				.createPersonalVisitRecord(
					"100625979022689944834",
					visitRecordBody
				)
				.catch((err) => {
					expect(err.message).toEqual("Post not found");
				});
		});

		// 방문 기록 저장
		it("createPersonalVisitRecord", async () => {
			visitRecordBody.post_id = 6;
			const createdVisitRecord = await pService.createPersonalVisitRecord(
				"100625979022689944834",
				visitRecordBody
			);
			expect(createdVisitRecord.visit_record_id).toEqual(150);
		});

		// 방문 기록 삭제 에러 : 방문 기록 없음
		it("deletePersonalVisitRecord error : visit record not found", async () => {
			await pService
				.deletePersonalVisitRecord("100625979022689944834", 109)
				.catch((err) => {
					expect(err.message).toEqual("visit record not found");
				});
		});

		// 방문 기록 삭제
		it("deletePersonalVisitRecord", async () => {
			await pService.deletePersonalVisitRecord(
				"100625979022689944834",
				150
			);
		});

		// 좋아요 기록 조회
		it("getPersonalLikeRecord", async () => {
			const getListRecord = await pService.getPersonalLikeRecord(
				"100625979022689944834",
				1,
				10
			);
			expect(getListRecord.length).toEqual(4);
		});

		// 좋아요 기록 생성 에러 : 포스트 없음
		it("createPersonalLikeRecord error : Post not found", async () => {
			likeRecordBody.post_id = 1234;
			await pService
				.createPersonalLikeRecord(
					"100625979022689944834",
					likeRecordBody
				)
				.catch((err) => {
					expect(err.message).toEqual("Post not found");
				});
		});

		// 좋아요 기록 생성
		it("createPersonalLikeRecord", async () => {
			likeRecordBody.post_id = 5;
			const createdLikeRecord = await pService.createPersonalLikeRecord(
				"100625979022689944834",
				likeRecordBody
			);
			expect(createdLikeRecord.like_record_id).toEqual(150);
		});

		// 좋아요 기록 삭제
		it("deletePersonalLikeRecord", async () => {
			await pService.deletePersonalLikeRecord(
				"100625979022689944834",
				150
			);
		});
	});

	// 댓글 테스트
	describe("comments", () => {
		// 댓글 생성 에러 : 포스트 없음
		it("createComment error : Post not found", async () => {
			await pService
				.createCommnet("100625979022689944834", commentBody)
				.catch((err) => {
					expect(err.message).toEqual("Post not found");
				});
		});

		// 댓글 생성
		it("createComment", async () => {
			commentBody.post_id = 1;
			const createdComment = await pService.createCommnet(
				"100625979022689944834",
				commentBody
			);
			expect(createdComment.comments_id).toEqual(150);
		});

		// 댓글 생성 에러 : 상위 댓글 이미 있음
		it("createComment error : sub commnet already exists", async () => {
			commentBody.post_id = 1;
			commentBody.sub_comments_id = 2;
			await pService
				.createCommnet("100625979022689944834", commentBody)
				.catch((err) => {
					expect(err.message).toEqual("sub commnet already exists");
				});
		});

		// 댓글 생성 에러 : 상위 댓글 없음
		it("createComment error : comment not found", async () => {
			commentBody.post_id = 1;
			commentBody.sub_comments_id = 2222;
			await pService
				.createCommnet("100625979022689944834", commentBody)
				.catch((err) => {
					expect(err.message).toEqual("comment not found");
				});
		});

		// 댓글 수정 에러 : 댓글 없음
		it("updateCommnet error : comment not founds", async () => {
			commentBody.post_id = 1;
			commentBody.sub_comments_id = 2;
			await pService
				.updateCommnet("100625979022689944834", 151, commentBody)
				.catch((err) => {
					expect(err.message).toEqual("comment not found");
				});
		});

		// 댓글 수정
		it("updateCommnet", async () => {
			delete commentBody.post_id;
			delete commentBody.sub_comments_id;
			commentBody.comments_body = "안녕 나는 업데이트야";
			await pService.updateCommnet(
				"100625979022689944834",
				150,
				commentBody
			);
		});

		// 댓글 삭제
		it("deleteCommnet error : comment not founds", async () => {
			await pService
				.deleteCommnet("100625979022689944834", 150)
				.catch((err) => {
					expect(err.message).toEqual("comment not found");
				});
		});
	});

	// 개인 검색 테스트
	describe("personal search", () => {
		// 개인 포스트 페이지에서 검색
		it("personal post", async () => {
			const searchedPost = await pService.searchPersonalposts(
				"qwer",
				0,
				"100625979022689944834",
				1,
				10
			);
			expect(searchedPost.length).toEqual(2);
		});

		// 개인 임시 포스트에서 검색
		it("personal tmp post", async () => {
			const searchedPost = await pService.searchPersonalposts(
				"qwer",
				1,
				"100625979022689944834",
				1,
				10
			);
			expect(searchedPost.length).toEqual(1);
		});

		// 개인 방문 목록에서 조회
		it("personal visit post", async () => {
			const searchedPost = await pService.searchPersonalposts(
				"qwer",
				2,
				"100625979022689944834",
				1,
				10
			);
			expect(searchedPost.length).toEqual(1);
		});

		// 개인 좋아요 목록에서 조회
		it("personal like post", async () => {
			const searchedPost = await pService.searchPersonalposts(
				"qwer",
				3,
				"100625979022689944834",
				1,
				10
			);
			expect(searchedPost.length).toEqual(1);
		});
	});

	// 공용 검색 테스트
	describe("Common search", () => {
		it("common searches", async () => {
			const searchedCommonPostawait = await pService.searchCommonPosts(
				"test",
				"qwer",
				0,
				10
			);
			expect(searchedCommonPostawait.length).toEqual(2);
		});
	});

	//연관 포스트 조회
	describe("associatePost", () => {
		// 연관 포스트 조회
		// 항상 랜덤으로 나와서 예측 불가능
		it("associatePost", async () => {
			await pService.associatePost(1).catch((err) => {
				throw new CustomError(
					httpStatus.INTERNAL_SERVER_ERROR,
					err.message
				);
			});
		});
	});
});
