const httpStatus = require('http-status');
const logger = require('../config/logger');
const resultDto = require('../dto/resultDTO');
const { userService } = require('../service/index');
const catchAsync = require('../utils/catchAsync');

const uService = new userService();
const output = {
  getMyInfo: catchAsync(async(req,res) => {
    const myInfo = await uService.getUserByUserId(req.user.user_id)
    res.send(resultDto(httpStatus.OK, "myInfo", myInfo));
  }),
};

const input = {
  updateUser: catchAsync(async(req, res) => {
    const updatedUser = await uService.updateUser(req.user.user_id,req.body);
    res.send(resultDto(httpStatus.OK, 'update user success', updatedUser));
  }),
  deleteUser: catchAsync(async(req, res) => {
    const deletedUser = await uService.deleteUser(req.user.user_id)
		req.session.destroy();
    res.send(resultDto(httpStatus.OK, 'delete user success', deletedUser));
  })
};


module.exports = {
	output,
	input,
};
