const joi =  require('Joi');

const getPopularContents = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
};

const searchContentsInMain = {
  params: joi.object().keys({
    searchword: joi.string().required(),
  }),
};


module.exports = {
  getPopularContents,
  searchContentsInMain,
};