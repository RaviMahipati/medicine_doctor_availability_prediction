import React from 'react';
import { useNavigate } from 'react-router-dom';
import medpred from './medpred.jpg';
import doc from './docmod.jpg';
import med from './medmod.jpg';

const Staffdashboard = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="image-buttons-container" style={styles.container}>
      <h1 style={styles.header}>Staff Dashboard</h1>
      <div style={styles.grid}>
        {/* Check Medicine Availability */}
        <div
          style={styles.wrapper}
          onClick={() => handleNavigation('/medprediction')}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <img
            src={medpred}
            alt="Check Medicine Availability"
            style={styles.image}
          />
          <p style={styles.text}>Check Medicine Availability</p>
        </div>

        {/* Doctor Details */}
        <div
          style={styles.wrapper}
          onClick={() => handleNavigation('/modifydoctor')}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <img
            src={doc}
            alt="Doctor Details"
            style={styles.image}
          />
          <p style={styles.text}>Doctor Details</p>
        </div>

        {/* Patient Details */}
        <div
          style={styles.wrapper}
          onClick={() => handleNavigation('/modifymed')}
          onMouseEnter={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
        >
          <img
            src={med}
            alt="Patient Details"
            style={styles.image}
          />
          <p style={styles.text}>Medicine Details</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', // Flexbox for centering
    flexDirection: 'column', // Stack the header and grid vertically
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    height: '100vh', // Full viewport height
    textAlign: 'center',
    padding: '20px',
    background: '#aed6d6',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)', // 3 buttons in one row
    gap: '20px', // Add spacing between buttons
    justifyContent: 'center', // Center the grid content horizontally
    alignItems: 'center', // Center the grid content vertically
  },
  wrapper: {
    textAlign: 'center',
    cursor: 'pointer',
  },
  image: {
    width: '150px',
    height: '150px',
    borderRadius: '25px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  text: {
    marginTop: '10px',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};

export default Staffdashboard;
