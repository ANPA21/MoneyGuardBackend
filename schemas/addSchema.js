const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().trim().required(),
  favorite: Joi.boolean().default(false),
});

module.exports = addSchema;
