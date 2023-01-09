const Joi = require('joi');

const userCreateValidation = (data) => {
  const createSchema = Joi.object({
    firstName: Joi.string().min(2).max(20).required(),
    lastName: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]/).min(5).required(),
    salt: Joi.string().required(),
    age: Joi.number().min(1).max(120).required()
  });

  return createSchema.validateAsync(data);
};

const userUpdateValidation = (data) => {
  const updateSchema = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^[a-zA-Z0-9!@#$%^&*]{5,30}$/),
    age: Joi.number().min(1).max(120)
  });

  return updateSchema.validateAsync(data);
};

module.exports = {
  userCreateValidation,
  userUpdateValidation
};
