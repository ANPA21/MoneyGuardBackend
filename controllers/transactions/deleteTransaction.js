const Transaction = require('../../models/transactions.model');
const { RequestError } = require('../../helpers');

const deleteTransaction = async (req, res, next) => {
    try {
        const { _id } = req.params;
        const transaction = await Transaction.findByIdAndRemove(_id);

        // if (!transaction) {
        //     throw RequestError(404, 'Transaction not found');
        // }

        res.json({
            status: 'Success',
            code: 200,
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

module.exports = deleteTransaction;