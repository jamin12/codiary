const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { userValidation } = require('../validations/index');
const { userController } = require('../controller');

router
  .route('/')
  .get(auth('user'), userController.output.getMyInfo)
  .patch(auth('user'), userController.input.updateUser)
  .delete(auth('user'), userController.input.deleteUser);


module.exports = router;