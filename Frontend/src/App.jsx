import React from "react";
import { Route, Routes } from "react-router-dom";
import AmbulanceLogin from "./pages/AmbulanceLogin";
import AmbulanceSignup from "./pages/AmbulanceSignup";
import AmbulanceContext from "./context/AmbulanceContext";
import Start from "./pages/Start";
const App = () => {
  return (
    <AmbulanceContext>
      <div className="">
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/login" element={<AmbulanceLogin />} />
          <Route path="/signup" element={<AmbulanceSignup />} />
        </Routes>
      </div>
    </AmbulanceContext>
  );
};

export default App;
