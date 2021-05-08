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

const viewNotification = async (req, res, next) => {
  const { id } = req.params;

  try {
    let notification = await Notification.findByIdAndUpdate(id, {
      seen: true,
    });

    res.status(200).json({ notification: notification[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Unable to view notification' });
  }
};

module.exports = {
  deleteNotification,
  viewNotification,
};
