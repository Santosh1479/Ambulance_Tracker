const hospitalService = require("../services/hospitalhead.service");
const { validationResult } = require("express-validator");

module.exports.registerHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, password } = req.body;

  try {
    const hospital = await hospitalService.createHospital({ name, password });
    res.status(201).json({ message: "Hospital registered successfully", hospital });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginHospital = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, password } = req.body;

  try {
    const hospital = await hospitalService.loginHospital(name, password);
    const token = hospital.generateAuthToken();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};