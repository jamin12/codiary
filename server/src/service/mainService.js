"use strict";

const {  } = require("../models/index");

class ContentsService{
    contents_model = new contentsRepository();
    mesurement_model = new mesurementRepository();
    
    constructor() {
    }

    async getIndexPagePopularContents(){
        let result = null;
        await this.mesurement_model.getMostPopularContents(0).then(async (data) => {
            const contents_id = [];
            for (let index = 0; index < data.length; index++) {
                // 가장 많은 방문자가 있는 페이지 리스트
                contents_id.push(data[index].dataValues.mesurement_id);
            }
            // contents_id 리스트로 게시물 가져오기
            result = await this.contents_model.getContents(contents_id);
        });
        return result;
    }
}

module.exports = ContentsService;