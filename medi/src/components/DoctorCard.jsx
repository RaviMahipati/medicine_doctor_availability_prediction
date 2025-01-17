import React from "react";
import "./DoctorCard.css"; // For styling

const DoctorCard = ({ imageUrl, link }) => {
  return (
    <div className="box" style={{ backgroundImage: `url(${imageUrl})` }}>
      <a href={link} />
    </div>
  );
};

export default DoctorCard;
