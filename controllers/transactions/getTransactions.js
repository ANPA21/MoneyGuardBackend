const Transaction = require("../../models/transactions.model");

const getTransactions = async ({ user: { _id } }, res) => {
  try {
    const transactions = await Transaction.find({ owner: _id });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = getTransactions;
