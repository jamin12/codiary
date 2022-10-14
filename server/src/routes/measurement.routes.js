const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { measurementValidation } = require('../validations/index');
const { measurementController } = require('../controller');

router
  .route('/')
  .get(auth('user'), measurementController.output.getBestPosts)

router
  .route('/graph/:graphtype/:postid')
  .get(measurementController.output.getGraphData)

module.exports = router;