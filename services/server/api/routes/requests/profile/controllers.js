const Profile = require('./model');

const Requests = require('../requestsModel');

const Documents = require('../documents/documentModel');

const Payments = require('../payments/model');

exports.getAllRequestInformation = async (req, res) => {
  let { id } = req.params;

  try {
    let request = await Requests.findById(id);

    let documents = await Documents.findAllByRequestId(id);

    let comments = await Requests.findAllComments(id);

    let payments = await Payments.findAllByRequestId(id);

    res.json({ request: request[0], documents, comments, payments: payments });
  } catch (error) {
    res.send('no');
  }
};
