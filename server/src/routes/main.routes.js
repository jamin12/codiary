"use strict";

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { mainController } = require('../controller');

router
  .route('/')
  .get();

module.exports = router;