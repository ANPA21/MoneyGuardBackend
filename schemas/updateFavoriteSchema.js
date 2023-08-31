const Joi = require("joi");

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().messages({ "any.required": "missing field favorite " }).required(),
});

module.exports = updateFavoriteSchema;
