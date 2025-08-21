import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDriverContext } from "../context/DriverContext";


export default function AmbulanceLogin() {
  const [formData, setFormData] = useState({
    email: "test@driver.com",
    password: "testpass",
  });

  const navigate = useNavigate();
  const { setDriverDetails } = useDriverContext();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/ambulancedriver/login`, formData);
      const { token, userID, name, vehicleNumber, hospitalName } = res.data;

      // Store token in localStorage (only token)
      localStorage.setItem("token", token);

      // After successful login/signup
      setDriverDetails({ userID, name, vehicleNumber, hospitalName });
      localStorage.setItem("driverDetails", JSON.stringify({ userID, name, vehicleNumber, hospitalName }));
      alert(res.data.message);
      navigate("/ambulance-home");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Ambulance Driver Login
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
            className="mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}