import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout title={"Contact Us - Ecommer App"}>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="Contact Us"
              className="img-fluid"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center">
            <h1 className="bg-dark p-3 text-white text-center">Contact Us</h1>
            <p className="text-justify mt-3">
              If you have any queries or need information about our products,
              feel free to reach out. We're available 24/7 to assist you!
            </p>
            <div className="mt-4">
              <p>
                <BiMailSend size={30} className="text-primary mr-3" />
                <span>Email: </span>
                <a href="mailto:www.help@ecommerceapp.com">
                  www.help@ecommerceapp.com
                </a>
              </p>
              <p>
                <BiPhoneCall size={30} className="text-success mr-3" />
                <span>Phone: </span> 012-3456789
              </p>
              <p>
                <BiSupport size={30} className="text-danger mr-3" />
                <span>Toll-Free Support: </span> 1800-0000-0000
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
