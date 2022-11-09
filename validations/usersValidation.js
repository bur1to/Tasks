const Joi = require('joi');

const userCreateValidation = (data) => {
  const createSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    age: Joi.number().min(1).max(120).required()
  });

  return createSchema.validate(data);
};

const userUpdateValidation = (data) => {
  const updateSchema = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    age: Joi.number().min(1).max(120)
  });

  return updateSchema.validate(data);
};

module.exports = {
  userCreateValidation,
  userUpdateValidation
};
