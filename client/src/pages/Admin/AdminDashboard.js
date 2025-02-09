import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          {/* Admin Menu */}
          <div className="col-md-3 col-sm-12 mb-3">
            <AdminMenu />
          </div>

          {/* Admin Information */}
          <div className="col-md-9 col-sm-12">
            <div className="card p-3">
              <div className="card-body">
                <h3 className="card-title">Admin Dashboard</h3>
                <p>
                  <strong>Admin Name:</strong> {auth?.user?.name}
                </p>
                <p>
                  <strong>Admin Email:</strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Admin Contact:</strong> {auth?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
