import React, { useEffect, useState } from "react";

const TodaysLogins = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch last sign-ins from the backend
  const fetchLastSignIns = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/last-sign-ins");
      if (!response.ok) throw new Error("Failed to fetch data");

      const data = await response.json();
      setUsers(data); // Assuming data is an array of users with name, email, and lastSignIn
    } catch (error) {
      console.error("Error fetching users:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLastSignIns(); // Fetch data on component mount
  }, []);

  // Function to format date to DD/MM/YYYY, HH:mm:ss
  const formatDate = (date) => {
    if (!date) return "Never";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(date).toLocaleString("en-GB", options); // British format for DD/MM/YYYY
  };

  return (
    <div>
      <h2>Last Sign-Ins</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Last Signed In</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="3">No sign-ins available</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.name || "N/A"}</td> {/* Display name or N/A if not available */}
                  <td>{user.email}</td>
                  <td>{formatDate(user.lastSignIn)}</td> {/* Display formatted date */}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TodaysLogins;
