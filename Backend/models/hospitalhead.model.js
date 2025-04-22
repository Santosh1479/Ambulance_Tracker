const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Name must be longer"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

HospitalSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

HospitalSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

HospitalSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const HospitalModel = mongoose.model("hospital", HospitalSchema);

module.exports = HospitalModel;