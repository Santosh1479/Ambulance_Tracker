const jwt = require('jsonwebtoken');
const AmbulanceDriverModel = require('../models/ambulancedriver.models');
const Police = require("../models/police.model");

module.exports.authAmbulanceDriver = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const ambulanceDriver = await AmbulanceDriverModel.findById(decoded._id);
    if (!ambulanceDriver) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.ambulanceDriver = ambulanceDriver;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports.authPolice = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const police = await Police.findById(decoded._id);
    if (!police) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = police;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};


module.exports.authHospitalPersonnel = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Assuming hospital personnel are stored in a separate model
    const hospitalPersonnel = await HospitalPersonnelModel.findById(decoded._id);
    if (!hospitalPersonnel) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = hospitalPersonnel;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};