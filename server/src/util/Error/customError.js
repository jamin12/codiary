"use strict";

class CustomError extends Error {
    constructor(error_info,...params){
        super(...params);

        if(Error.captureStackTrace){
            // 에러 스택을 CustomError에 쌓는다
            Error.captureStackTrace(this, CustomError);
        }
        
        this.status = error_info.status;
        this.message = error_info.message;
    }
}

module.exports = CustomError;