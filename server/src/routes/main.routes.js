const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { mainValidation } = require('../validations/index');
const { mainController } = require('../controller');

router
  .route('/')
  .get(validate(mainValidation.getPopularContents), mainController.output.getPopularPosts);

router
  .route('/:searchword')
  .get(validate(mainValidation.searchContentsInMain), mainController.output.searchPostsInMain);

module.exports = router;