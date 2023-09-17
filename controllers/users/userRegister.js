const { requestError, generateToken } = require('../../helpers');
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user) {
      throw new Error('Email is already in use!');
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await User.create({ email, password: hashPassword, name });
      const newUser = await User.findOne({ email });

      const token = generateToken(newUser.id);
      await User.findByIdAndUpdate(newUser.id, { token });

      res.status(201).json({
        token,
        user: {
          name: result.name,
          email: result.email,
        },
      });
    }
  } catch (error) {
    res.status(409).json(error.message);
  }
};

module.exports = userRegister;
