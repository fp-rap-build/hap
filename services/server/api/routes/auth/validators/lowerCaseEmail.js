const lowerCaseEmail = (req, res, next) => {
  console.log('lowerCaseEmail REQ.BODY: ', req);
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase();
  }

  next();
};

module.exports = lowerCaseEmail;
