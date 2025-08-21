import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDriverContext } from "../context/DriverContext";

const AmbulanceDriverHome = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [driverLocation, setDriverLocation] = useState({
    lat: null,
    lng: null,
  });
  const { driverDetails } = useDriverContext();

  // Fetch hospital data from the backend
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/hospitals/all`
        );
        const hospitals = res.data.map((hospital) => ({
          name: hospital.name,
          address: hospital.address,
          id: hospital._id,
        }));
        setAllDestinations(hospitals);
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };

    fetchHospitals();
  }, []);

  // Get driver's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDriverLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    const filtered = allDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(value.toLowerCase()) ||
        dest.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  const handleSelectDestination = (dest) => {
    setDestination(`${dest.name}, ${dest.address}`);
    setSelectedDestination(dest);
    setFilteredDestinations([]);
  };

  const handleStartRide = async () => {
    if (!selectedDestination) {
      alert("Please select a destination before starting the ride.");
      return;
    }
    if (!driverDetails) {
      alert("Driver details not found. Please log in again.");
      return;
    }
    if (!driverLocation.lat || !driverLocation.lng) {
      alert("Unable to fetch your current location.");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/trips/create-trip`,
        {
          destinationId: selectedDestination.id,
          driver_name: driverDetails.name, // <-- snake_case
          vehicle_number: driverDetails.vehicleNumber, // <-- snake_case
          hospitalName: driverDetails.hospitalName,
          start_location: {
            lat: driverLocation.lat,
            lng: driverLocation.lng,
            address: "Current Location",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Ride started successfully:", res.data);
      const tripId = res.data.trip._id; // Use trip._id from response

      navigate(`/trip/${tripId}`);
    } catch (error) {
      console.log({
        destinationId: selectedDestination.id,
        driverName: driverDetails.name,
        vehicleNumber: driverDetails.vehicleNumber,
        hospitalName: driverDetails.hospitalName,
        start_location: {
          lat: driverLocation.lat,
          lng: driverLocation.lng,
          address: "Current Location", // You can use a reverse geocoding API for actual address if needed
        },
      });
      console.error("Failed to start the ride:", error);
      alert(error.response?.data?.message || "Failed to start the ride");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ambulancedriver/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("driverDetails");
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to log out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1>Welcome, {driverDetails?.name}</h1>
      <div className="mt-2 text-sm text-gray-700">
        <strong>Your Location:</strong>{" "}
        {driverLocation.lat && driverLocation.lng
          ? `${driverLocation.lat}, ${driverLocation.lng}`
          : "Fetching..."}
      </div>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg"
      >
        Logout
      </button>

      <div className="relative mt-4 w-64">
        <input
          type="text"
          value={destination}
          onChange={handleInputChange}
          placeholder="Enter destination"
          className="w-full p-2 border rounded"
        />
        {filteredDestinations.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-40 overflow-y-auto">
            {filteredDestinations.map((dest, index) => (
              <li
                key={index}
                onClick={() => handleSelectDestination(dest)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {dest.name}, {dest.address}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleStartRide}
        className="mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-lg"
      >
        Start Ride
      </button>
    </div>
  );
};

export default AmbulanceDriverHome;
