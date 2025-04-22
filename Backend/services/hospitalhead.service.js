const HospitalModel = require("../models/hospitalhead.model");

module.exports.createHospital = async ({ name, password }) => {
  const existingHospital = await HospitalModel.findOne({ name });
  if (existingHospital) {
    throw new Error("Hospital name already exists");
  }

  const hashedPassword = await HospitalModel.hashPassword(password);

  const hospital = await HospitalModel.create({
    name,
    password: hashedPassword,
  });

  return hospital;
};

module.exports.loginHospital = async (name, password) => {
  const hospital = await HospitalModel.findOne({ name }).select("+password");
  if (!hospital) {
    throw new Error("Invalid name or password");
  }

  const isMatch = await hospital.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid name or password");
  }

  return hospital;
};