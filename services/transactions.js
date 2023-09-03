const { Transaction } = require('../models/transactions.model');

module.exports = {
    // add transaction
    addTransactions: (userId, body, balance) => {
        return Transaction.create({ owner: userId, ...body, balance });
    },
    // get transactions
    getTransactions: userId =>
        Transaction.find({ owner: userId }).populate('category'),
    // get transactions by date
    getTransactionsByDate: (userId, month, year) =>
        Transaction.find({ owner: userId, month, year }).populate('category'),
    // get all income
    getAllIncome: userId =>
        Transaction.find({ owner: userId, type: 'income' }).populate('category'),
    // get all income by date
    getAllIncomeByDate: (userId, month, year) =>
        Transaction.find({ owner: userId, type: 'income', month, year }).populate(
            'category',
        ),
    // get all spend
    getAllSpend: userId =>
        Transaction.find({ owner: userId, type: 'spend' }).populate('category'),
    // get all spend by date
    getAllSpendByDate: (userId, month, year) =>
        Transaction.find({ owner: userId, type: 'spend', month, year }).populate(
            'category',
        ),
};