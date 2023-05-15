import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import checkLogedIn from "./checkLogin";

function ResetPassword() {
  let isLoggedIn = false;
  useEffect(() => {
    isLoggedIn = checkLogedIn();
  });
  const navigate = useNavigate();
  let [validationMsg, setValidationMsg] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(1);
  const [receivedOtp, setReceivedOtp] = useState(0);
  const [isSent, setIsSent] = useState(false);
  const [counter, setCounter] = useState(30);
  const [loading, setLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const url = "https://api.pccoeieee.org";
  const validationMessage = (message) => {
    setValidationMsg(message);
    setTimeout(function () {
      setValidationMsg("");
    }, 3000);
  };
  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);
  const setPasswordNoState = (event) => {
    setPassword(event.target.value);
  };

  const setEmailState = (event) => {
    setEmail(event.target.value);
  };

  const setConfPasswordState = (event) => {
    setConfPassword(event.target.value);
  };
  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOTP = async () => {
    setLoading(true);
    console.log(await validateEmail());
    if (!(await validateEmail())) {
      setLoading(false);
      return;
    }
    console.log("here");
    axios
      .post(url + "/auth/send-otp", {
        email,
      })
      .then((response) => {
        if (response.status) {
          setReceivedOtp(response.data.data.otp);
          setIsSent(true);
          setCounter(30);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
  const validateEmail = async () => {
    if (email.length === 0) {
      validationMessage("Email cannot be empty");
      return false;
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      let valid = false;
      await axios
        .post(`${url}/auth/verify-email`, { email: email })
        .then((response) => {
          if (response.data.status === true) {
            console.log("here");
            valid = true;
            return true;
          } else {
            console.log(response.data.message);
            validationMessage(response.data.message);
            return false;
          }
        })
        .catch((error) => {
          validationMessage(error);
          return false;
        });
      if (valid) return true;
      else return false;
    } else {
      validationMessage("Enter a valid email address");
      return false;
    }
  };
  const resetPassword = async () => {
    if (!confirmPassword()) return;
    setLoading(true);
    await axios
      .post(`${url}/auth/reset-password`, {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.data.status === true) {
          setLoading(false);
          navigate("/login");
        } else {
          setLoading(false);
          validationMessage(response.data.message);
        }
      });
  };
  const VerifyOtp = () => {
    if (parseInt(receivedOtp) === parseInt(otp)) {
      console.log("verified");
      setIsVerified(true);
    } else {
      validationMessage("Incorrect OTP!");
    }
  };

  const resendOTP = async () => {
    const savedData = localStorage.getItem("data");
    const parsedData = JSON.parse(savedData);
    const email = parsedData.email;
    console.log(email);

    await axios
      .post(url + "/auth/send-otp", {
        email,
      })
      .then((response) => {
        console.log(response);
        alert("Another OTP has been sent to your email address!");
        if (response.data.status) {
          setReceivedOtp(response.data.data["otp"]);
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Something Went Wrong!");
      });
    setCounter(30);
  };

  return (
    <div id="particles-js">
      <div id="my-particles">
        <Particle />
      </div>

      <PraxisNav isLoggedIn={isLoggedIn} />
      <div className="bg-circles"></div>
      <div className="verificationCardComponent text-light mt-4">
        <h1 className="cardHeading" style={{ fontWeight: "600" }}>
          {isVerified ? "Reset Password" : "Verification"}
        </h1>

        {/* <p>Please enter the OTP sent to your email address</p> */}
        {isSent && !isVerified && (
          <p id="verificationMsg" className="mt-4">
            OTP sent to {email} Please verify the email to continue
          </p>
        )}
        {!isVerified && (
          <div>
            <div className="input-label">
              Email <span style={{ color: "red" }}> * </span>
            </div>
            <input
              type="text"
              name="email"
              id="email"
              className="my-2"
              placeholder="Email"
              disabled={isSent ? true : false}
              onChange={setEmailState}
            />
          </div>
        )}
        {isSent && !isVerified && (
          <div className="my-3">
            <input
              type="number"
              maxLength={6}
              placeholder="Enter OTP"
              onChange={handleChange}
            />
          </div>
        )}
        {isVerified && (
          <div>
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
          </div>
        )}

        {isVerified && (
          <div>
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
          </div>
        )}

        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            role="status"
            style={loading ? { display: "block" } : { display: "none" }}
          ></div>
        </div>
        {!isSent && (
          <input
            type="button"
            className="mt-4 loginButton"
            value={"Send OTP"}
            onClick={sendOTP}
            style={loading ? { display: "none" } : { display: "block" }}
          />
        )}

        {isSent && (
          <input
            type="button"
            className="mt-4 loginButton"
            value={isVerified ? "Confirm" : "Verify"}
            onClick={isVerified ? resetPassword : VerifyOtp}
          />
        )}
        <span
          className="errorMessage"
          style={{ paddingTop: "20px", color: "red", fontWeight: "bold" }}
        >
          {validationMsg}
        </span>
        <p
          id="metaMsg"
          className="my-3"
          style={
            counter < 1 || isSent === false
              ? { display: "none" }
              : { display: "block" }
          }
        >
          Get another link in {counter} seconds
        </p>

        {!isVerified && (
          <input
            type="button"
            className="mt-4 loginButton"
            value="Resend OTP"
            style={
              counter < 1 && isSent === true
                ? { display: "block" }
                : { display: "none" }
            }
            onClick={resendOTP}
          />
        )}

        <span className="errorMessage"></span>
      </div>
    </div>
  );
}

export default ResetPassword;
