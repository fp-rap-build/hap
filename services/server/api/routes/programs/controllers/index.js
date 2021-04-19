const Programs = require('../model');

const getAllPrograms = async (req, res, next) => {
  try {
    const allPrograms = await Programs.findAll();

    res.status(200).json({ programs: allPrograms });
  } catch (error) {
    res.status(500).json({ message: 'unable to get all programs' });
  }
};

const createProgram = async (req, res, next) => {
  const program = req.body;

  try {
    const newProgram = await Programs.create(program);

    res.status(201).json({ program: newProgram });
  } catch (error) {
    res.status(500).json({ message: 'unable to create program' });
  }
};
const getProgramById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const program = await Programs.findById(id);

    res.status(200).json({ program: program[0] });
  } catch (error) {
    res.status(500).json({ message: 'unable to get program by id' });
  }
  res.send('create program');
};

const updateProgramById = async (req, res, next) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const updatedProgram = await Programs.findByIdAndUpdate(id, payload);

    res.status(200).json({ program: updatedProgram[0] });
  } catch (error) {
    res.status(500).json({ message: 'unable to update program' });
  }
};
const deleteProgramById = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Programs.findByIdAndDelete(id);

    res.status(200).json({ message: 'Program deleted' });
  } catch (error) {
    res.status(500).json({ message: 'unable to delete program' });
  }
};

module.exports = {
  getAllPrograms,
  createProgram,
  getProgramById,
  updateProgramById,
  deleteProgramById,
};
