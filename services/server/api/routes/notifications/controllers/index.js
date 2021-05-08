const Notification = require('../model');

const deleteNotification = async (req, res, next) => {
  const { id } = req.params;

  try {
    let deletedNotification = await Notification.findByIdAndDelete(id);

    res.status(200).json({ notification: deletedNotification[0] });
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete notification' });
  }
};

module.exports = {
  deleteNotification,
};
