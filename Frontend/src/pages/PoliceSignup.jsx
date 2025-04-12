import React, { useState } from "react";
import axios from "axios";

const PoliceSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
    badgeNumber: "",
    location: {
      longitude: "",
      latitude: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "longitude" || name === "latitude") {
      setFormData({
        ...formData,
        location: { ...formData.location, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/police/register`, formData);
      alert(res.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Police Officer Signup
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
            type="number"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            required
            placeholder="Mobile Number"
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
          <input
            type="text"
            name="badgeNumber"
            value={formData.badgeNumber}
            onChange={handleChange}
            required
            placeholder="Badge Number"
            className="input"
          />
          <input
            type="number"
            name="longitude"
            value={formData.location.longitude}
            onChange={handleChange}
            required
            placeholder="Longitude"
            className="input"
          />
          <input
            type="number"
            name="latitude"
            value={formData.location.latitude}
            onChange={handleChange}
            required
            placeholder="Latitude"
            className="input"
          />

          <button
            type="submit"
            className="mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default PoliceSignup;