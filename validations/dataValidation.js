const Joi = require('joi');

exports.userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(20),
    lastName: Joi.string().min(2).max(20),
    age: Joi.number().min(1).max(120)
  });

  return schema.validate(data);
};
