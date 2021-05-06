const express = require('express');
const router = express.Router();
// Controllers
const { loginUser, registerUser, forgotPassword, resetPassword } = require('./controllers');

// Validators
const { validateRegistration, validateLogin } = require('./validators');

// Routes
router.post('/login', validateLogin, loginUser);

router.post('/register', validateRegistration, registerUser);

router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword/:resetToken', resetPassword)


module.exports = router;
