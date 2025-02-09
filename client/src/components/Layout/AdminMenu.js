import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="container mt-4">
      {/* Admin Menu Section */}
      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center">Admin Panel</h4>
          <div className="list-group">
            {/* Create Category Link */}
            <NavLink
              to="/dashboard/admin/create-category"
              className="list-group-item list-group-item-action"
            >
              Create Category
            </NavLink>
            {/* Create Product Link */}
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action"
            >
              Create Product
            </NavLink>
            {/* Products Link */}
            <NavLink
              to="/dashboard/admin/products"
              className="list-group-item list-group-item-action"
            >
              Products
            </NavLink>
            {/* Orders Link */}
            <NavLink
              to="/dashboard/admin/orders"
              className="list-group-item list-group-item-action"
            >
              Orders
            </NavLink>
            {/* Users Link (commented out) */}
            {/* <NavLink
              to="/dashboard/admin/users"
              className="list-group-item list-group-item-action"
            >
              Users
            </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
