"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('../controller/index.ctrl');
const { isLoggedIn,isNotLoggedIn } = require('../middleware/middleware');

router.get("/",isLoggedIn,ctrl.output.index);
router.get("/login",ctrl.output.login);
router.get("/oauth2callback",ctrl.output.oauth2callback);
router.get("/logout",isLoggedIn,ctrl.output.logout)


module.exports = router;