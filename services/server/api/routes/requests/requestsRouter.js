const express = require('express');
const Requests = require('./requestsModel');
const Ages = require('../ages/agesModel');
const restrictTo = require('../../middleware/restrictTo');
const updateRequestActivity = require('../../middleware/updateRequestActivity')
const Addresses = require('../addresses/addr-model');
// Middlewares
const utils = require('./documents/utils');
//Email Middleware
const sendMessage = require('../../utils/sendGrid/middleware');
const { requestStatusChange } = sendMessage;
// Validators
const { validateRequestId } = require('./documents/validators');

// Controllers

const { createRequest } = require('./controllers');

const {
  getAllDocuments,
  createDocument,
  updateDocument,
} = require('./documents/controllers');

const { sendPayment } = require('./payments/controllers');

const { updateAddress } = require('./address/controllers');

const { getAllComments } = require('./comments');
const {
  sendPromiseToPayEmail,
  sendConfirmationOfApproval,
} = require('../../utils/sendGrid/messages');

const router = express.Router();

router.post('/', createRequest);

router.get('/', async (req, res) => {
  try {
    const allRequests = await Requests.findAll(req.user);

    res.status(200).json({ requests: allRequests });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//View all active requests
router.get('/active', async (req, res) => {
  try {
    const resRequests = await Requests.findAllActive();
    res.status(200).json(resRequests);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Endpoint tailored for req table
//Updates to shape data should be done in model @ 'findForTable'
router.get('/table', async (req, res) => {
  try {
    const resRequests = await Requests.findForTable(req.query);
    res.status(200).json(resRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/reqOnly/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const foundRequest = await Requests.requestOnlyById(id);
    res.status(200).json(foundRequest);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const request = await Requests.findById(id);
    res.status(200).json({ request: request[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/:id', requestStatusChange, async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  try {
    let request = await Requests.findById(id);
    request = request[0];

    if (change['requestStatus'] === 'approved') {
      sendPromiseToPayEmail(request, request.landlordEmail);
      sendConfirmationOfApproval(request);
    }

    const updatedRequest = await Requests.update(id, change);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    await Requests.removeAllCommentsByRequestId(id);
    await Requests.remove(id);

    res
      .status(200)
      .json({ message: `Requests with id: ${id} succesfully deleted` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route('/:id/address').all(validateRequestId).put(updateAddress);

router
  .route('/:id/documents')
  .all(validateRequestId)
  .post(createDocument)
  .get(getAllDocuments)
  .put(updateDocument);

router.route('/:id/payments').all(validateRequestId).post(sendPayment);

router.route('/:id/comments').all(validateRequestId).get(getAllComments);

module.exports = router;
