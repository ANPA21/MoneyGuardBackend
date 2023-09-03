const express = require('express');
const authentication = require("../../middleware/authenticate");
const ctrl = require('../../controllers/transactions');
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const router = express.Router();
const validateBody = require("../../middleware/validateBody");
const { schemas } = require("../../models/transactions.model")

// GET all   /api/transactions
// router.get('/', authentication, ctrlWrapper(ctrl.getTransactions))

// !временное решение, после удалить строку ниже и разкомментить верхнюю
router.get('/', ctrlWrapper(ctrl.getTransactions))



// GET /api/transactions/statistics
// GET /api/transactions/statistics?month=00&year=0000
router.get('/statistics', authentication, ctrlWrapper(ctrl.getStatistics))

// POST /api/transactions
// router.post('/', express.json(), authentication, ctrlWrapper(ctrl.addTransactions))

// !временное решение, после удалить строку ниже и разкомментить верхнюю
router.post('/', express.json(), ctrlWrapper(ctrl.addTransactions))




router.put("/:id", validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateTransactions))

// DELETE /api/transactions/:id
router.delete('/:id', ctrlWrapper(ctrl.deleteTransaction))

module.exports = router;