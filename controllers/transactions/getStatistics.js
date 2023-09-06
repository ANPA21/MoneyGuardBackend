const Transaction = require('../../models/transactions.model');
const getCategories = require('../../middleware/getCategoriesFx');

async function getStatistics(req, res) {
  const userId = req.user._id;
  const { year, month } = req.query; // пример запроса /transactions/statistics?year=2023&month=9

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

    const expenses = transactions.filter(tr => tr.type === 'expense'); // все транзакции растрат за месяц
    const categories = await getCategories(); // затянул категории
    const categoryExpenses = categories.map(category => ({
      name: category,
      total: calculateCategoryTotal(
        expenses.filter(item => item.category === category)
      ),
    })); // создаем массив объектов для каждой категории, с именем категории и общей суммой за категорию

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

function calculateCategoryTotal(transactions) {
  const total = transactions.reduce(
    (total, transaction) => total + transaction.value,
    0
  );
  return total.toFixed(2);
}
function calculateTotal(transactions, type) {
  return transactions
    .filter(transaction => transaction.type === type)
    .reduce((total, transaction) => total + transaction.value, 0);
}

module.exports = getStatistics;
