const Joi = require("joi");

const userRegisterSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(5).required(),
});

module.exports = userRegisterSchema;
