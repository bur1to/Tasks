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

const commentGetValidation = (data) => {
  const getValidation = Joi.object({
    page: Joi.number().default(0),
    limit: Joi.number().default(5),
    sort: Joi.string().allow('firstName', 'lastName', 'email', 'age').default('firstName'),
    sortBy: Joi.string().allow('asc', 'desc').default('asc')
  });

  return getValidation.validateAsync(data);
};

module.exports = {
  commentCreateValidation,
  commentUpdateValidation,
  commentGetValidation
};
