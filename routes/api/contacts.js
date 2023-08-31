const express = require("express");
const ctrl = require("../../controllers/contacts");
const schemas = require("../../schemas");
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const router = express.Router();
const validateBody = require("../../middleware/validateBody");
const authentication = require("../../middleware/authenticate");

router.get("/", authentication, ctrlWrapper(ctrl.getAllContacts));
router.get("/:contactId", authentication, ctrlWrapper(ctrl.getContactById));

router.post("/", authentication, validateBody(schemas.addSchema), ctrlWrapper(ctrl.addContact));

router.delete("/:contactId", authentication, ctrlWrapper(ctrl.removeContactById));

router.put("/:contactId", authentication, validateBody(schemas.addSchema), ctrlWrapper(ctrl.updateContactById));

router.patch("/:contactId", authentication, validateBody(schemas.updateFavoriteSchema), ctrlWrapper(ctrl.updateFavoriteById));

module.exports = router;
