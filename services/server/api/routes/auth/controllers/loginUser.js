const { signToken } = require('../utils');
const User = require('../../users/userModel');
const bcrypt = require('bcryptjs');

const loginUser = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    // Fetch the user and check if the passwords match
    let user = await User.findBy({ email });

    user = user[0];

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      // Keep error message vague for security
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // If everything is ok, send token to client
    const token = signToken(user.id);

    // Hide password
    user['password'] = undefined;

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};

module.exports = loginUser;
