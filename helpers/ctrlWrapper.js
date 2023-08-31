const ctrlWrapper = (ctrl) => {
  const fx = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return fx;
};

module.exports = ctrlWrapper;
