"use strict";

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { authController } = require('../controller');

router
  .route('/')
  .get(authController.output.index);

router
  // 로그인 성공 시 
  .route('/loginsuccess')
  .get(auth("user"),authController.output.loginSuccess);

router
  // OAuth2 로그인 
  .route('/login')
  .get(authController.input.login);

router
  // OAuth2 콜백 주소
  .route('/oauth2callback')
  .get(authController.input.oauth2callback);


router
  // 세션 만료
  .route('/logout')
  .get(auth('user'), authController.output.logout)

module.exports = router;