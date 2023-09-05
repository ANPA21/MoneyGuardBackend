const { RequestError } = require("../helpers");

const validateBody = (schema) => {
  const fx = (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(RequestError(400, error.message));
    }
    next();
  };

  return fx;
};
module.exports = validateBody;
