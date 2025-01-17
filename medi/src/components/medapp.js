import React from "react";

const StreamlitEmbed1 = () => {
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <iframe
                src="http://localhost:8504" // Replace with deployed Streamlit app URL
                width="100%"
                height="100%"
                frameBorder="0"
            ></iframe>
        </div>
    );
};

export default StreamlitEmbed1;
