const { nanoid } = require('nanoid');
const { users, transactions: service } = require('../../services');


const addTransactions = async ({ body, user: { id, balance } }, res) => {
    const transactionId = nanoid();
    if (body.type === 'income') {
        const updatedBalance = (balance += body.money);
        await users.updateUser(id, { balance: updatedBalance });
    }
    if (body.type === 'spend') {
        const updatedBalance = (balance -= body.money);
        await users.updateUser(id, { balance: updatedBalance });
    }


    const result = await service.addTransactions(id, { ...body, id: transactionId }, balance);

    return res.status(201).json({
        status: 'Created',
        code: 201,
        data: {
            result,
        },
    });
};

module.exports = addTransactions;