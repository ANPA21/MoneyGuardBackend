const { transactions: service } = require("../../services");

const getTransactions = async ({ user: { _id } }, res) => {
  const result = await service.getTransactions(_id);

  return res.json(result);
};
module.exports = getTransactions;
