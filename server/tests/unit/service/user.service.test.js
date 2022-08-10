const { userService } = require("../../../src/service/index");
const logger = require("../../../src/config/logger");

const uService = new userService();

describe("userService", () => {
	const userModel = {
		id: "1234",
		email: "test1@test12.com",
		displayName: "testjamin",
		picture: "테스트 이미지",
		provider: "google",
	};

	// 이미 있는 유저 삭제
	beforeAll(async () => {
		const user = await uService
			.getUserByUserId(userModel.id)
			.catch((err) => {
				expect(err.message).toEqual("User not found");
			});
		if (user) {
			await uService.deleteUser(userModel.id);
		}
	});

	// 유저 생성
	it("createUser", async () => {
		const createdUser = await uService.createUser(userModel);
		expect(createdUser.user_email).toEqual(userModel.email);
	});

	// 유저 생성 실패
	it("createUser Error : create user failed", async () => {
		delete userModel.provider;
		await uService.createUser(userModel).catch((err) => {
			expect(err.message).toEqual("create user failed");
		});
	});

	// 유저 아이디로 조회
	it("getUserByUserId", async () => {
		const searchedUserByUserId = await uService.getUserByUserId(
			userModel.id
		);
		expect(searchedUserByUserId.user_email).toEqual(userModel.email);
	});

	// 유저 업데이트
	it("updtaeUser", async () => {
		const updateInfo = {
			user_unique_id: "unique-test",
		};
		const updatedUser = await uService.updateUser(userModel.id, updateInfo);
		expect(updatedUser.user_detail.user_unique_id).toEqual(
			updateInfo.user_unique_id
		);
	});

	// 유저 유니크아이디로 조회
	it("getUserByUserUniqueId", async () => {logger
		const searchedUserByUserUniqueId = await uService.getUserByUniqueId(
			"unique-test"
		);
		expect(searchedUserByUserUniqueId.user_name).toEqual(userModel.displayName);
	});

	// 유저 업데이트 에러
	it("updtaeUser Error : User_unique_id already exists", async () => {
		const updateInfo = {
			user_unique_id: "unique-test",
		};
		await uService.updateUser(userModel.id, updateInfo).catch((err) => {
			expect(err.message).toEqual("User_unique_id already exists");
		});
	});

	// 전체 유저 조회
	it("getUsers", async () => {
		const userList = await uService.getUsers();
		expect(userList.length).toEqual(1);
	});

	// 유저 삭제
	it("deleteUser", async () => {
		const deletedUser = await uService.deleteUser(userModel.id);
		expect(deletedUser.user_email).toEqual(userModel.email);
	});
});
