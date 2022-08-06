const { contents } = require("../models/index");
const Paging = require('../utils/paging');

class MainService{    
    constructor() {
        this.paging = new Paging();
    }

    async getPopularContents(...params) {
        const pageResult = this.paging.pageResult(params[0], params[1]);
        const result_contents = await contents.findAll({
            order: [['like_count', 'DESC']],
            offset: pageResult.offset,
            limit: pageResult.limit
        });
        return result_contents;
    }
}

module.exports = MainService;
