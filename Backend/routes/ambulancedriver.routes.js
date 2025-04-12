const express = require('express');
const router = express.Router();
const { body, check } = require("express-validator");
const AmbulanceDriverController = require('../controllers/ambulancedriver.controller');
const { authAmbulanceDriver } = require('../middlewares/auth.middleware');

router.post('/register', [
  check('name').notEmpty().withMessage('Name is required'),
  check('dob').notEmpty().withMessage('Date of birth is required'),
  check('number').isNumeric().withMessage('Phone number must be a valid number'),
  check('vehicleNumber').notEmpty().withMessage('Vehicle number is required'),
  check('hospitalName').notEmpty().withMessage('Hospital name is required'),
  check('driverId').notEmpty().withMessage('Driver ID is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], AmbulanceDriverController.registerAmbulanceDriver);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password is short'),
], AmbulanceDriverController.loginAmbulanceDriver);

router.get('/profile', authAmbulanceDriver, AmbulanceDriverController.getAmbulanceDriverProfile);
router.post('/logout', authAmbulanceDriver, AmbulanceDriverController.logoutAmbulanceDriver);

// 🚑 Trip routes
router.post('/start-trip', startTrip);
router.post('/end-trip', endTrip);
router.get('/trips-by-date', authAmbulanceDriver, AmbulanceDriverController.getTripsByDate);

module.exports = router;
