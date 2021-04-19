const Addr = require('../addr-model');

exports.getAllAddresses = async (req, res) => {
  try {
    const addrs = await Addr.findAll();
    res.status(200).json(addrs);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.createAddress = async (req, res) => {
  const newAddr = req.body;
  try {
    const addedAddr = await Addr.create(newAddr);
    res.status(200).json(addedAddr);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.getAddressById = async (req, res) => {
  const { id } = req.params;

  try {
    const addr = await Addr.findById(id);
    res.status(200).json(addr);
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};

exports.updateAddressById = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const updated = await Addr.update(id, changes);
    res.status(200).json({ address: updated[0] });
  } catch (err) {
    res.status(500).json({ errorMessage: err });
  }
};
