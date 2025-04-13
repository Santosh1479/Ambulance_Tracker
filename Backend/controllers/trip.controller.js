const Trip = require("../models/trip.model");

// Create a new trip
const startTrip = async (req, res) => {
  try {
    const { driver_name, vehicle_number, start_location } = req.body;

    // Get the current date in 'YYYY-MM-DD' format
    const currentDate = new Date().toISOString().split('T')[0];

    // Save the trip in the database
    const newTrip = await Trip.create({
      driver_name,
      vehicle_number,
      start_location,
      start_time: new Date(),
      status: "ongoing",
      date: currentDate, // Save the date
    });

    res.status(201).json({ message: "Trip started successfully", trip: newTrip });
  } catch (err) {
    res.status(500).json({ message: "Failed to start trip", error: err.message });
  }
};

// End an ongoing trip
const endTrip = async (req, res) => {
  try {
    const { tripId, end_location } = req.body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      {
        end_location,
        end_time: new Date(),
        status: "completed",
      },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const io = req.app.get("io");
    io.emit("tripEnded", { trip: updatedTrip });

    res.status(200).json({ message: "Trip ended successfully", trip: updatedTrip });
  } catch (err) {
    res.status(500).json({ message: "Failed to end trip", error: err.message });
  }
};

// Get all ongoing trips
const getOngoingTrips = async (req, res) => {
  try {
    const ongoingTrips = await Trip.find({ status: "ongoing" });
    res.status(200).json(ongoingTrips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ongoing trips", error: err.message });
  }
};

// Get all trips
const getAllTrips = async (req, res) => {
  try {
    const allTrips = await Trip.find();
    res.status(200).json(allTrips);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all trips", error: err.message });
  }
};

module.exports = {
  startTrip,
  endTrip,
  getOngoingTrips,
  getAllTrips,
};