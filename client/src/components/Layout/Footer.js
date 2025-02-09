import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          {/* Left Column */}
          <div className="col-12 col-md-6 text-center text-md-start">
            <h5>&copy; 2025 Kishan Kumar. All Rights Reserved.</h5>
          </div>

          {/* Right Column */}
          <div className="col-12 col-md-6 text-center text-md-end mt-3 mt-md-0">
            <Link to="/about" className="text-white mx-2">
              About
            </Link>
            |
            <Link to="/contact" className="text-white mx-2">
              Contact
            </Link>
            |
            <Link to="/policy" className="text-white mx-2">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
