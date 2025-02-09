import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import moment from "moment";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { API_URL } from "../../utils/config";
import "../../App.css";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  // Get all orders
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/v1/auth/all-orders`);
      console.log("Fetched orders:", data); // Debug log
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  // Handle status change
  const handleChange = async (orderId, value) => {
    try {
      console.log("Order ID:", orderId, "New Status:", value); // Debug log
      await axios.put(`${API_URL}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      console.log("Status updated successfully.");
      getOrders(); // Refresh orders to get the updated status
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Layout title="All Orders">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center mb-4">All Orders</h1>
            {/* Orders Table */}
            {orders?.length ? (
              orders.map((order, index) => (
                <div className="border shadow mb-3" key={order._id}>
                  <table className="table table-sm table-responsive">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Quantity</th>
                        <th>Total</th> {/* Added Total */}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(order._id, value)}
                            value={order?.status} // Use value instead of defaultValue
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>{order?.payment.success ? "Success" : "Failed"}</td>
                        <td>
                          {order?.products?.reduce(
                            (total, item) => total + item.quantity,
                            0
                          )}
                        </td>{" "}
                        {/* Total Quantity */}
                        <td>
                          ₹
                          {order?.products?.reduce(
                            (total, item) => total + item.price * item.quantity,
                            0
                          )}
                        </td>
                        {/* Total Price */}
                      </tr>
                    </tbody>
                  </table>

                  {/* Product Details */}
                  <div className="container">
                    {order?.products?.map((orderProduct) => (
                      <div
                        className="row mb-2 p-3 card flex-row"
                        key={orderProduct._id}
                      >
                        <div className="col-md-4">
                          <img
                            src={`${API_URL}/api/v1/product/product-photo/${orderProduct.product}`}
                            className="card-img-top p-2 responsive-product-image"
                            alt={orderProduct.product.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{orderProduct.name}</p>
                          <p>
                            {orderProduct.description
                              ? orderProduct.description.substring(0, 30)
                              : "No description available."}
                            ...
                          </p>
                          <p>Price:₹ {orderProduct.price}</p>
                          <p>Quantity: {orderProduct.quantity}</p>{" "}
                          {/* Product Quantity */}
                          <p>
                            Total:₹
                            {orderProduct.price * orderProduct.quantity}
                          </p>
                          {/* Total Price per Product */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
