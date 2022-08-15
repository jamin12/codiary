const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { personalValidation } = require('../validations/index');
const { personalController } = require('../controller');

router
  .route('/:uniqueid')
  .get(validate(personalValidation.getPsersonalContents), personalController.output.getPersonalContents);

router
  .route('/:uniqueid/:searchword')
  .get(validate(personalValidation.searchPsersonalContents), personalController.output.searchPersonalContents);

module.exports = router;