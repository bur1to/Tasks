const Joi = require('joi');

const commentCreateValidation = (data) => {
  const createSchema = Joi.object({
    userId: Joi.string().required(),
    comment: Joi.string().min(3).max(255).required()
  });
  return createSchema.validateAsync(data);
};

const commentUpdateValidation = (data) => {
  const updateSchema = Joi.object({
    userId: Joi.string(),
    comment: Joi.string().min(3).max(255)
  });
  return updateSchema.validateAsync(data);
};

module.exports = {
  commentCreateValidation,
  commentUpdateValidation
};
