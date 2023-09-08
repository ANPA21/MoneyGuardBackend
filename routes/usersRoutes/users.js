const express = require('express');
const ctrl = require('../../controllers/users');
const schemas = require('../../schemas/userSchemas');
const ctrlWrapper = require('../../helpers/ctrlWrapper');
const router = express.Router();
const validateBody = require('../../middleware/validateBody');
const authentication = require('../../middleware/authenticate');

router.post(
  '/register',
  validateBody(schemas.userRegisterSchema),
  ctrlWrapper(ctrl.userRegister)
);
router.post(
  '/login',
  validateBody(schemas.userLoginSchema),
  ctrlWrapper(ctrl.userLogin)
);
router.post('/logout', authentication, ctrlWrapper(ctrl.userLogout));
router.get('/current', authentication, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
