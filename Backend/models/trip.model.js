const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver_name: String,
  vehicle_number: String,
  start_location: {
    lat: Number,
    lng: Number,
    address: String
  },
  end_location: {
    lat: Number,
    lng: Number,
    address: String
  },
  start_time: Date,
  end_time: Date,
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing'
  }
});

module.exports = mongoose.model('Trip', tripSchema);
