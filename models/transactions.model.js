const { model } = require("mongoose");


const { transactionSchema } = require("../schemas/transactionsSchemas");

const Transaction = model("transactions", transactionSchema);


module.exports = Transaction;
