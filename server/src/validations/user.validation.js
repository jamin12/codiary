const joi =  require('Joi');

const updateUser = {
  body: joi.object().keys({
    user_unique_id: joi.string(),
    user_nickname: joi.string(),
    user_introduce: joi.string(),
    user_img: joi.string(),
  }),
};


module.exports = {
  updateUser,
};