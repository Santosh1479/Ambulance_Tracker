const hospitalService = require("../services/Hospitals.service");

module.exports.createHospital = async (req, res) => {
  try {
    const hospital = await hospitalService.createHospital(req.body);
    res.status(201).json({ message: "Hospital created successfully", hospital });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.updateHospital = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedHospital = await hospitalService.updateHospital(id, req.body);
    res.status(200).json({ message: "Hospital updated successfully", updatedHospital });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getAllHospitals = async (req, res) => {
  try {
    const hospitals = await hospitalService.getAllHospitals();
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};