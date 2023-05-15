import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import PraxisNav from "../widgets/CommonNav";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Particle from "../widgets/Particle";
import checkLogedIn from "../auth/checkLogin";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PreLoader from "../Loader/PreLoader";
import "react-toastify/dist/ReactToastify.css";
function CodmRegistration() {
  const navigator = useNavigate();
  let isLoggedIn;
  const [validationMsg, setValidationMsg] = useState("");

  const validationMessage = (message) => {
    setValidationMsg(message);
    setTimeout(function () {
      setValidationMsg("");
    }, 3000);
  };

  const [loading, setLoading] = useState(false);
  const id = useParams();
  const [codm, setCodm] = useState("null");
  const [userData, setUserData] = useState("null");
  const [event, getEvent] = useState();
  const [referal, setReferal] = useState("");
  const location = useLocation();
  const { eventName } = location.state;
  useEffect(() => {
    console.log(id.id);
    axios
      .get(`${url}/event/get-event/${id.id}`)
      .then((response) => {
        getEvent(response.data);
      })
      .catch((err) => console.log(err));
    isLoggedIn = checkLogedIn();
    if (!isLoggedIn) {
      navigator("/login");
    } else {
      const userToken = localStorage.getItem("token");
      setUserData(jwtDecode(userToken));
    }
    const userToken = localStorage.getItem("token");
    if (id.id === "63f499cf228cba057e4e844b") {
      window.open(
        `https://the-blue-bit-round-1.devfolio.co/`,
        "_blank",
        "noreferrer"
      );
    }
    if (id.id === "63f499cf228cba057e4e844c") {
      axios
        .post(`${url}/user/get-user-token/${jwtDecode(userToken).id}`)
        .then((jwt) => {
          window.open(
            `https://nsccpccoe.web.app/events/register/codewars?praxis_token=${jwt.data.data}`,
            "_blank",
            "noreferrer"
          );

          window.location.href = "https://pccoeieee.org/events";
        })
        .catch((error) => {
          //TODO: show failed toast
          navigator("/events");
        });
    }

    import(`../../events/${id.id}.json`)
      .then((res) => {
        setCodm(res.default);
      })
      .catch((_) => null);
  }, []);

  let jsonArray = codm.payload;
  const setReferalState = (event) => {
    setReferal(event.target.value);
  };
  const url = "https://api.pccoeieee.org";

  const handleEventRegistration = () => {
    if (id.id === "63fb99497a4db1fc79578f8e") {
      axios
        .post(`${url}/event/register/63fb99497a4db1fc79578f8e`, {
          emails: [userData.email],
          payload: {},
          referal: "",
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          if (response.data.status === true) {
            setLoading(false);
            navigator("/profile");
          } else {
            setLoading(false);
          }
          //TODO: add toast
        })
        .catch((error) => {
          // validationMessage(error);
          //TODO: add error toast
        });
    } else {
      setLoading(true);
      let m1 = new Set(),
        m2 = new Set(),
        m3 = new Set();
      let emails = [];
      let payload = {};
      let j = 0;
      for (let i = 0; i < jsonArray.length; i++) {
        if (
          document.getElementById(`${jsonArray[i].id}`).value !== "" &&
          i < codm.unique * event.data.teamSize
        ) {
          payload[jsonArray[i].name] = document.getElementById(
            `${jsonArray[i].id}`
          ).value;
          if (document.getElementById(`${jsonArray[i].id}`).value === "") {
            validationMessage("Values cannot be blank");
            setLoading(false);
            return false;
          }
          if (
            jsonArray[i].type === "email" &&
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              document.getElementById(`${jsonArray[i].id}`).value
            ) === true
          ) {
            emails.push(document.getElementById(`${jsonArray[i].id}`).value);
          } else if (jsonArray[i].type === "email") {
            console.log(document.getElementById(`${jsonArray[i].id}`).value);
            validationMessage("Enter a valid email address");
            setLoading(false);
            return false;
          }
          if (j === 0) {
            m1.add(document.getElementById(`${jsonArray[i].id}`).value);
            if (codm.unique > 1) j++;
          } else if (j === 1) {
            m2.add(document.getElementById(`${jsonArray[i].id}`).value);
            if (codm.unique > 2) j++;
            else j = 0;
          } else {
            m3.add(document.getElementById(`${jsonArray[i].id}`).value);
            j = 0;
          }
        }
      }
      if (codm.unique === 1) {
        if (m1.size < event.data.teamSize) {
          setLoading(false);
          validationMessage("Enter valid details");
          return;
        }
      } else if (codm.unique === 2) {
        if (m1.size < event.data.teamSize || m2.size < event.data.teamSize) {
          setLoading(false);
          validationMessage("Enter valid details");
          return;
        }
      } else {
        if (
          m1.size < event.data.teamSize ||
          m2.size < event.data.teamSize ||
          m3.size < event.data.teamSize
        ) {
          setLoading(false);
          validationMessage("Enter valid details");
          return;
        }
      }
      axios
        .post(`${url}/event/verify-register/${event.data.id}`, {
          emails: emails,
          referal: referal,
        })
        .then((res) => {
          if (res.data.status === true) {
            const count = res.data.data;
            if (count === 0 || event.data.registration_fee === 0) {
              axios
                .post(`${url}/event/register/${event.data.id}`, {
                  emails: emails,
                  payload: payload,
                  referal: referal,
                })
                .then((response) => {
                  setLoading(false);
                  if (response.data.status === true) {
                    console.log(response);
                    navigator("/profile");
                  } else {
                    setLoading(false);
                    validationMessage(response.data.message);
                  }
                  //TODO: add toast
                })
                .catch((error) => {
                  validationMessage(error);
                  //TODO: add error toast
                });
            } else {
              const amount = res.data.data * event.data.registration_fee;
              navigator("/pg", {
                state: {
                  amount: amount,
                  emails: emails,
                  eventName: eventName,
                  referal: referal,
                  eventId: id.id,
                },
              });
            }
          } else {
            setLoading(false);
            validationMessage(res.data.message);
          }
        });
    }
  };
  if (codm === "null") {
    return (
      <div
        id="particles-js"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PreLoader />
      </div>
    );
  } else {
    console.log("printing loging status");
    console.log(isLoggedIn);
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
          <div className="mx-auto cardComponent text-light mt-4">
            <h3 className="cardHeading">{eventName}</h3>
            {jsonArray.map((element, index) => {
              return (
                <>
                  <div style={{ fontSize: "1.1rem" }}>
                    {element.name} <span style={{ color: "red" }}> * </span>
                  </div>
                  <input
                    type={element.type}
                    name={element.type}
                    value={element.id === "email1" ? userData.email : null}
                    disabled={element.id === "email1" ? true : false}
                    id={element.id}
                    className="my-3"
                    required
                  />
                </>
              );
            })}
            {/* <hr style={{ color: "white" }} /> */}
            <div style={{ fontSize: "1.1rem" }}>Referal Email (Optional)</div>
            <input
              type="email"
              name="Referal Id"
              className="my-3"
              onChange={setReferalState}
            />
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border"
                role="status"
                style={loading ? { display: "block" } : { display: "none" }}
              ></div>
            </div>
            <span
              className="errorMessage"
              style={{
                paddingTop: "20px",
                color: "red",
                fontWeight: "bold",
              }}
            >
              {validationMsg}
            </span>
            <input
              type="submit"
              className="mt-4 loginButton"
              value="Register"
              style={loading ? { display: "none" } : { display: "block" }}
              onClick={handleEventRegistration}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CodmRegistration;
