const express = require("express");
const ctrl = require("../../controllers/transactions");
const authentication = require("../../middleware/authenticate");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const router = express.Router();
const validateBody = require("../../middleware/validateBody");
const addTransactionsSchema = require("../../schemas/transactionsSchemas/addTransactionsSchema");
const { getCategories } = require('../../controllers/transactions/getCategories')



// GET all /transactions
router.get("/", authentication, ctrlWrapper(ctrl.getTransactions));

// GET all /categories
router.get("/categories", authentication, getCategories);

// GET /transactions/statistics
// GET /transactions/statistics?month=00&year=0000
router.get("/statistics", authentication, ctrlWrapper(ctrl.getStatistics));

// POST /transactions
router.post("/", authentication, ctrlWrapper(ctrl.addTransactions));

// PUT /transactions/:id
router.put("/:id", authentication, validateBody(addTransactionsSchema), ctrlWrapper(ctrl.updateTransactions));

// DELETE /transactions/:id
router.delete("/:id", authentication, ctrlWrapper(ctrl.deleteTransaction));

module.exports = router;
