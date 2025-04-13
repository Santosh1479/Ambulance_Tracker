const Police = require("../models/police.model");

module.exports.createPolice = async ({ name, mobileNumber, email, password, badgeNumber, location }) => {
  if (!name || !mobileNumber || !email || !password || !badgeNumber || !location) {
    throw new Error("All fields are required");
  }

  // Check if the email already exists
  const existingEmail = await Police.findOne({ email });
  if (existingEmail) {
    throw new Error("Email already exists");
  }

  // Check if the mobile number already exists
  const existingMobileNumber = await Police.findOne({ mobileNumber });
  if (existingMobileNumber) {
    throw new Error("Mobile number already exists");
  }

  // Check if the badge number already exists
  const existingBadgeNumber = await Police.findOne({ badgeNumber });
  if (existingBadgeNumber) {
    throw new Error("Badge number already exists");
  }

  const hashedPassword = await Police.hashPassword(password);

  const police = await Police.create({
    name,
    mobileNumber,
    email,
    password: hashedPassword,
    badgeNumber,
    location,
  });

  return police;
};

module.exports.loginPolice = async (email, password) => {
  const police = await Police.findOne({ email }).select("+password");
  if (!police) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await police.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  return police;
};

module.exports.getPoliceById = async (policeId) => {
  const police = await Police.findById(policeId);
  if (!police) {
    throw new Error("Police officer not found");
  }
  return police;
};