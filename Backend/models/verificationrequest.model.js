const mongoose = require("mongoose");

const VerificationRequestSchema = new mongoose.Schema({
  userType: {
    type: String,
    enum: ["ambulanceDriver", "police"], // Specify the type of user
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  // Fields specific to ambulance drivers
  vehicleNumber: {
    type: String,
    required: function () {
      return this.userType === "ambulanceDriver";
    },
  },
  hospitalName: {
    type: String,
    required: function () {
      return this.userType === "ambulanceDriver";
    },
  },
  // Fields specific to police officers
  badgeNumber: {
    type: String,
    required: function () {
      return this.userType === "police";
    },
  },
  stationLocation: {
    type: String,
    required: function () {
      return this.userType === "police";
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VerificationRequestModel = mongoose.model("VerificationRequest", VerificationRequestSchema);

module.exports = VerificationRequestModel;