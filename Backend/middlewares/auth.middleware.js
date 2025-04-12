const jwt = require('jsonwebtoken');
const AmbulanceDriverModel = require('../models/ambulancedriver.models');


module.exports.authAmbulanceDriver = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log('Authorization Header:', req.headers.authorization);

    const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the AmbulanceDriver in the database
    const AmbulanceDriver = await AmbulanceDriverModel.findById(decoded._id);
    if (!AmbulanceDriver) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    // Attach the AmbulanceDriver to the request object
    req.AmbulanceDriver = AmbulanceDriver;
    next();
  } catch (error) {
    console.error('Error in authAmbulanceDriver middleware:', error);
    res.status(401).json({ message: 'Invalid token.' });
  }
};
