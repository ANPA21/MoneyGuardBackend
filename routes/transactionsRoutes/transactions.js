const express = require('express');
const ctrl = require('../../controllers/transactions');
const authentication = require('../../middleware/authenticate');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const router = express.Router();
const validateBody = require('../../middleware/validateBody');
const {
  getCategories,
} = require('../../controllers/transactions/getCategories');
const {
  editTransactionsSchema,
  addTransactionsSchema,
} = require('../../schemas/transactionsSchemas');

// GET all /transactions
router.get('/', authentication, ctrlWrapper(ctrl.getTransactions));

// GET all /categories
router.get('/categories', authentication, getCategories);

// GET /transactions/statistics
// GET /transactions/statistics?month=00&year=0000
router.get('/statistics', authentication, ctrlWrapper(ctrl.getStatistics));

// POST /transactions
router.post(
  '/',
  authentication,
  validateBody(addTransactionsSchema),
  ctrlWrapper(ctrl.addTransactions)
);

// PUT /transactions/:id
router.put(
  '/:id',
  authentication,
  validateBody(editTransactionsSchema),
  ctrlWrapper(ctrl.updateTransactions)
);

// DELETE /transactions/:id
router.delete('/:id', authentication, ctrlWrapper(ctrl.deleteTransaction));

module.exports = router;
