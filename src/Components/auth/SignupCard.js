import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import checkLogedIn from "./checkLogin";

function SignupCard() {
  let isLoggedIn = checkLogedIn();
  const [email, setEmail] = useState("");
  const [mobile, setMobileNo] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  let isPCCOE = false;

  const url = "https://api.pccoeieee.org";

  const navigate = useNavigate();

  const setEmailState = (event) => {
    setEmail(event.target.value);
  };

  const setMobileNoState = (event) => {
    setMobileNo(event.target.value);
  };

  const setPasswordNoState = (event) => {
    setPassword(event.target.value);
  };

  const setConfPasswordState = (event) => {
    setConfPassword(event.target.value);
  };
  const validationMessage = (message) => {
    setValidationMsg(message);
    setTimeout(function () {
      setValidationMsg("");
    }, 5000);
  };

  const validateEmail = () => {
    if (email.length === 0) {
      validationMessage("Email cannot be empty");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      validationMessage("Enter a valid email address");
      return false;
    }
  };

  const validatePhone = () => {
    if (mobile.length === 0) {
      validationMessage("Mobile Number is mandatory");
      return false;
    }
    const validatePhoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
    if (validatePhoneNumberRegex.test(mobile)) {
      return true;
    } else {
      validationMessage("Please Enter Correct Phone Number");
      return false;
    }
  };

  const confirmPassword = () => {
    if (password.length < 6) {
      validationMessage("password should be 6 characters long");
      return false;
    }
    if (password.length === 0 || confPassword.length === 0) {
      validationMessage("Password cannot be empty");
      return false;
    } else if (password !== confPassword) {
      validationMessage("Passwords do not match");
      return false;
    }
    return true;
  };

  const validatePccoeEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@pccoepune\.org$/;
    if (regex.test(email)) {
      isPCCOE = true;
    }
  };

  const continueRegistration = async () => {
    //validating email and phone
    if (!validateEmail()) {
      return;
    } else if (!validatePhone()) {
      return;
    } else if (!confirmPassword()) {
      return;
    } else {
      validationMessage("");
      console.log("started");
      setLoading(true);
      console.log(email);
      validatePccoeEmail(email);
      console.log(isPCCOE);

      axios
        .post(url + "/auth/verify-signup", {
          email,
          mobile,
        })
        .then((response) => {
          if (response.data["status"] === false) {
            setLoading(false);
            validationMessage(response.data["message"]);
          } else {
            const data = {
              email: email.toLowerCase().trim(),
              mobile: mobile,
              password: password,
              isPCCOE: isPCCOE,
            };
            localStorage.setItem("data", JSON.stringify(data));
            navigate("/verification");
          }
        })
        .catch((error) => {
          setLoading(false);
          validationMessage(error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div id="particles-js">
        <div id="my-particles">
          <Particle />
        </div>

        <PraxisNav isLoggedIn={isLoggedIn} />
        <div className="bg-circles"></div>
        <div className="container justify-content-center signup-container">
          <div className=" mx-auto row justify-content-center cardComponent text-light mt-4">
            <h3 className="cardHeading">Signup</h3>
            <div className="mt-3 text-center infoText">
              <marquee>
                PCCOE Students must Signup with their @PCCOE Email
              </marquee>
            </div>
            <div className="input-label">
              Email <span style={{ color: "red" }}> * </span>
            </div>
            <input
              type="text"
              name="email"
              id="email"
              className="my-2"
              placeholder="Email"
              onChange={setEmailState}
            />
            <div className="input-label">
              Mobile <span style={{ color: "red" }}> * </span>
            </div>
            <input
              type="tel"
              maxLength={10}
              name="mobileNo"
              id="mobileNo"
              className="my-2"
              placeholder="Mobile"
              onChange={setMobileNoState}
            />

            <div className="input-label">
              Password <span style={{ color: "red" }}> * </span>
            </div>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="my-2"
              placeholder="Password"
              onChange={setPasswordNoState}
              value={password}
            />

            <div className="input-label">
              Confirm Password <span style={{ color: "red" }}> * </span>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              className="my-2"
              placeholder="Confirm Password"
              onChange={setConfPasswordState}
              value={confPassword}
            />
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                role="status"
                style={loading ? { display: "block" } : { display: "none" }}
              ></div>
            </div>
            <input
              type="submit"
              className="mt-4 loginButton"
              value="Continue"
              onClick={continueRegistration}
              style={loading ? { display: "none" } : { display: "block" }}
            />
            <span
              className="errorMessage"
              style={{ margin: "1.1rem", color: "red", fontWeight: "bold" }}
            >
              {validationMsg}
            </span>
            <div className="mt-2 text-center infoText">
              <p>
                Already Have an Account?
                <br />{" "}
                <Link to={"/login"} style={{ fontWeight: "bold" }}>
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupCard;
