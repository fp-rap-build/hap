const express = require('express');
const Requests = require('./requestsModel');
const restrictTo = require('../../middleware/restrictTo');
const Addresses = require('../addresses/addr-model');
// Middlewares
const utils = require('./documents/utils');
//Email Middleware
const sendMessage = require('../../utils/sendGrid/middleware');
const { requestStatusChange } = sendMessage;
// Validators
const { validateRequestId } = require('./documents/validators');

// Controllers
const { getAllDocuments, createDocument } = require('./documents/controllers');

const { sendPayment } = require('./payments/controllers');

const { createAddress, updateAddress } = require('./address/controllers');
const { test } = require('../../../config/knexfile');

const io = require('../../../server');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const request = req.body;

    // Create a new address
    const addressInfo = request['address'] || {};
    const address = await Addresses.create(addressInfo);

    // Default to the current users ID if one isn't specified
    request['userId'] = request['userId'] || req.user.id;

    // Link the new address to the request
    request['addressId'] = address[0].id;

    // Remove the address before saving to db
    delete request['address'];

    const newRequest = await Requests.create(request);

    res.status(200).json(newRequest);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const allRequests = await Requests.findAll(req.user);

    res.status(200).json({ requests: allRequests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//View all active requests
router.get('/active', async (req, res) => {
  try {
    const resRequests = await Requests.findAllActive();
    res.status(200).json(resRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//Endpoint tailored for req table
//Updates to shape data should be done in model @ 'findForTable'
router.get('/table', async (req, res) => {

  try {
    const resRequests = await Requests.findForTable();
    res.status(200).json(resRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/find', async (req, res) => {
  const filter = req.body;
  try {
    const foundRequests = await Requests.findBy(filter);
    res.status(200).json(foundRequests);
  } catch (error) {
    console.log(error);
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
    const updatedRequest = await Requests.update(id, change);
    res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.route('/:id/address').all(validateRequestId).put(updateAddress);

router
  .route('/:id/documents')
  .all(validateRequestId)
  .post(createDocument)
  .get(getAllDocuments);

router.route('/:id/payments').all(validateRequestId).post(sendPayment);

module.exports = router;
