const joi =  require('joi');

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
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
};


module.exports = {
  getPopularContents,
  searchContentsInMain,
};