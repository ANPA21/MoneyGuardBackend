const { requestError } = require("../../helpers");
const User = require("../../models/user");

const userSubscription = async (req, res) => {
  const { id, subscription: activeSubscription } = req.user;
  const { subscription } = req.body;

  if (activeSubscription === subscription) {
    throw requestError(400, "Selected subscription is already active");
  }

  await User.findByIdAndUpdate(id, { subscription });
  res.status(204).json();
};

module.exports = userSubscription;
