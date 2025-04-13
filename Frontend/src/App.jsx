import React from "react";
import { Route, Routes } from "react-router-dom";
import AmbulanceLogin from "./pages/AmbulanceLogin";
import AmbulanceSignup from "./pages/AmbulanceSignup";
import Start from "./pages/Start";
import PoliceLogin from "./pages/PoliceLogin";
import PoliceSignup from "./pages/PoliceSignup";
import AmbulanceProtectWrapper from "./pages/ambulanceProtectWrapper";
import PoliceProtectWrapper from "./pages/policeProtectWrapper";
import AmbulanceHome from "./pages/AmbulanceDriverHome";
import PoliceHome from "./pages/PoliceHome";
import Navbar from "./components/Navbar";
import TripStart from "./pages/TripStart";
import UserHome from "./pages/UserHome";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<AmbulanceLogin />} />
        <Route path="/signup" element={<AmbulanceSignup />} />
        <Route path="/police-login" element={<PoliceLogin />} />
        <Route path="/police-signup" element={<PoliceSignup />} />
        <Route path="/trip" element={<TripStart />} />
        <Route path="/user-home" element={<UserHome />} />
        {/* Protected Routes */}
        <Route
          path="/ambulance-home"
          element={
            <AmbulanceProtectWrapper>
              <AmbulanceHome />
            </AmbulanceProtectWrapper>
          }
        />
        <Route
          path="/police-home"
          element={
            <PoliceProtectWrapper>
              <PoliceHome />
            </PoliceProtectWrapper>
          }
        />
      </Routes>
    </div>
  );
};

export default App;