import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/config";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();

  // Ensure cart is an array, fallback to an empty array if it's undefined
  const safeCart = Array.isArray(cart) ? cart : [];

  // Initial product details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  // Get product details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };

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

  // Get related products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container-fluid mt-5 p-4">
        <div className="row">
          <div className="col-12 col-md-6 text-center">
            <img
              src={`${API_URL}/api/v1/product/product-photo/${product._id}`}
              className="img-fluid product-image"
              alt={product.name}
            />
          </div>
          <div className="col-12 col-md-6 product-details-info">
            <h1>{product.name}</h1>
            <hr />
            <h6>{product.description}</h6>
            <h5>
              Price:
              {product?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
              })}
            </h5>
            <h6>Category: {product?.category?.name}</h6>
            <button
              className="btn btn-success"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <hr />
        <div className="row container similar-products">
          <h4>Similar Products ➡️</h4>
          {relatedProducts.length < 1 && (
            <p className="text-center">No Similar Products found</p>
          )}
          <div className="d-flex flex-wrap">
            {relatedProducts?.map((p) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                key={p._id}
              >
                <div className="card product-card shadow-sm h-100">
                  <img
                    src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h5>
                    <p className="card-text text-truncate">{p.description}</p>
                    <button
                      className="btn btn-info w-100"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      More Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
