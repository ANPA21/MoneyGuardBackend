const { transactions: service } = require('../../services');

const getTransactions = async ({ user: { id } }, res) => {
    const result = await service.getTransactions(id);

    return res.json({
        status: 'Success',
        code: 200,
        data: {
            total: result.length,
            result,
        },
    });
};
module.exports = getTransactions;