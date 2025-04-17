const policeService = require("../services/police.services");
const { validationResult } = require("express-validator");

module.exports.registerPolice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, mobileNumber, email, password, badgeNumber, location } = req.body;

  try {
    const police = await policeService.createPolice({ name, mobileNumber, email, password, badgeNumber, location });
    res.status(201).json({ message: "Police officer registered successfully", police });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.loginPolice = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const police = await policeService.loginPolice(email, password);
    const token = police.generateAuthToken();
    res.status(200).json({ token, police });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.getPoliceProfile = async (req, res) => {
  try {
    const police = await policeService.getPoliceById(req.user._id);
    if (!police) {
      return res.status(404).json({ message: "Police officer not found" });
    }
    res.status(200).json(police);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports.logoutPolice = async (req, res) => {
  try {
    res.status(200).json({ message: "Police officer logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to log out" });
  }
};

module.exports.approvePolice = async (req, res) => {
  const { policeId } = req.params;

  try {
    const police = await policeService.getPoliceById(policeId);
    if (!police) {
      return res.status(404).json({ message: 'Police officer not found' });
    }

    police.verified = true; // Approve the police officer
    await police.save();

    res.status(200).json({ message: 'Police officer approved successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};