"use strict";


const logger = require("../../config/logger");
const models = require("../../models/index");

const output = {
    hello: (req,res) => {
        models.users.findOne({where:{user_id:1}}).then(user => {
            if(user){
                user.update({user_name:"test_update"}).then(()=>console.log("good"))
            }
        });
        res.json({test:"hihi"});
    }
}

module.exports = {
    output,
}