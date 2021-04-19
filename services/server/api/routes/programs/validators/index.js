const Programs = require('../model');

const Orginizations = require('../../organizations/org-model');
const { updateProgramById } = require('../controllers');

const validateProgramId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const program = await Programs.findById(id);

    if (program.length !== 0) return next();

    res
      .status(404)
      .json({ message: `program with id of ${id} does not exist` });
  } catch (error) {
    res.status(500).json({ message: 'unable to validate program id' });
  }
};

// #TODO
// Use express-validator to validate the type of each field
const validateCreateProgram = async (req, res, next) => {
  const program = req.body;
  try {
    // validate required fields
    if (!program.name || !program.organizationId) {
      return res
        .status(400)
        .json({ message: 'name and organizationId is required' });
    }

    // validate orginization exists
    const orginization = await Orginizations.findById(program.organizationId);

    if (!orginization) {
      return res.status(404).json({
        message: `organization with id of ${program.organizationId} does not exist`,
      });
    }

    // Passed all checks, move on to the next middleware
    next();
  } catch (error) {
    res.status(500).json({ message: 'unable to validate create program' });
  }
};

const validateUpdateProgram = async (req, res, next) => {
  const updatedProgram = req.body;

  if (updatedProgram.organizationId) {
    return res
      .status(401)
      .json({ message: 'Cannot transfer a program to another organization' });
  }

  next();
};

module.exports = {
  validateProgramId,
  validateCreateProgram,
  validateUpdateProgram,
};
