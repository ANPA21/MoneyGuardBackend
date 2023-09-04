const { model } = require("mongoose");


const { transactionMongoSchema } = require("../schemas/transactionsSchemas");

const Transaction = model("transactions", transactionMongoSchema);


module.exports = Transaction;
