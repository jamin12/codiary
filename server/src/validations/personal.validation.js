const joi =  require('Joi');

const getPsersonalCategory = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
  }),
  params: joi.object().keys({
    uniqueid: joi.string().required(),
  }),
};

const getPsersonalContents = {
  query: joi.object().keys({
    offset: joi.number().required(),
    limit: joi.number()
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
  getPsersonalContents,
  searchPsersonalContents,
  getPsersonalCategory,
};