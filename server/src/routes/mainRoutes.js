"use strict";

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { mainController } = require('../controller/indexController');

router
  .route('/')
  .get(mainController.output.index);

router
  // OAuth2 로그인 
  .route('/login')
  .get(mainController.input.login);

router
  // OAuth2 콜백 주소
  .route('/oauth2callback')
  .get(mainController.input.oauth2callback);


router
  // 세션 만료
  .route('logout')
  .get(auth('user'), mainController.output.logout)

module.exports = router;