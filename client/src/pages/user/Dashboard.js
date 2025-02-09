import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - E-commerce App"}>
      <div className="container-fluid p-3 dashboard">
        <div className="row">
          {/* Sidebar: User Menu */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <div className="card shadow-sm">
              <UserMenu />
            </div>
          </div>

          {/* User Information */}
          <div className="col-12 col-md-9">
            <div className="card shadow-sm p-3">
              <div className="card-body">
                <h3 className="card-title mb-3">Welcome, {auth?.user?.name}</h3>
                <p>
                  <strong>Email:</strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Address:</strong> {auth?.user?.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional additional sections */}
        <div className="row mt-4">
          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Orders Overview</h5>
                <p className="card-text">View all your recent orders.</p>
                <a href="user/orders" className="btn btn-primary">
                  View Orders
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Account Settings</h5>
                <p className="card-text">Update your personal information.</p>
                <a href="user/profile" className="btn btn-secondary">
                  Edit Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
