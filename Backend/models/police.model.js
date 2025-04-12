const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const policeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  mobileNumber: {
    type: Number,
    required: true,
    unique: true,
    minlength: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  badgeNumber: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
  },
});

policeSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

policeSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

policeSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Police = mongoose.model("Police", policeSchema);

module.exports = Police;