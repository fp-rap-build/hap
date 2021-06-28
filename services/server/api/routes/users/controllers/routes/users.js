const Users = require('../../userModel');

exports.getAllUsers = async (req, res) => {
  try {
    let users = await Users.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    // Create user

    const newUser = await Users.create(req.body);

    // hide password

    newUser[0]['password'] = undefined;

    // Send back the newly created user

    res.status(201).json({
      user: newUser[0],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

exports.getUserById = (req, res) => {
  const id = String(req.params.id);
  Users.findById(id)
    .then((profile) => {
      if (profile) {
        res.status(200).json(profile);
      } else {
        res.status(404).json({ error: 'ProfileNotFound' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
};

exports.updateUserById = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, payload);
    res.status(200).json({ user: updatedUser[0] });
  } catch (error) {
    res.status(500).json({ message: 'Internal service error' });
  }
};

exports.deleteUserById = (req, res) => {
  const { id } = req.params;
  try {
    Users.findById(id).then((profile) => {
      Users.remove(profile.id).then(() => {
        res
          .status(200)
          .json({ message: `Profile '${id}' was deleted.`, profile });
      });
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete profile with ID: ${id}`,
      error: err.message,
    });
  }
};

exports.getAllStaffUsers = async (req, res) => {
  try {
    let staff = await Users.findAllStaff(req.user.role);

    res.status(200).json({ staff });
  } catch (error) {
    res.status(500).json({ message: 'Internal service error' });
    console.log(error);
  }
};
