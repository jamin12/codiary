"use strict";


const logger = require("../../config/logger");

const output = {
    hello: (req,res) => {

        res.json({test:"hihi"});
    }
}

module.exports = {
    output,
}