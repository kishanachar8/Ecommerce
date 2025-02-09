import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Page Not Found - Go Back"}>
      <div
        className="container-fluid d-flex justify-content-center align-items-center p-5"
        style={{ minHeight: "100vh", backgroundColor: "#f7f7f7" }}
      >
        <div className="text-center">
          <h1 className="display-1 text-danger fw-bold">404</h1>
          <h2 className="h4 text-muted">Oops! Page Not Found</h2>
          <Link to="/" className="btn btn-primary btn-lg mt-4">
            Go Back to Home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
