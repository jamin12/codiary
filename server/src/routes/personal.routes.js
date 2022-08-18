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
  .route('/tmpposts')
  .get(auth('user'), personalController.output.getPersonalTmppost);

router
  .route('/visitrecord')
  .get(auth('user'), validate(personalValidation.getPsersonalVisitRecord), personalController.output.getPersonalVisitRecord);

router
  .route('/likerecord')
  .get(auth('user'), validate(personalValidation.getPsersonalLikeRecord), personalController.output.getPersonalLikeRecord);

router
  .route('/posts/:uniqueid')
  .get(validate(personalValidation.getPsersonalPostByDate), personalController.output.getPersonalPostByDate);

router
  .route('/posts/:uniqueid/:categoryid')
  .get(validate(personalValidation.getPsersonalPost), personalController.output.getPsersonalPost);

router
  .route('/:uniqueid/:searchword/:searchtype')
  .get(validate(personalValidation.searchPsersonalContents), personalController.output.searchPersonalposts);

module.exports = router;