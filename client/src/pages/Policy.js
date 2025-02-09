import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="container-fluid p-5">
        <div className="row">
          {/* Image Section */}
          <div className="col-12 col-md-6 mb-4">
            <img
              src="/images/contactus.jpeg"
              alt="contactus"
              className="img-fluid w-100 rounded"
            />
          </div>
          {/* Privacy Policy Text */}
          <div className="col-12 col-md-6">
            <h2 className="text-center mb-4">Privacy Policy</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              luctus volutpat lectus, nec viverra augue euismod ut. Integer
              vehicula felis non lorem feugiat, non gravida nisi facilisis.
              Etiam accumsan mi ut tincidunt elementum.
            </p>
            <p>
              Sed mollis sapien quis libero ultricies, ac cursus nisl
              consectetur. Nam tempor metus a lectus dictum, id varius mi
              eleifend. Donec nec fermentum purus. Vivamus placerat metus nec
              nulla malesuada, vel suscipit risus varius.
            </p>
            <p>
              Curabitur eget est gravida, feugiat ligula et, congue erat.
              Vestibulum tempor auctor erat, eget dignissim eros dignissim nec.
              Fusce vehicula interdum diam, ac dapibus mi ultricies eu.
            </p>
            <p>
              Vivamus pharetra erat nec felis efficitur, in sodales nunc
              fermentum. Aliquam erat volutpat. Quisque vestibulum, mi at
              lacinia finibus, arcu ligula malesuada eros, id lacinia mauris
              ante eget felis.
            </p>
            <p>
              Fusce sagittis libero quis velit volutpat maximus. Nulla
              fermentum, arcu vitae hendrerit maximus, purus ante sodales elit,
              eget posuere risus justo ut purus. Sed auctor augue non velit
              scelerisque, id posuere sem malesuada.
            </p>
            <p>
              Donec mollis purus sit amet metus convallis scelerisque. Cras nec
              sapien ut magna faucibus aliquam a vel ligula.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
