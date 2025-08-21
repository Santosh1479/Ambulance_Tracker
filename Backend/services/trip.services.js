const Trip = require("../models/trip.model");

module.exports.createTrip = async ({ driver_name, vehicle_number, start_location }) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const trip = await Trip.create({
    driver_name,
    vehicle_number,
    start_location,
    start_time: new Date(),
    status: "ongoing",
    date: currentDate,
  });
  return trip;
};

module.exports.endTrip = async (tripId, end_location) => {
  const updatedTrip = await Trip.findByIdAndUpdate(
    tripId,
    {
      end_location,
      end_time: new Date(),
      status: "completed",
    },
    { new: true }
  );
  return updatedTrip;
};

module.exports.getOngoingTrips = async () => {
  return await Trip.find({ status: "ongoing" });
};

module.exports.getAllTrips = async () => {
  return await Trip.find();
};