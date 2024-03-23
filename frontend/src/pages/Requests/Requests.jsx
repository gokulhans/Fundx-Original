import React, { useState, useEffect } from "react";
import axiosClient from "@/util/axios";

const Requests = ({ userId }) => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        // Fetch connections associated with the user ID
        let response;
        if (localStorage.getItem("type") === "investor") {
          response = await axiosClient.get(
            `/connect/investor/${localStorage.getItem("typeid")}`
          );
        } else {
          response = await axiosClient.get(
            `/connect/startup/${localStorage.getItem("typeid")}`
          );
        }

        setConnections(response.data); // Assuming response.data is an array of connections
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, [userId]); // Trigger the effect whenever the user ID changes

  return (
    <div>
      <h2>Connection Requests</h2>
      <ul>
        {connections.map((connection) => (
          <li key={connection._id}>
            {/* Display connection details */}
            {/* For example: */}
            <p>Investor: {connection.investor.firstname}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
