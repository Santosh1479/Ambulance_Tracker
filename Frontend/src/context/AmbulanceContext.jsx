import React, { createContext, useState } from "react";

export const AmbulanceDataContext = createContext();

const AmbulanceContext = ({ children }) => {
  const [Ambulance, setAmbulance] = useState({
    id: "",
    email: "",
    fullname: {
      firstname: "",
      lastname: "",
    },
  });

  return (
    <AmbulanceDataContext.Provider value={{ Ambulance, setAmbulance }}>
      {children}
    </AmbulanceDataContext.Provider>
  );
};

export default AmbulanceContext;