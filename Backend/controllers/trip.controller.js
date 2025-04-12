const Trip = require("../models/trip.model");

const startTrip = async (req, res) => {
  try {
    const { driver_name } = req.body;

    const newTrip = await Trip.create({
      driver_name,
      start_time: new Date(),
      status: "ongoing",
    });

    const io = req.app.get("io");
    io.emit("tripStarted", { trip: newTrip });

    res.status(201).json({ message: "Trip started", trip: newTrip });
  } catch (err) {
    res.status(500).json({ message: "Failed to start trip", error: err.message });
  }
};

const endTrip = async (req, res) => {
  try {
    const { tripId } = req.body;

    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { end_time: new Date(), status: "completed" },
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    const io = req.app.get("io");
    io.emit("tripEnded", { trip: updatedTrip });

    res.status(200).json({ message: "Trip ended", trip: updatedTrip });
  } catch (err) {
    res.status(500).json({ message: "Failed to end trip", error: err.message });
  }
};

module.exports = {
  startTrip,
  endTrip,
};
