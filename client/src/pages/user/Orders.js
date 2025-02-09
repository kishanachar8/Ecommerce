import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { API_URL } from "../../utils/config";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Orders
  // Fetch Orders with populated product details
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/auth/orders`);
      setOrders(data);
      console.log(data); // Check what data you receive
    } catch (error) {
      setError("Failed to load orders.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3 dashboard">
        <div className="row">
          {/* Sidebar - User Menu */}
          <div className="col-12 col-sm-12 col-md-3 mb-4 mb-md-0">
            <UserMenu />
          </div>

          {/* Orders Details */}
          <div className="col-12 col-sm-12 col-md-9">
            <h1 className="text-center">All Orders</h1>
            {orders?.map((o, i) => (
              <div key={o._id} className="border shadow mb-4 p-3 rounded">
                <h5>Order #{i + 1}</h5>
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="container">
                  {o?.products?.map((p, idx) => (
                    <div
                      className="row mb-2 card p-3"
                      key={`${o._id}-${p._id}-${idx}`}
                    >
                      <div className="col-4 col-md-9">
                        <div className="d-flex align-items-start">
                          {/* Image Section */}
                          <div className="col-md-4">
                            <img
                              src={`${API_URL}/api/v1/product/product-photo/${p.product}`}
                              alt={p.product}
                              className="card-img-top p-2 responsive-product-image"
                              style={{ height: "100px", width: "100px" }}
                            />
                          </div>

                          {/* Content Section */}
                          <div className="">
                            <p className="fw-bold mb-1">{p.products}</p>
                            <p className="fw-bold mb-1">
                              {p.name.substring(0, 100)}...
                            </p>
                            <p className="mb-1">
                              {p.description.substring(0, 30)}...
                            </p>
                            <p className="mb-1">Price: ₹{p?.price}</p>
                            <p>Quantity: {p?.quantity}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
