"use strict";

const express = require('express');
const router = express.Router();
const ctrl = require('./home.ctrl');

router.get("/hello",ctrl.output.hello);


module.exports = router;