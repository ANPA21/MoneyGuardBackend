const { RequestError } = require('../../helpers');
const Transaction = require('../../models/transactions.model');

// calculating start date & end date
function getMonthStartAndEnd(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);
  endDate.setHours(23, 59, 59, 999);
  return { startDate, endDate };
}

// calculating the total amount for a custom period
async function calculateTotalForCustomPeriod(userId, startDate, endDate, type) {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: userId,
          type,
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$value' }, // if the field name is 'value'!!!!!!!!!!!!!!!!!!!!!!!
        },
      },
    ]);
    return result.length > 0 ? result[0].totalAmount : 0;
  } catch (err) {
    throw RequestError;
  }
}

// getting statistics
async function getStatistics(req, res) {
  const userId = req.user._id;
  const { month, year } = req.query;

  try {
    const { startDate, endDate } = getMonthStartAndEnd(year, month);
    const totalIncome = await calculateTotalForCustomPeriod(
      userId,
      startDate,
      endDate,
      'income'
    );
    const totalExpenses = await calculateTotalForCustomPeriod(
      userId,
      startDate,
      endDate,
      'expense'
    );

    const balance = totalIncome - totalExpenses;

    res.status(200).json({
      totalIncome,
      totalExpenses,
      balance,
    });
  } catch (err) {
    console.error('Error calculating statistics:', err);
    res.status(500).json({ error: 'Error calculating statistics' });
  }
}

module.exports = {
  getStatistics,
};
