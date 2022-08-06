const joi =  require('Joi');

const getPopularContents = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
};


module.exports = {
  getPopularContents,
};