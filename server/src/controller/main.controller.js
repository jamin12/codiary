const logger = require('../config/logger');
const { mainService } = require('../service/index');

const output = {
  getContents: async (req, res) => {
    const mService = new mainService()
    const result_contents = await mService.getPopularContents(1,3)
    res.send(result_contents);
  },
};

const input = {

};

module.exports = {
	output,
	input,
};
