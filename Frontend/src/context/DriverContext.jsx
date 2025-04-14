import React, { createContext, useState, useContext } from "react";

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [driverDetails, setDriverDetails] = useState(null);

  return (
    <DriverContext.Provider value={{ driverDetails, setDriverDetails }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => useContext(DriverContext);