const { transactions: service } = require("../../services");

// const addTransactions = async ({ body, user: { _id, balance } }, res) => {
//   if (body.type === "income") {
//     const updatedBalance = (balance += body.money);
//     await users.updateUser(_id, { balance: updatedBalance });
//   }
//   if (body.type === "expense") {
//     const updatedBalance = (balance -= body.money);
//     await users.updateUser(_id, { balance: updatedBalance });
//   }

//   const result = await service.addTransactions({ ...body });

//   return res.status(201).json(result);
// };

const addTransactions = async ({ body, user: { _id } }, res) => {
  const result = await service.addTransactions(_id, body);

  return res.status(201).json(result);
};
module.exports = addTransactions;
