const AmbulanceDriverModel = require('../models/ambulancedriver.models');

module.exports.createAmbulanceDriver = async ({ name, dob, number, vehicleNumber, hospitalName, driverId, email, password }) => {
  if (!name || !dob || !number || !vehicleNumber || !hospitalName || !driverId || !email || !password) {
    throw new Error('All fields are required');
  }

  // Check if the email already exists
  const existingAmbulanceDriver = await AmbulanceDriverModel.findOne({ email });
  if (existingAmbulanceDriver) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await AmbulanceDriverModel.hashPassword(password);

  const AmbulanceDriver = await AmbulanceDriverModel.create({
    name,
    dob,
    number: Number(number),
    vehicleNumber,
    hospitalName,
    driverId,
    email,
    password: hashedPassword,
  });

  return AmbulanceDriver;
};

module.exports.loginAmbulanceDriver = async (email, password) => {
  const AmbulanceDriver = await AmbulanceDriverModel.findOne({ email }).select('+password');
  if (!AmbulanceDriver) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await AmbulanceDriver.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return AmbulanceDriver;
};

module.exports.getAmbulanceDriverById = async (AmbulanceDriverId) => {
  const AmbulanceDriver = await AmbulanceDriverModel.findById(AmbulanceDriverId);
  if (!AmbulanceDriver) {
    throw new Error('AmbulanceDriver not found');
  }
  return AmbulanceDriver;
};