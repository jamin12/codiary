const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { personalValidation } = require('../validations/index');
const { personalController } = require('../controller');

router
  .route('/category/:uniqueid')
  .get(validate(personalValidation.getPsersonalCategory), personalController.output.getPersonalCategory);

router
  .route('/contents/:uniqueid')
  .get(validate(personalValidation.getPsersonalContents), personalController.output.getPersonalContents);

router
  .route('/:uniqueid/:searchword')
  .get(validate(personalValidation.searchPsersonalContents), personalController.output.searchPersonalContents);

module.exports = router;