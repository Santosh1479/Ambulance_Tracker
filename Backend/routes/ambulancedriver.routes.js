const express = require('express');
const router = express.Router();
const { body, check } = require("express-validator");
const AmbulanceDriverController = require('../controllers/ambulancedriver.controller');
const { authAmbulanceDriver } = require('../middlewares/auth.middleware');

// Registration route
router.post('/register', [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('dob').not().isEmpty().withMessage('Date of birth is required'),
  check('number').isNumeric().withMessage('Phone number must be a valid number'), // Updated validation
  check('vehicleNumber').not().isEmpty().withMessage('Vehicle number is required'),
  check('hospitalName').not().isEmpty().withMessage('Hospital name is required'),
  check('driverId').not().isEmpty().withMessage('Driver ID is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], AmbulanceDriverController.registerAmbulanceDriver);

// Login route
router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password is short'),
], AmbulanceDriverController.loginAmbulanceDriver);

// Profile route
router.get('/profile', authAmbulanceDriver, AmbulanceDriverController.getAmbulanceDriverProfile);

// Logout route
router.post('/logout', authAmbulanceDriver, AmbulanceDriverController.logoutAmbulanceDriver);

module.exports = router;