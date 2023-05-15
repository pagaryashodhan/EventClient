import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./pagenotfound.css";
import { FaRegQuestionCircle } from "react-icons/fa";

const PageNotFound = () => {
  return (
    <div>
      <div className="mainbox">
        <div className="err">4</div>
        <FaRegQuestionCircle className="far" />
        <div className="err2">4</div>
        <div className="msg">
          Maybe this page moved? Got deleted? Never existed in the first place?
          <br />
          <br />
          <p>
            Let's go <a href="/">home</a> and try from there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
