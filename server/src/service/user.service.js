const { users, user_detail, sns_info, sequelize } = require("../models/index");
const logger = require("../config/logger");

// const

class UserService {
	constructor() {}

	async createUser(user) {
		sequelize.transaction(async (t1) => {
			// user 테이블에 데이터 삽입
			await users.create({
				user_id: user.id,
				user_email: user.email,
				user_role: "user",
			});

			// user_detail 테이블에 데이터 삽입
			await user_detail.create({
				user_id: user.id,
				user_name: user.displayName,
				user_unique_id: user.displayName,
				user_nickname: "",
				user_introduce: "",
				user_img: user.picture,
			});
      
			// sns_info 테이블에 데이터 삽입
			await sns_info.create({
				user_id: user.id,
				sns_type: user.provider,
				sns_name: user.displayName,
				sns_img: user.picture,
			});
		});
	}
}

module.exports = UserService;
