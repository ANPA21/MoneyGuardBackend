const Joi = require("joi");

const userSubscriptionschema = Joi.object({
  subscription: Joi.string().valid("default", "pro", "business").required(),
});

module.exports = userSubscriptionschema;
