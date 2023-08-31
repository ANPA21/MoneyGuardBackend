const { requestError } = require("../../helpers");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw requestError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({ email, password: hashPassword, name });
  res.status(201).json({ name: result.name, email: result.email });
};

module.exports = userRegister;
