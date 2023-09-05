const Transaction = require("../models/transactions.model");

module.exports = {
  // add transaction
  // addTransactions: (userId, body) => {
  //   return Transaction.create({ owner: userId, ...body });
  // },
  // get transactions
  // getTransactions: (userId) => Transaction.find({ owner: userId }),
  // // get transactions by date
  // getTransactionsByDate: (userId, month, year) => Transaction.find({ owner: userId, month, year }),
  // // get all income
  // getAllIncome: (userId) => Transaction.find({ owner: userId, type: "income" }),
  // // get all income by date
  // getAllIncomeByDate: (userId, month, year) =>
  //   Transaction.find({ owner: userId, type: "income", month, year }),
  // // get all spend
  // getAllSpend: (userId) => Transaction.find({ owner: userId, type: "spend" }),
  // // get all spend by date
  // getAllSpendByDate: (userId, month, year) =>
  //   Transaction.find({ owner: userId, type: "spend", month, year }),
};
