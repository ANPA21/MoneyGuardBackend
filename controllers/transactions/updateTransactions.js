const Transaction = require('../../models/transactions.model');

const { requestError } = require('../../helpers');

const updateTransactions = async (req, res) => {
  const { id } = req.params;
  if (req.body.type === 'income') {
    await Transaction.findByIdAndUpdate(id, { $unset: { category: 1 } });
  }
  result = await Transaction.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    throw requestError(404, 'Not found');
  }
  res.status(201).json(result);
};

module.exports = updateTransactions;
