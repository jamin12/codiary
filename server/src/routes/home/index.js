"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./index.ctrl');
const { isLoggedIn,isNotLoggedIn } = require('../middleware');

router.get("/",ctrl.output.index);
router.get("/login",ctrl.output.login);
router.get("/oauth2",ctrl.output.oauth2);
router.get("/oauth2callback",ctrl.output.oauth2callback);



module.exports = router;