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
    const token = AmbulanceDriver.generateAuthToken(); // Generate token after successful registration
    res.status(201).json({ message: "AmbulanceDriver registered successfully", token, AmbulanceDriver });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginAmbulanceDriver = async (req, res) => {
  const { email, password } = req.body;

  try {
    const driver = await AmbulanceDriverService.loginAmbulanceDriver(email, password);

    if (!driver) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = driver.generateAuthToken(); // Assuming a method to generate JWT token

    res.status(200).json({
      message: "Login successful",
      token,
      userID: driver._id,
      name: driver.name,
      vehicleNumber: driver.vehicleNumber,
      hospitalName: driver.hospitalName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
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