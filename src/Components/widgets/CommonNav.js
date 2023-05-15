import React, { useEffect, useState } from "react";

import praxis from "../../Images/praxis-nav.svg";
import "../../styles/navbar.css";
import { Link } from "react-router-dom";
import checkLogedIn from "../auth/checkLogin";
const NewNavbar = ({ isLoggedIn }) => {
  // console.log(isLoggedIn)
  const[islogin, setLogin] = useState(false)

useEffect(() => {
  setLogin(checkLogedIn());
},[]);
  return (
    <div
      className="container-fluid common-nav justify-content-between align-content-center"
      style={{ margin: 0, padding: 0 }}
    >
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">
            <Link to="/">
              <div className="logos">
                <img
                  src={praxis}
                  alt=""
                />
              </div>
            </Link>
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
          <Link to={islogin ? "/Profile" : "/login"}>
            {!islogin ? "Login" : "Profile"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewNavbar;
