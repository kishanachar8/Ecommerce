import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import { API_URL } from "../utils/config";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  // Ensure cart is an array, fallback to an empty array if it's undefined
  const safeCart = Array.isArray(cart) ? cart : [];

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
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center mt-5">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>

          {/* Loading state */}
          {values?.loading && <p>Loading...</p>}

          <div className="row mt-4">
            {values?.results.map((p) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
                key={p._id}
              >
                <div className="card product-card shadow-sm h-100">
                  <img
                    src={`${API_URL}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    style={{ objectFit: "cover", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 60)}...
                    </p>
                    <h6 className="card-price">
                      ${p.price?.toLocaleString("en-US")}
                    </h6>
                    <div className="d-flex justify-content-between mt-3">
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => {
                          handleAddToCart(p);
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
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

export default Search;
