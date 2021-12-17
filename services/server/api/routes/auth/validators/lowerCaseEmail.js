const lowerCaseEmail = (req, res, next) => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  if (req.body.landlordEmail) {
    req.body.landlordEmail = req.body.landlordEmail.toLowerCase();
  }

  next();
};

module.exports = lowerCaseEmail;
