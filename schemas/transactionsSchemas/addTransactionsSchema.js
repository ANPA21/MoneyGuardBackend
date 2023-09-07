const Joi = require('joi');

const addTransactionsSchema = Joi.object({
  comment: Joi.string().allow(''),
  type: Joi.string().valid('expense', 'income').required(),
  category: Joi.when('type', {
    is: 'expense',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0).required(),
  date: Joi.date().required(),
});

module.exports = addTransactionsSchema;
