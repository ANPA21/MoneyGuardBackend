const Joi = require('joi');

const editTransactionsSchema = Joi.object({
  comment: Joi.string(),
  type: Joi.string().valid('expense', 'income'),
  category: Joi.when('type', {
    is: 'expense',
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),
  value: Joi.number().min(0),
  date: Joi.date(),
});

module.exports = editTransactionsSchema;
