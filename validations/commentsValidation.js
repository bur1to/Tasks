const Joi = require('joi');

const commentCreateValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().min(3).max(255).required()
  });
  return schema.validate(data);
};

const commentUpdateValidation = (data) => {
  const schema = Joi.object({
    userId: Joi.string(),
    comment: Joi.string().min(3).max(255)
  });
  return schema.validate(data);
};

module.exports = {
  commentCreateValidation,
  commentUpdateValidation
};
