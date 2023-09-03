const { Transaction } = require("../../models/transactions.model")

const { RequestError } = require("../../helpers")

const updateTransactions = async (req, res) => {
    const { id } = req.params;
    const result = await Transaction.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
        throw RequestError(404, "Not found")
    }
    res.status(201).json(result)
}

module.exports = updateTransactions;