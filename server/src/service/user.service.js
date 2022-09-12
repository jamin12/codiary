const { users, user_detail, sns_info, sequelize } = require("../models/index");
const logger = require("../config/logger");
const CustomError = require("../utils/Error/customError");
const httpStatus = require("http-status");
const { v4: uuid } = require("uuid");

// const

class UserService {
	constructor() {}

	// 아이디로 유저 찾기
	async getUserByUserId(userId) {
		const user = await users.findOne({
			attributes: ["user_email"],
			include: [
				{
					model: user_detail,
					as: "user_detail",
					attributes: [
						"user_name",
						"user_unique_id",
						"user_nickname",
						"user_introduce",
						"user_img",
					],
				},
				{ model: sns_info, as: "sns_info", attributes: ["sns_name"] },
			],
			where: { user_id: userId },
		});
		if (!user)
			throw new CustomError(httpStatus.BAD_REQUEST, "User not found");
		return user;
	}

	// 유니크 아이디로 유저 찾기
	async getUserByUniqueId(userUniqueId) {
		const user = await user_detail.findOne({
			attributes: [
				"user_id",
				"user_name",
				"user_unique_id",
				"user_nickname",
				"user_introduce",
				"user_img",
			],
			include: [
				{
					model: users,
					as: "user",
					attributes: ["user_email"],
					include: [{ model: sns_info, as: "sns_info", attributes: ["sns_name"] }],
				},
			],
			where: { user_unique_id: userUniqueId },
		});
		if (!user)
			throw new CustomError(httpStatus.BAD_REQUEST, "User not found");
		return user;
	}

	// 유저 유니크 아이디 체크
	async checkUserUniqueId(userUniqueId) {
		const userList = await user_detail.findAll({
			attributes: ["user_unique_id"],
		});
		userList.forEach((user) => {
			if (user.user_unique_id === userUniqueId)
				throw new CustomError(
					httpStatus.BAD_REQUEST,
					"User_unique_id already exists"
				);
		});
	}

	// 유저 생성
	async createUser(userInfo) {
		try {
			await sequelize.transaction(async (t1) => {
				// user 테이블에 데이터 삽입
				await users.create({
					user_id: userInfo.id,
					user_email: userInfo.email,
					user_role: "user",
				});

				// user_detail 테이블에 데이터 삽입
				await user_detail.create({
					user_id: userInfo.id,
					user_name: userInfo.displayName,
					user_unique_id: uuid(),
					user_nickname: "",
					user_introduce: "",
					user_img: userInfo.picture,
				});

				// sns_info 테이블에 데이터 삽입
				await sns_info.create({
					user_id: userInfo.id,
					sns_type: userInfo.provider,
					sns_name: userInfo.displayName,
					sns_img: userInfo.picture,
				});
			});
		} catch (err) {
			throw new CustomError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"create user failed",
				true,
				err.stack
			);
		}
		return await this.getUserByUserId(userInfo.id);
	}

	// 유저 업데이트
	async updateUser(userId, userInfo) {
		await this.getUserByUserId(userId);
		await this.checkUserUniqueId(userInfo.user_unique_id);
		await user_detail.update(userInfo, {
			where: {
				user_id: userId,
			},
		});
		return await this.getUserByUserId(userId);
	}

	// 유저 삭제
	async deleteUser(userId) {
		const deletedUser = await this.getUserByUserId(userId);

		try {
			await sequelize.transaction(async (t1) => {
				// user_detail 테이블에 데이터 삭제
				await user_detail.destroy({
					where: {
						user_id: userId,
					},
				});

				// sns_info 테이블에 데이터 삭제
				await sns_info.destroy({
					where: {
						user_id: userId,
					},
				});
				
				// user 테이블에 데이터 삭제
				await users.destroy({
					where: {
						user_id: userId,
					},
				});
			});
		} catch (err) {
			logger.error(err.message);
			throw new CustomError(
				httpStatus.INTERNAL_SERVER_ERROR,
				"delete user failed",
				true,
				err.stack
			);
		}
		return deletedUser;
	}
}

module.exports = UserService;
