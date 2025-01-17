import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React from 'react';

// Importing components
import ULoginSignup from './components/login';
import StreamlitEmbed from "./components/StreamlitEmbed";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import StaffLoginSignup from './components/stafflogin';
import TodaysLogins from './components/checklogins';
import StreamlitEmbed1 from './components/medapp';
import ModifyMedCSV from './components/modifymed';
import AuthPage from './components/AuthPage';
import Staffdashboard from './components/staffdash';
import Modifydoc from './components/modifydoc';
import Navbar from './components/navbar';
import StaffNavbar from './components/navbarstaff'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/" element={<AuthPage />} />
        <Route path="/userlogin" element={<ULoginSignup />} />
        <Route path="/stafflogin" element={<StaffLoginSignup />} />

        {/* Routes with Navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/home" element={<StreamlitEmbed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logins" element={<TodaysLogins />} />
        </Route>

        {/* Routes with StaffNavbar */}
        <Route element={<LayoutWithStaffNavbar />}>
          <Route path="/medprediction" element={<StreamlitEmbed1 />} />
          <Route path="/modifymed" element={<ModifyMedCSV />} />
          <Route path="/staffdashboard" element={<Staffdashboard />} />
          <Route path="/modifydoctor" element={<Modifydoc />} />
        </Route>
      </Routes>
    </Router>
  );
}

const LayoutWithNavbar = () => {
  const location = useLocation();

  // Hide Navbar for authentication routes
  if (location.pathname === "/" || location.pathname === "/userlogin" || location.pathname === "/stafflogin") {
    return null; // No Navbar for auth routes
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<StreamlitEmbed />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logins" element={<TodaysLogins />} />
      </Routes>
    </div>
  );
};

const LayoutWithStaffNavbar = () => {
  return (
    <div>
      <StaffNavbar />
      <Routes>
        <Route path="/medprediction" element={<StreamlitEmbed1 />} />
        <Route path="/modifymed" element={<ModifyMedCSV />} />
        <Route path="/staffdashboard" element={<Staffdashboard />} />
        <Route path="/modifydoctor" element={<Modifydoc />} />
      </Routes>
    </div>
  );
};

export default App;
