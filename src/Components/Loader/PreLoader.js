import React from "react";
import "../../landingPage.css";

function PreLoader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <div className="bg-circles"></div>

      <div className="spinner-grow m-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow m-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner-grow m-2" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default PreLoader;
