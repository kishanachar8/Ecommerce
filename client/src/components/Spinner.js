import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (count === 0) {
      // Navigate when the countdown finishes
      navigate(`/${path}`, {
        state: { from: location.pathname }, // passing state to the next route
      });
    } else {
      // Set interval to decrement the count
      const interval = setInterval(() => {
        setCount((prevValue) => prevValue - 1);
      }, 1000);

      return () => clearInterval(interval); // Cleanup the interval on unmount or when count changes
    }
  }, [count, navigate, location, path]);

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="text-center">Redirecting to you in {count} second</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
