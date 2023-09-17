const Transaction = require('../../models/transactions.model');

const addTransactions = async ({ body, user: { _id } }, res) => {
  try {
    const transaction = await Transaction.create({ owner: _id, ...body });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
module.exports = addTransactions;
