"use strict";

const PageInfo = require("./pageInfo");

const content_model = require("../models/index").contents;

class Contents extends PageInfo{

    constructor() {
        super();
        this.model = content_model;
    }

    // 게시물 리스트
    async getContents(params){
        return await content_model.findAll({where: {
            contents_id: params,
        }});
    }
}


module.exports = Contents;
