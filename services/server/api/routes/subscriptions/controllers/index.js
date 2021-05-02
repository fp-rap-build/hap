const Subscription = require('../model');

const createSubscription = async (req, res, next) => {
  const newSubscription = {
    requestId: req.body.requestId,
    userId: req.user.id,
  };

  try {
    let subscription = await Subscription.create(newSubscription);

    res.status(201).json({ subscription: subscription[0] });
  } catch (error) {
    res.status(500).json({ message: 'Unable to create subscription' });
  }
};

const deleteSubscription = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Subscription.findByIdAndDelete(id);

    res.status(200).json('Successfully deleted subscription');
  } catch (error) {
    res.status(500).json({ message: 'Unable to delete subscription' });
  }
};

module.exports = {
  createSubscription,
  deleteSubscription,
};
