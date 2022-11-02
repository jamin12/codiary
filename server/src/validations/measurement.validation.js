const joi = require('joi');

const output = {
  getGraphData: {
    params: joi.object().keys({
      graphtype: joi.number().required().valid(0, 1, 2),
      postid: joi.number().required(),
    }),
  },

  getMyPosts: {
    params: joi.object().keys({
      posttype: joi.number().required().valid(0, 1, 2, 3),
      criterion: joi.number().required().valid(0, 1),
    }),
    query: joi.object().keys({
      offset: joi.number().required(),
      limit: joi.number(),
    }),
  },
}

module.exports = {
  output
};