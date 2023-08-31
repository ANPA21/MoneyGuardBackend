const { requestError } = require("../helpers");

const validateBody = (schema) => {
  const fx = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(requestError(400, error.message));
    }
    next();
  };

  return fx;
};
module.exports = validateBody;
