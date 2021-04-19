const Orgs = require('../org-model');

const validateOrgId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const org = await Orgs.findById(id);

    if (!org) {
      return res
        .status(404)
        .json({ message: `organization with id of ${id} does not exist` });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'unable to check if organization exists' });
  }
};

module.exports = {
  validateOrgId,
};
