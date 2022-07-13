"use strict";

class ResultDto {
    constructor() {
    }

    // 넘겨줄 데이터가 없을 때
    makeResult(status, message){
        let myResult = {
            status: status,
            message: message
        };
        return myResult;
    }
    // 넘겨줄 데이터가 있을 때
    makeResult(status, message, result_data) {
        let myResult = {
            status: status,
            message: message,
            result_data: result_data
        };
        return myResult;
    };
}

module.exports = ResultDto;