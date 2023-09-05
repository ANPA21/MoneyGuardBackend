const Transaction = require('../../models/transactions.model');
const { RequestError } = require('../../helpers');

const deleteTransaction = async (req, res) => {
    const { id } = req.params;
    const transaction = await Transaction.findByIdAndRemove(id);

    if (!transaction) {
        throw RequestError(404, 'Not found')
    }
    res.json({
        message: 'Transaction deleted successfully'
    })
}

module.exports = deleteTransaction;