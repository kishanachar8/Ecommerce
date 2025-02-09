import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { API_URL } from "../../utils/config";
import Spinner from "../../components/Spinner"; // Assuming you have a Spinner component for loading states

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track error

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/product/get-product`);
      setProducts(data.products);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      setError("Something went wrong");
      setLoading(false); // Set loading to false even in case of error
      toast.error("Something went wrong");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    getAllProducts();
  }, []);

  if (loading) {
    return <Spinner />; // Show a spinner component while data is being loaded
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-12 col-md-3 ">
            <AdminMenu />
          </div>
          <div className="col-12 col-md-9">
            <h1 className="text-center">All Products List</h1>
            {error && <div className="alert alert-danger">{error}</div>}{" "}
            {/* Display error if there's one */}
            {products?.length === 0 ? (
              <p className="text-center">No products found</p> // Display a message if no products are found
            ) : (
              <div className="row">
                {products?.map((p) => (
                  <div
                    key={p._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
                  >
                    <Link
                      to={`/dashboard/admin/product/${p.slug}`}
                      className="product-link w-100"
                    >
                      <div className="card h-100 shadow-sm product-card">
                        <img
                          src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top p-1"
                          alt={p.name}
                          style={{ objectFit: "contain", height: "200px" }}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            {p.name.substring(0, 20)}
                          </h5>
                          <p className="card-text">
                            {p.description.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
