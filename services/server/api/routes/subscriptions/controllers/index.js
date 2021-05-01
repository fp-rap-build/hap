const createSubscription = async (req, res, next) => {
  try {
    res.send('working');
  } catch (error) {}
};

const deleteSubscription = async (req, res, next) => {
  try {
    res.send('working');
  } catch (error) {}
};

module.exports = {
  createSubscription,
  deleteSubscription,
};
