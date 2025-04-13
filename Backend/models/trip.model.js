const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  driver_name: {
    type: String,
    required: true,
  },
  vehicle_number: {
    type: String,
    required: true,
  },
  start_location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  end_location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
    address: {
      type: String,
    },
  },
  start_time: {
    type: Date,
    required: true,
  },
  end_time: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed'],
    default: 'ongoing',
  },
});

module.exports = mongoose.model('Trip', tripSchema);