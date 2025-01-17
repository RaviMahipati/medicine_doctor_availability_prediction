import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css'; // Importing the separate CSS file

function AuthPage() {
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate('/userlogin');
  };

  const handleStaffLogin = () => {
    navigate('/stafflogin');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Welcome to our app, experience the best experience!</h1>
        <div className="button-group">
          <button onClick={handleUserLogin} className="role-button">
            USER
          </button>
          <button onClick={handleStaffLogin} className="role-button">
            STAFF
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
