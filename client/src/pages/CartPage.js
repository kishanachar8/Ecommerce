import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../utils/config";
import "../App.css";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate the total price of the cart
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.error("Error calculating total price:", error);
      return "₹0";
    }
  };

  // Remove an item from the cart
  const removeCartItem = (pid) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Fetch the payment token from Braintree
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error("Error fetching payment token:", error);
      toast.error("Failed to initialize payment");
    }
  };

  // Handle payment using Braintree
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${API_URL}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );
      setLoading(false);
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/orders");
      toast.success("Payment successful!");
    } catch (error) {
      console.error("Payment error:", error);
      setLoading(false);
      toast.error("Payment failed. Please try again.");
    }
  };

  // Increase the quantity of an item
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease the quantity of an item
  const decreaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Fetch payment token on component mount
  useEffect(() => {
    if (auth?.token) {
      getToken();
    }
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container mt-5 p-4">
        <div className="row">
          {/* Cart Items Section */}
          <div className="col-md-8">
            <h2 className="mb-4">Your Cart</h2>
            {cart?.length ? (
              cart.map((item) => (
                <div className="card mb-3" key={item._id}>
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={`${API_URL}/api/v1/product/product-photo/${item._id}`}
                        alt={item.name}
                        className="card-img-top p-2 responsive-product-image"
                        style={{ height: "100px", width: "100px" }}
                      />
                    </div>
                    <div className="col-md-5">
                      <div className="card-body">
                        <h5 className="card-title">
                          {item.name.substring(0, 16)}
                        </h5>
                        <p className="card-text">
                          <strong>Price:₹ </strong>
                          {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-3 d-flex flex-column align-items-center justify-content-center">
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => decreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-primary"
                          onClick={() => increaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger mt-3"
                        onClick={() => removeCartItem(item._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          {/* Cart Summary Section */}
          <div className="col-md-4">
            <div className="card p-3">
              <h4 className="mb-4">Cart Summary</h4>
              <p>
                <strong>Total: </strong> {totalPrice()}
              </p>
              {auth?.user?.address ? (
                <>
                  <h5>Shipping Address:</h5>
                  <p>{auth.user.address}</p>
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <div>
                  {auth?.token ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-3">
                {clientToken && auth?.token && cart?.length > 0 && (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault", // or "checkout" based on your need
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary mt-3"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing..." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
