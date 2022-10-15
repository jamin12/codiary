const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { measurementValidation } = require('../validations/index');
const { measurementController } = require('../controller');


router
  .route('/')
  .get(auth('user'), measurementController.output.getMeasurementInit)

router
  .route('/best')
  .get(auth('user'), measurementController.output.getBestPosts)

router
  .route('/graph/:graphtype/:postid')
  .get(auth("user"), validate(measurementValidation.output.getGraphData), measurementController.output.getGraphData)

router
  .route('/myposts/:posttype/:criterion')
  .get(auth("user"), validate(measurementValidation.output.getMyPosts),measurementController.output.getMyPosts)
module.exports = router;