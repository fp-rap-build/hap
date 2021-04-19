const express = require('express');
const router = express.Router();
// Controllers
const { loginUser, registerUser } = require('./controllers');

// Validators
const { validateRegistration, validateLogin } = require('./validators');

// Routes
router.post('/login', validateLogin, loginUser);

router.post('/register', validateRegistration, registerUser);

module.exports = router;
