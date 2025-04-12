import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PoliceProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/police-login");
    }
  }, [token, navigate]);

  return <>{children}</>;
};

export default PoliceProtectWrapper;