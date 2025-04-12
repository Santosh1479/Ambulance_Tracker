import React, { useState } from 'react';
import axios from 'axios';

const TripStart = () => {
  const [loading, setLoading] = useState(false);
  const [tripData, setTripData] = useState(null);
  const [error, setError] = useState("");

  const handleStartTrip = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/ambulance/start-trip",
        { driver_name: "John Doe" }, // Replace with actual driver name from storage/context
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTripData(response.data.trip);
    } catch (err) {
      console.error("Trip error:", err);
      setError("Could not start trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Start Ambulance Trip</h1>

      <button
        onClick={handleStartTrip}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={loading}
      >
        {loading ? "Starting..." : "Start Trip"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {tripData && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <p><strong>Trip ID:</strong> {tripData._id}</p>
          <p><strong>Driver:</strong> {tripData.driver_name}</p>
          <p><strong>Status:</strong> {tripData.status}</p>
          <p><strong>Start Time:</strong> {new Date(tripData.start_time).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default TripStart;
