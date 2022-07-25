"use strict";

const mesurement_model = require("../models/index").mesurement;
const PageInfo = require("./pageInfo");

class Mesurement extends PageInfo{
    constructor() {
        super();
        this.model = mesurement_model;
    }

    // 가장 많은 방문자 페이징 해서 가져오기
    async getMostPopularContents(...params){
        const page_result = this.pageResult(params.slice(-1)[0]);
        return await this.model.findAll({
            order: ["total_visit_count"],
            offset: page_result.offset,
            limit: page_result.limit,
        });
    }
}

module.exports = Mesurement;