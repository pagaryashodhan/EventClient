import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import checkLogedIn from "./checkLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginCard() {
  let isLoggedIn;
  useEffect(() => {
    isLoggedIn = checkLogedIn();
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationMsg, setValidationMsg] = useState("");

  const validationMessage = (message) => {
    setValidationMsg(message);
    setTimeout(function () {
      setValidationMsg("");
    }, 3000);
  };

  const showToastMessage = () => {
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const setEmailState = (event) => {
    setEmail(event.target.value);
  };
  const url = "https://api.pccoeieee.org";
  // const url = "http://praxisapi.pccoeieee.org";
  const setPasswordState = (event) => {
    setPassword(event.target.value);
  };

  const validatePassword = () => {
    if (password.length === 0) {
      validationMessage("Password field cannot be empty");
      return false;
    } else {
      return true;
    }
  };

  const validateEmail = () => {
    email.trim();
    if (email.length === 0) {
      validationMessage("Enter a valid email");
      return false;
    }
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      validationMessage("Enter a valid email address");
      return false;
    }
  };

  const loginUser = () => {
    if (validateEmail() && validatePassword()) {
      setLoading(true);
      axios
        .post(url + "/auth/login", {
          email,
          password,
        })
        .then((response) => {
          console.log(response);
          if (response.data.status) {
            console.log(response.data);
            console.log(response.data["data"]["access_token"]);
            localStorage.setItem(
              "token",
              JSON.stringify(response.data.data["access_token"])
            );
            navigate(`/`);
          } else {
            console.log("done");
            toast.error(`${response.data.message}`, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setValidationMsg(response.data.message);
            setLoading(false);
          }
        });
    }
  };

  return (
    <div id="particles-js">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div id="my-particles">
        <Particle />
      </div>

      <PraxisNav isLoggedIn={isLoggedIn} />
      <div className="bg-circles"></div>
      <div className="main-container">
        <div className="mx-auto cardComponent text-light">
          <h1
            className="cardHeading"
            style={{ fontWeight: "600", color: "white" }}
          >
            Login
          </h1>
          <div className="input-label">
            Email <span style={{ color: "red" }}> * </span>
          </div>
          <input
            type="text"
            name="email"
            id="email"
            className="my-2"
            placeholder="Email *"
            onChange={setEmailState}
            required
          />
          <div className="input-label">
            Password <span style={{ color: "red" }}> * </span>
          </div>
          <input
            type="password"
            name="pass"
            id="pass"
            className="my-2"
            placeholder="Password"
            onChange={setPasswordState}
            required
          />
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              role="status"
              style={loading ? { display: "block" } : { display: "none" }}
            ></div>
          </div>
          <input
            type="button"
            className="mt-4 loginButton"
            value="Login"
            onClick={loginUser}
            style={loading ? { display: "none" } : { display: "block" }}
          />

          <span
            className="errorMessage"
            style={{ paddingTop: "20px", color: "yellow", fontWeight: "bold" }}
          >
            {validationMsg}
          </span>
          <div className="mt-3 text-center infoText">
            <p>
              <Link to={"/reset"}>Forgot Password ?</Link>
            </p>
          </div>
          <div className="mt-3 text-center infoText">
            <p>
              Don't Have an Account?
              <br />{" "}
              <Link to={"/signup"}>
                <spna style={{ color: "yellow" }}>Create new account</spna>
              </Link>{" "}
              to ITSA PCCOE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
