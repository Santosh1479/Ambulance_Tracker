const AmbulanceDriverService = require('../services/ambulancedriver.service');
const { validationResult } = require('express-validator');

module.exports.registerAmbulanceDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, dob, number, vehicleNumber, hospitalName, driverId, email, password } = req.body;

  try {
    const AmbulanceDriver = await AmbulanceDriverService.createAmbulanceDriver({ name, dob, number, vehicleNumber, hospitalName, driverId, email, password });
    res.status(201).json({ message: "AmbulanceDriver registered successfully", AmbulanceDriver });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginAmbulanceDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const AmbulanceDriver = await AmbulanceDriverService.loginAmbulanceDriver(email, password);
    const token = AmbulanceDriver.generateAuthToken();
    res.status(200).json({ token, AmbulanceDriver });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAmbulanceDriverProfile = async (req, res) => {
  try {
    const AmbulanceDriver = await AmbulanceDriverService.getAmbulanceDriverById(req.AmbulanceDriver._id);
    if (!AmbulanceDriver) {
      return res.status(404).json({ message: 'AmbulanceDriver not found' });
    }
    res.status(200).json(AmbulanceDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutAmbulanceDriver = async (req, res) => {
  try {
    res.status(200).json({ message: "AmbulanceDriver logged out successfully" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Failed to log out" });
  }
};
