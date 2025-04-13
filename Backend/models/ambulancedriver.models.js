const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const AmbulanceDriverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be longer"],
  },
  dob: {
    type: Date,
    required: true,
  },
  number: {
    type: Number,
    required: true,
    unique: true,
    minlength: [10, "Phone number must be valid"],
  },
  vehicleNumber: {
    type: String,
    required: true,
    unique: true,
  },
  hospitalName: {
    type: String,
    required: true,
  },
  driverId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

AmbulanceDriverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

AmbulanceDriverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

AmbulanceDriverSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const AmbulanceDriverModel = mongoose.model("ambulancedriver", AmbulanceDriverSchema);

module.exports = AmbulanceDriverModel;