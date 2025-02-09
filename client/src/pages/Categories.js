import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Browse Categories</h2>
        <div className="row">
          {categories.map((c) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={c._id}>
              <div className="card shadow-sm border-light">
                <div className="card-body text-center">
                  <Link
                    to={`/category/${c.slug}`}
                    className="btn btn-outline-primary w-100 py-3"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "500",
                    }}
                  >
                    {c.name}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
