const User = require("../../models/user");

const userLogout = async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(200).json("Sucessfully logged out");
};

module.exports = userLogout;
