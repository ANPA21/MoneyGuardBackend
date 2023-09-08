const Transaction = require('../../models/transactions.model');
const getCategories = require('../../middleware/getCategoriesFx');

async function getStatistics(req, res) {
  try {
    const userId = req.user._id;
    const { year, month } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const transactions = await fetchTransactions(userId, startDate, endDate);
    const totalIncome = calculateTotal(transactions, 'income');
    const totalExpenses = calculateTotal(transactions, 'expense');
    const balance = totalIncome - totalExpenses;

    const categories = await getCategories();
    const categoryExpenses = categories.map(category => ({
      name: category,
      total: calculateCategoryTotal(transactions, category),
    }));

    res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
      categoryExpenses,
    });
  } catch (error) {
    console.error('Error calculating statistics:', error, req.query);
    res.status(500).json({ error: 'Error calculating statistics' });
  }
}

async function fetchTransactions(userId, startDate, endDate) {
  return await Transaction.find({
    owner: userId,
    createdAt: { $gte: startDate, $lt: endDate },
  });
}

function calculateTotal(transactions, type) {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.value, 0);
}

function calculateCategoryTotal(transactions, category) {
  const categoryTransactions = transactions.filter(
    item => item.category === category
  );
  const total = categoryTransactions.reduce(
    (total, transaction) => total + transaction.value,
    0
  );
  return total.toFixed(2);
}

module.exports = getStatistics;
