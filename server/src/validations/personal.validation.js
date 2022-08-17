const joi =  require('Joi');
const { datetime } = require("./custom.validation");

const getPsersonalCategory = {
  params: joi.object().keys({
    uniqueid: joi.string().required(),
  }),
};

const getPsersonalPost = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
  params: joi.object().keys({
    uniqueid: joi.string().required(),
    categoryid: joi.number().required(),
  }),
};

const getPsersonalPostByDate = {
  query: joi.object().keys({
    startdate: joi.custom(datetime).required(),
    enddate: joi.custom(datetime).required(),
  }),
  params: joi.object().keys({
    uniqueid: joi.string().required(),
  }),
};

const searchPsersonalContents = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
  params: joi.object().keys({
    uniqueid: joi.string().required(),
    searchword: joi.string().required(),
  }),
};


module.exports = {
  getPsersonalPost,
  searchPsersonalContents,
  getPsersonalCategory,
  getPsersonalPostByDate,
};