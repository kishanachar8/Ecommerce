import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Ecommer App"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/about.jpeg"
              alt="About us"
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h2 className="mb-4">About Our E-commerce App</h2>
            <p className="text-justify">
              Welcome to our E-commerce platform! Our mission is to provide a
              seamless and enjoyable shopping experience for our customers. We
              offer a wide range of products at competitive prices, all while
              ensuring secure and efficient transactions. Our goal is to make
              online shopping simple, convenient, and accessible to everyone.
            </p>
            <p className="text-justify">
              We are committed to customer satisfaction, and our team works
              tirelessly to offer top-quality products and exceptional service.
              Whether you're shopping for electronics, fashion, or home goods,
              we've got you covered with a diverse selection that meets your
              needs and preferences. Thank you for choosing us!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
