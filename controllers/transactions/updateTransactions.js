const Transaction = require("../../models/transactions.model");

const { requestError } = require("../../helpers");

const updateTransactions = async (req, res) => {
  const { id } = req.params;
  const result = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateTransactions;
