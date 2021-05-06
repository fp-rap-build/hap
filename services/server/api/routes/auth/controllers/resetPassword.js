const User = require('../../users/userModel');

const crypto = require('crypto');

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;

  try {
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

    await User.findByIdAndUpdate(user[0].id, { password });

    res.status(200).json({ message: 'Your password has been updated' });
  } catch (error) {
    res.status(500).json({ message: 'Unable to reset password' });
  }
};

module.exports = resetPassword;
