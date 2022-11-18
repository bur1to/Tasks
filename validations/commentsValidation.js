const Joi = require('joi');

const commentCreateValidation = (data) => {
  const createSchema = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().min(3).max(255).required()
  });
  return createSchema.validate(data);
};

const commentUpdateValidation = (data) => {
  const updateSchema = Joi.object({
    userId: Joi.string(),
    comment: Joi.string().min(3).max(255)
  });
  return updateSchema.validate(data);
};

module.exports = {
  commentCreateValidation,
  commentUpdateValidation
};
