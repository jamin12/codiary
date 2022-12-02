const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { manageValidation } = require('../validations/index');
const { manageController } = require('../controller');

router
  .route('/')
  .get(auth('admin'), validate(manageValidation.output.getusers), manageController.output.getUsers)
  .post(validate(manageValidation.input.createReport), manageController.input.createReport);

router
  .route('/:reportid')
  .get(auth('admin'), validate(manageValidation.output.getReport), manageController.output.getReport)
  .delete(auth('admin'), validate(manageValidation.input.deleteReport), manageController.input.deleteReport);

router
  .route('/:reporttype/:reporttargettype')
  .get(auth('admin'), validate(manageValidation.output.getReports), manageController.output.getReports);

router
  .route("/user/s/:searchword")
  .get(auth('admin'), validate(manageValidation.output.searchword), manageController.output.searchUsers);

router
  .route("/user/d/:uniqueid")
  .delete(auth('admin'), validate(manageValidation.input.deleteUser), manageController.input.deleteUser);

module.exports = router;