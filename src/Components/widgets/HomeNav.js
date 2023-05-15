import React from "react";

import pccoe from "../../Images/pccoe.png";
import ieee from "../../Images/ieee.jpeg";
import itsa from "../../Images/itsa.png";
import NSCC from "../../Images/NSCC.png";
import codechef from "../../Images/codeshef.png";
import { Link } from "react-router-dom";

import "../../styles/homenav.css";

const NewNavbar = ({ isLoggedIn }) => {
  return (
    <div
      className="container-fluid nav justify-content-between align-content-center"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <div className="logos">
              <img src={ieee} alt="" />
              <img src={itsa} alt="" />
              <img src={pccoe} alt="" />
              <img src={codechef} alt="" />
              <img src={NSCC} alt="" />
            </div>
          </div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <Link to={"/"}>Home</Link>
          <Link to={"/events"}>Events</Link>
          <Link to={"/team"}>Our Team</Link>
          <Link to={isLoggedIn ? "/Profile" : "/login"}>
            {!isLoggedIn ? "Login" : "Profile"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
