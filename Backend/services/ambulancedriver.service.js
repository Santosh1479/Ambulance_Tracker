const AmbulanceDriverModel = require('../models/ambulancedriver.models');

module.exports.createAmbulanceDriver = async ({ name, dob, number, vehicleNumber, hospitalName, driverId, email, password }) => {
  if (!name || !dob || !number || !vehicleNumber || !hospitalName || !driverId || !email || !password) {
    throw new Error('All fields are required');
  }

  // Check if the email already exists
  const existingEmail = await AmbulanceDriverModel.findOne({ email });
  if (existingEmail) {
    throw new Error('Email already exists');
  }

  // Check if the mobile number already exists
  const existingNumber = await AmbulanceDriverModel.findOne({ number });
  if (existingNumber) {
    throw new Error('Mobile number already exists');
  }

  // Check if the vehicle number already exists
  const existingVehicleNumber = await AmbulanceDriverModel.findOne({ vehicleNumber });
  if (existingVehicleNumber) {
    throw new Error('Vehicle number already exists');
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