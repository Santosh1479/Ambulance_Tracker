import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const PoliceLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/police/login`, formData);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userID", res.data.userID); // Store user ID
      alert("Login successful");
      navigate("/police-home"); // Navigate to police home
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Police Officer Login
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            className="mt-4 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/police-signup" className="text-green-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoliceLogin;