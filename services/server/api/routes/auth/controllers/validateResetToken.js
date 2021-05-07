const User = require('../../users/userModel');

const crypto = require('crypto');

const validateResetToken = async (req, res, next) => {
  try {
    const { resetToken } = req.params;

    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    const user = await User.findBy({ passwordResetToken: hashedToken });

    if (user.length === 0) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (user[0].passwordResetExpires <= Date.now()) {
      return res.status(401).json({ message: 'Your token has expired' });
    }

    res.status(200).json('Your token is valid');
  } catch (error) {
      res.status(500).json({ message: "Unable to validate reset token" })
  }
};

module.exports = validateResetToken;
