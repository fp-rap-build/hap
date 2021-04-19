const Users = require('../../userModel');

exports.getUserAddressById = async (req, res) => {
  let { id } = req.params;
  try {
    let address = await Users.findAddressByUserId(id);
    res.status(200).json({ address: address[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCurrentUserAddress = async (req, res) => {
  let { id } = req.user;

  // Make it impossible to update the id
  req.body['id'] = undefined;

  let payload = req.body;

  try {
    let user = await Users.findById(id);

    let updatedAddress = await Users.updateAddressById(user.addressId, payload);

    res.status(200).json({ address: updatedAddress[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
