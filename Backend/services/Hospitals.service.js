const Hospital = require("../models/Hospitals.model");

module.exports.createHospital = async (hospitalData) => {
  const { name, id, address, city, location } = hospitalData;

  if (!name || !id || !address || !city || !location || !location.latitude || !location.longitude) {
    throw new Error("All fields are required");
  }

  const existingHospital = await Hospital.findOne({ id });
  if (existingHospital) {
    throw new Error("Hospital with this ID already exists");
  }

  const hospital = await Hospital.create(hospitalData);
  return hospital;
};

module.exports.updateHospital = async (id, updateData) => {
  const hospital = await Hospital.findOneAndUpdate({ id }, updateData, { new: true });
  if (!hospital) {
    throw new Error("Hospital not found");
  }
  return hospital;
};

module.exports.getAllHospitals = async () => {
  const hospitals = await Hospital.find();
  return hospitals;
};