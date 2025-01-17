import React from 'react';
import './Dashboard.css'; // Import the CSS file for styling
import doc from './doctorimage.png'; // Import the image
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    // Function to navigate to /home
    // const handleImageClick = () => {
    //     window.location.href = '/home';
    // };
    const navigate = useNavigate();

    return (
        <div>
            {/* Hero Section */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "2rem",
                backgroundColor: "#f5f5f5",
                height: "60vh",
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    maxWidth: "1200px",
                    width: "100%",
                    gap: "2rem",
                    alignItems: "center",
                }}>
                    <div style={{ flex: 1 }}>
                        <h1 style={{ fontSize: "2.5rem", color: "#333" }}>
                            Welcome to Your Dashboard
                        </h1>
                        <p style={{ fontSize: "1.1rem", color: "#666", margin: "1rem 0" }}>
                            Stay updated with your recent activities, insights, and progress. Customize your experience to suit your needs.
                        </p>
                        <button
                            style={{
                                padding: "0.75rem 1.5rem",
                                fontSize: "1rem",
                                color: "#fff",
                                backgroundColor: "#007bff",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
                            onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
                            onClick={() => navigate("/home")}
                        >
                            Get Started

                        </button>
                    </div>
                    <div style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <img
                            src={doc} // Using your imported image for the hero section
                            alt="Dashboard illustration"
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: "10px",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Existing Dashboard Content */}
            {/* <div className="page-container">
                <div className="center-content">
                    <button
                        className="image-button"
                        onClick={handleImageClick}
                    >
                        <img
                            src={doc}
                            alt="Dashboard Button"
                            className="button-image"
                        />
                    </button>
                    <p className="button-text">Predict Doctor Availability</p>
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;