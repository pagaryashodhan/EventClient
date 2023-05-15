import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import checkLogedIn from "./checkLogin";

function VerificationCard() {
  let isLoggedIn;
  useEffect(() => {
    isLoggedIn = checkLogedIn();
  });
  const navigate = useNavigate();

  const savedData = localStorage.getItem("data");
  const parsedData = JSON.parse(savedData);
  const email = parsedData.email;
  let [validationMsg, setValidationMsg] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState(1);
  const [receivedOtp, setReceivedOtp] = useState(0);
  const [counter, setCounter] = useState(30);
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const sendOTP = () => {
    console.log("Clicked");
    setLoading(true);

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

        //setCheckOtp(response.data.data.otp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const VerifyOtp = () => {
    if (parseInt(receivedOtp) === parseInt(otp)) {
      console.log("verified");
      navigate(`/detailpage`);
    } else {
      validationMessage("Incorrect OTP!");
    }
  };

  const resendOTP = () => {
    const savedData = localStorage.getItem("data");
    const parsedData = JSON.parse(savedData);
    const email = parsedData.email;
    console.log(email);
    axios
      .post(url + "/auth/send-otp", {
        email,
      })
      .then((response) => {
        alert("Another OTP has been sent to your email address!");
        if (response.data.status) {
          setReceivedOtp(response.data.data["otp"]);
        } else {
        }
      })
      .catch((error) => {
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
          Verification
        </h1>
        {/* <p>Please enter the OTP sent to your email address</p> */}
        {isSent && (
          <p id="verificationMsg" className="mt-4">
            OTP sent to {email} Please verify the email to continue
          </p>
        )}
        {isSent && (
          <div className="my-3">
            <input
              type="number"
              maxLength={6}
              placeholder="Enter OTP"
              onChange={handleChange}
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
            value="Send OTP"
            onClick={sendOTP}
            style={loading ? { display: "none" } : { display: "block" }}
          />
        )}

        {isSent && (
          <input
            type="button"
            className="mt-4 loginButton"
            value="Verify"
            onClick={VerifyOtp}
          />
        )}
        <span
          className="errorMessage"
          style={{ paddingTop: "20px", color: "yellow", fontWeight: "bold" }}
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

        <span className="errorMessage"></span>
      </div>
    </div>
  );
}

export default VerificationCard;
