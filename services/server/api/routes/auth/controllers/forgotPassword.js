const User = require('../../users/userModel');

const { sendResetPasswordLink } = require('../../../utils/sendGrid/messages');

const forgotPassword = async (req, res, next) => {
  try {
    let user = await User.findBy({ email: req.body.email });

    if (user.length === 0) {
      return res
        .status(404)
        .json({ message: 'User with that email does not exist' });
    }

    let userId = user[0].id;

    let userEmail = user[0].email;

    let passwordResetToken = await User.createPasswordResetToken(userId);

    let resetUrl = generateResetUrl(passwordResetToken);

    await sendResetPasswordLink(userEmail, resetUrl);

    res.status(200).json({ message: 'Token sent to email!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const generateResetUrl = (resetToken) => {
  let url;
  if (process.env.NODE_ENV === 'production') {
    url = `https://hap.solutions/reset/${resetToken}`;
  } else {
    url = `http://localhost:3000/reset/${resetToken}`;
  }

  return url;
};

module.exports = forgotPassword;
