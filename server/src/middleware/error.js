const CustomError = require("../util/Error/customError");
const result_dto = require("../dto/resultDto");
const logger = require("../config/logger");

module.exports = (err,req,res,next) => {
    // 결과 값을 담기위한 dto 설정
    // err이 CustomeError이면 true
    if(err instanceof CustomError) {
        logger.error("err : " + err + "\nerror stack : " + err.stack);
        return res.status(err.status).json(result_dto(err.status,err.message));
    }
    logger.error(`err : ${err.message} \n error stack ${err.stack}`);
    return res.status(500).json(result_dto(500,"server error"));
};