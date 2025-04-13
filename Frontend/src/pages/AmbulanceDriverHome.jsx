import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AmbulanceDriverHome = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

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
          id: hospital._id, // Assuming each hospital has a unique _id
        }));
        setAllDestinations(hospitals);
      } catch (error) {
        console.error("Failed to fetch hospital data:", error);
      }
    };

    fetchHospitals();
  }, []);

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
      alert("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to log out");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDestination(value);

    // Filter the dropdown options based on the input
    const filtered = allDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(value.toLowerCase()) ||
        dest.address.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  const handleSelectDestination = (dest) => {
    setDestination(`${dest.name}, ${dest.address}`); // Set the selected destination in the input field
    setSelectedDestination(dest); // Save the selected destination
    setFilteredDestinations([]); // Clear the dropdown
  };

  const handleStartRide = async () => {
    if (!selectedDestination) {
      alert("Please select a destination before starting the ride.");
      return;
    }
  
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/trips/create-trip`,
        {
          destinationId: selectedDestination.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      const tripId = res.data._id; // Assuming the response contains the trip ID
      const destinationCoords = res.data.destinationCoords; // Assuming backend sends destination coordinates
      const driverCoords = res.data.driverCoords; // Assuming backend sends driver's initial coordinates
  
      navigate(`/trip/${tripId}`, {
        state: { driverCoords, destinationCoords },
      });
    } catch (error) {
      console.error("Failed to start the ride:", error);
      alert(error.response?.data?.message || "Failed to start the ride");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">
        Welcome to Ambulance Driver Dashboard
      </h1>
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