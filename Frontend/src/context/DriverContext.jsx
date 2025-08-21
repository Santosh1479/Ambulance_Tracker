import React, { createContext, useState, useContext, useEffect } from "react";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [driverDetails, setDriverDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem("driverDetails");
    if (storedDetails) {
      setDriverDetails(JSON.parse(storedDetails));
    }
  }, []);

  useEffect(() => {
    if (driverDetails) {
      localStorage.setItem("driverDetails", JSON.stringify(driverDetails));
    }
  }, [driverDetails]);

  return (
    <DriverContext.Provider value={{ driverDetails, setDriverDetails }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => useContext(DriverContext);