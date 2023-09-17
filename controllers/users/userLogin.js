const { requestError } = require('../../helpers');
const generateToken = require('../../helpers/generateToken');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (!user) {
      throw new Error('Incorrect email or pasword!');
    }

    const pwCompare = await bcrypt.compare(password, user.password);

    if (!pwCompare) {
      throw new Error('Incorrect email or pasword!');
    } else {
      const token = generateToken(user.id);
      await User.findByIdAndUpdate(user.id, { token });
      res
        .status(200)
        .json({ token, user: { name: user.name, email: user.email } });
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
};

module.exports = userLogin;
