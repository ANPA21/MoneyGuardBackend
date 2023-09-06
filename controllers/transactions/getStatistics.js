const Transaction = require('../../models/transactions.model');

async function getStatistics(req, res) {
  const userId = req.user._id;
  const { year, month } = req.query;

  try {
    const transactions = await Transaction.find({
      owner: userId,
      createdAt: {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 0),
      },
    });

    const totalIncome = calculateTotal(transactions, 'income');
    const totalExpenses = calculateTotal(transactions, 'expense');
    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (error) {
    console.error('Error calculating statistics:', error);
    res.status(500).json({ error: 'Error calculating statistics' });
  }
}

function calculateTotal(transactions, type) {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.value, 0);
}

module.exports = {
  getStatistics,
};
