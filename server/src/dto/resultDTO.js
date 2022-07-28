"use strict";

// 넘겨줄 데이터가 있을 때
const ResultDto = (status, message, result_data) => {
	return {
		status: status,
		message: message,
		result_data: result_data,
	};
};

module.exports = ResultDto;
