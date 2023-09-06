const requestError = require('../../helpers/requestError');
const Transaction = require('../../models/transactions.model');

const getTransactions = async ({ user: { _id } }, res) => {
  try {
    const transactions = await Transaction.find({ owner: _id });
    res.json(transactions);
  } catch (error) {
    requestError(404);
  }
};
module.exports = getTransactions;
