import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PoliceHome = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/police/logout`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      alert("Logged out successfully");
      navigate("/police-login");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to log out");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome to Police Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default PoliceHome;