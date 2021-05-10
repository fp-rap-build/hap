const Subscription = require('../model');

const checkIfUserIsAlreadySubscribed = async (req, res, next) => {
  let query = {
    requestId: req.body.requestId,
    userId: req.user.id,
  };

  try {
    let subscription = await Subscription.findBy(query);

    if (subscription.length === 0) return next();

    res.status(400).json("You're already subscribed to this request");
  } catch (error) {
    res.status(500).json('Unable to check is user is already subscribed');
  }
};

module.exports = {
  checkIfUserIsAlreadySubscribed,
};
