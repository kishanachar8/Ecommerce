import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="container mt-4">
      {/* Dashboard Menu Section */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Dashboard</h4>
          <div className="list-group">
            {/* Profile Link */}
            <NavLink
              to="/dashboard/user/profile"
              className="list-group-item list-group-item-action"
            >
              Profile
            </NavLink>
            {/* Orders Link */}
            <NavLink
              to="/dashboard/user/orders"
              className="list-group-item list-group-item-action"
            >
              Orders
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
