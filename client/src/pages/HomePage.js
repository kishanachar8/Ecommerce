import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { API_URL } from "../utils/config";
import "../App.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Ensure cart is an array, fallback to an empty array if it's undefined
  const safeCart = Array.isArray(cart) ? cart : [];

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Fetch total product count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // Filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/v1/product/product-filters`,
        {
          checked,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  // Load filters and products on mount
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page > 1) loadMore();
  }, [page]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    else getAllProducts();
  }, [checked, radio]);

  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const productExists = safeCart.find((item) => item._id === product._id);

    if (productExists) {
      // If it exists, increment the quantity
      const updatedCart = safeCart.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If it doesn't exist, add the product with quantity 1
      const updatedCart = [...safeCart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    toast.success("Added to Cart");
  };

  return (
    <Layout title="Home - Flipkart Clone">
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Filters Section */}
          <div className="col-md-3">
            <div className="d-md-none mb-3">
              {/* Collapsible Button */}
              <button
                className="btn btn-primary w-100"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#filterSection"
                aria-expanded="false"
                aria-controls="filterSection"
              >
                Filters
              </button>
            </div>

            {/* Collapsible Section */}
            <div className="collapse d-md-block" id="filterSection">
              <div className="bg-light p-3 rounded">
                <h5>Filter By Category</h5>
                {categories.map((c) => (
                  <Checkbox
                    key={c._id}
                    onChange={(e) => handleFilter(e.target.checked, c._id)}
                  >
                    {c.name}
                  </Checkbox>
                ))}
                <h5 className="mt-4">Filter By Price</h5>
                <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                  {Prices.map((p) => (
                    <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                  ))}
                </Radio.Group>
                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={() => window.location.reload()}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-md-9">
            <h2 className="text-center mb-4">Products</h2>
            <div className="row g-3">
              {products.map((p) => (
                <div className="col-6 col-sm-4 col-lg-3" key={p._id}>
                  <div className="card h-100">
                    <img
                      src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top p-2 responsive-product-image"
                      alt={p.name}
                    />

                    <div className="card-body">
                      <h5 className="card-title">{p.name.substring(0, 16)}</h5>
                      <p className="card-text text-muted">
                        {p.description.substring(0, 50)}...
                      </p>
                      <h6 className="text-success">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h6>
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-outline-primary"
                          onClick={() => navigate(`/product/${p.slug}`)}
                        >
                          View Details
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleAddToCart(p)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {products.length < total && (
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary"
                  onClick={() => setPage(page + 1)}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
