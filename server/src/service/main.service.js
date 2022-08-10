const httpStatus = require("http-status");
const { contents } = require("../models/index");
const CustomError = require("../utils/Error/customError");
const Paging = require('../utils/paging');

class MainService{    
    constructor() {
        this.paging = new Paging();
    }

    async getPopularContents(...params) {
        const pageResult = this.paging.pageResult(params[0], params[1]);
        const result_contents = await contents.findAll({
            attributes: [
                "contents_id",
                "contents_title",
                "contents_body_md",
                "contents_body_html",
            ],
            order: [['like_count', 'DESC']],
            offset: pageResult.offset,
            limit: pageResult.limit
        });
        if(result_contents.length === 0){
            throw new CustomError(httpStatus.BAD_REQUEST, "not found contents");
        }
        return result_contents;
    }
}

module.exports = MainService;
