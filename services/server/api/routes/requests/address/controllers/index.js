const Addresses = require('../../../addresses/addr-model');

const Requests = require('../../requestsModel');

exports.updateAddress = async (req, res) => {
  const { id } = req.params;
  newAddress = req.body;
  try {
    let request = await Requests.findBy({ id });
    request = request[0];

    // Create the address if it doesn't exist
    if (!request.addressId) {
      const address = await Addresses.create(req.body);

      await Requests.update(id, { addressId: address[0].id });

      return res.json(address[0]);
    }

    let { addressId } = request;
    let address = await Addresses.update(addressId, newAddress);

    res.status(200).json({ address: address[0] });
  } catch (error) {
    res.json('error');
  }
};

exports.getAddress = async (req, res) => {};
