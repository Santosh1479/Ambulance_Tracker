import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDriverContext } from "../context/DriverContext";

const AmbulanceSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    number: "",
    vehicleNumber: "",
    hospitalName: "",
    driverId: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { setDriverDetails } = useDriverContext();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ambulancedriver/register`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID); 
      setDriverDetails({ userID, name, vehicleNumber, hospitalName });// Store user ID
      alert(res.data.message);
      navigate("/ambulance-home"); // Navigate to ambulance home
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Register Ambulance Driver
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="input"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            type="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="input"
          />
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            placeholder="Vehicle Number"
            className="input"
          />
          <input
            type="text"
            name="hospitalName"
            value={formData.hospitalName}
            onChange={handleChange}
            required
            placeholder="Hospital Name"
            className="input"
          />
          <input
            type="text"
            name="driverId"
            value={formData.driverId}
            onChange={handleChange}
            required
            placeholder="Driver ID"
            className="input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="input"
          />

          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default AmbulanceSignup;