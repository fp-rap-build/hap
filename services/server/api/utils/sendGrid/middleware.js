const messages = require('./messages');

const requestStatusChange = (req, res, next) => {
  const { requestStatus, email } = req.body;

  if (email) {
    messages.requestStatusChange(requestStatus, email);
    delete req.body.email;
  }
  next();
};

module.exports = { requestStatusChange };
