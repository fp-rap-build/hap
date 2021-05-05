const Request = require('../requestsModel');

const getAllComments = async (req, res, next) => {
  const { id } = req.params;
  try {
    let comments = await Request.findAllComments(id);

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Unable to get comments' });
  }
};

module.exports = {
  getAllComments,
};
