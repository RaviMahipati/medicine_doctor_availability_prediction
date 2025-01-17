import React from "react";
import DoctorCard from "./DoctorCard";

const HomePage = () => {
  return (
    <div className="container">
      <DoctorCard 
        imageUrl="https://m.media-amazon.com/images/W/MEDIAX_792452-T1/images/I/410Rvb5mM+L._AC_UF894,1000_QL80_.jpg"
        link="http://127.0.0.1:8502"
      />
      <DoctorCard 
        imageUrl="https://i.pinimg.com/736x/16/f6/85/16f685779bf7c3a22690dc6f6a45c2ba.jpg"
        link="http://192.168.43.85:8502"
      />
    </div>
  );
};

export default HomePage;
