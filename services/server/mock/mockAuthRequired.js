const mockAuthRequired = (req, res, next) => {
  return next();
};

module.exports = mockAuthRequired;
