import { React, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Particle from "../widgets/Particle";
import PraxisNav from "../widgets/CommonNav";
import jwt_decode from "jwt-decode";
import PreLoader from "../Loader/PreLoader";
import axios from "axios";
import { Link } from "react-router-dom";
import * as Icon from "react-icons/md";
import checkLogedIn from "../auth/checkLogin";
import frazpotrait from "../../assets/posters/fraz.png";
import pageAccess from "./page_access";

const url = "https://api.pccoeieee.org";

function EventsPage2() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    // navigate("/login");
    // const token = localStorage.getItem("token");
    // console.log(token);
    // if (token === null || token === undefined) navigator("/login");
    // let decoded = jwt_decode(token);
    // if (decoded === null || decoded === undefined) navigator("/login");
  }, []);

  const getUserDetail = async () => {
    let decoded = jwt_decode(token);
    console.log("decoded: " + decoded.email);
    let parsedData;

    let url = `https://api.pccoeieee.org/user/profile`;

    await axios
      .post(url, {
        email: decoded.email,
      })
      .then(async (res) => {
        console.log(await res.data.data.id);
        setUser(await res.data.data.id);
        console.log(user);

        // console.log((await res.json()).status);
        // if ((await res.json()).status) {
        // parsedData = ;
        // console.log(parsedData);
        // } else {
        //   localStorage.clear();
        //   window.location.href("https://pccoeieee.org/login");
        // }
      })
      .catch((e) => {});
  };

  const getEventDetail = () => {
    if (pageAccess[id.id] == true) {
      alert("Registrations are closed");
      navigate("/events");
    }
    axios
      .get(`${url}/event/get-event/${id.id}`)
      .then((response) => {
        // console.log("Event Detail:" +response.data.data)
        sendEvent(response.data.data);
        // console.log("Event Detail:" +response.data.data)

        setIsRegistered(response.data.data.participantsId.indexOf(`${user}`));
        // console.log(
        //   "Check Registration" +
        //     response.data.data.participantsId.indexOf(`${id.id}`)
        // );
        // console.log(isRegistered);

        //   )
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  // const regissdterFraz = () => {
  //   // console.log(navigator("/signup"));
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (token === null || token === undefined)
  //     window.location.href = "https://pccoeieee.org/login";
  //   let decoded = jwt_decode(token);
  //   console.log(decoded);
  //   if (decoded === null || decoded === undefined)
  //     window.location.href = "https://pccoeieee.org/login";
  // };
  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
  });
  const [event, sendEvent] = useState();
  const [isRegistered, setIsRegistered] = useState(-1);
  const id = useParams();
  useEffect(() => {
    setLoading(true);
    getUserDetail();
    getEventDetail();
  }, [user]);

  if (event !== undefined) {
    return (
      <>
        {loading ? (
          <PreLoader />
        ) : (
          <div
            className="container-fluid Events-wrapper2"
            style={{ display: "block", margin: "0" }}
          >
            <div id="particles-js">
              <div id="my-particles">
                <Particle />
              </div>
            </div>
            <div
              className="EventsPage"
              style={{ paddingBottom: "20px", margin: "0" }}
            >
              <PraxisNav isLoggedIn={isLoggedIn} />
              <div className="bg-circles"></div>

              <div className="row justify-content-center">
                <div className="col-md-6 col-12 poster-cover">
                  <div className="event-poster">
                    {event.id == "63fb99497a4db1fc79578f8e" ? (
                      <img src={frazpotrait} />
                    ) : (
                      <img src={event.posterUrl} />
                    )}
                    {/* <img src={event.posterUrl} /> */}
                  </div>
                </div>

                <div className="col-md-4 col-11  new-eventcard">
                  <h3 className="event-title">{event.name}</h3>
                  <div className="event-info-top">
                    <h4 className="info-heading">About: </h4>
                    <p className="info-para about-description">
                      {" "}
                      &nbsp; &nbsp;{event.description}
                    </p>
                    <h4 className="info-heading">Criteria</h4>
                    <p className="info-para">
                      Registration fees:
                      <span> Rs. 0</span>
                    </p>
                    {/* <p className="info-para">
                      {" "}
                      <Icon.MdPeopleOutline
                        fill="white"
                        className="my-react-icons"
                      />{" "}
                      Team Size: <span>{event.teamSize} </span>
                    </p> */}
                    <h4 className="info-heading">Event Details</h4>
                    <p>
                      <Icon.MdOutlineLocationOn
                        fill="white"
                        className="my-react-icons"
                      />
                      Venue: <span>{event.venue}</span>
                    </p>
                    <p>
                      <Icon.MdAccessTime
                        fill="white"
                        className="my-react-icons"
                      />{" "}
                      Start Date:{" "}
                      <span>{event.startDate.substring(0, 10)}</span>
                    </p>
                    <p>
                      <Icon.MdAccessTime
                        fill="white"
                        className="my-react-icons"
                      />{" "}
                      Start Time: <span>1:00 PM</span>
                    </p>
                    <h4 className="info-heading">Rule Book</h4>
                    <a
                      href={event.rulebookUrl}
                      target="_bnk"
                      style={{ color: "white" }}
                    >
                      <Icon.MdOutlineReceipt
                        fill="white"
                        className="my-react-icons"
                      />{" "}
                      Click here to open
                    </a>{" "}
                    {event.faq_url && <h4 className="info-heading">FAQ</h4>}
                    {event.faq_url && (
                      <a
                        href={event.faq_url}
                        target="_bnk"
                        style={{ color: "white" }}
                      >
                        <Icon.MdOutlineReceipt
                          fill="white"
                          className="my-react-icons"
                        />{" "}
                        Click here to open
                      </a>
                    )}
                    {isRegistered === -1 && (
                      <Link
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                        to={`/register/${id.id}`}
                        state={{ eventName: event.name }}
                      >
                        <div className="register-btn ">
                          <button>Register</button>
                        </div>
                      </Link>
                    )}
                    {isRegistered !== -1 && (
                      <div
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <a
                          href={event.whatsapp_url}
                          style={{ textDecoration: "none" }}
                          target="_blank"
                        >
                          {" "}
                          <div className="register-btn">
                            <button style={{ background: "green" }}>
                              {" "}
                              Join Whatsapp{" "}
                            </button>
                          </div>{" "}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default EventsPage2;

// import { React, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../../App.css";
// import Accordion from "../widgets/Tabpanel";
// import Particle from "../widgets/Particle";
// import PraxisNav from "../widgets/CommonNav";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
// import checkLogedIn from "../auth/checkLogin";

// function EventsPage() {
//   let isLoggedIn;
//   useEffect(() => {
//     isLoggedIn = checkLogedIn();
//   });
//   const [event, sendEvent] = useState();
//   const id = useParams();
//   useEffect(() => {
//     axios
//       .get(`${url}/api/event/get-event/${id.id}`)
//       .then((response) => {
//         sendEvent(response.data.data);
//         console.log(response);
//       })
//       .catch((err) => console.log(err));
//   }, []);

//   if (event !== undefined) {
//     console.log(event);
//     return (
//       <div
//         className="container-fluid Events-wrapper"
//         style={{ padding: "0px", margin: "0" }}
//       >
//         <div id="particles-js">
//           <div id="my-particles">
//             <Particle />
//           </div>
//         </div>
//         <div
//           className="EventsPage"
//           style={{ paddingBottom: "20px", margin: "0" }}
//         >
//           <PraxisNav isLoggedIn={isLoggedIn} />

//           <div className="row justify-content-center">
//             <div className="col-md-5 col-12 poster-cover">
//               <div className="event-poster">
//                 <img src={event.posterUrl} />
//               </div>
//             </div>

//             <div className="col-md-6 col-11  event-info">
//               <div className="event-info-top">
//                 <h3 className="event-title">{event.name}</h3>

//                 <div className="Accordion" style={{ padding: "0 20px" }}>
//                   <Tabs
//                     defaultActiveKey="description"
//                     id="fill-tab"
//                     className="mb-3 tabpanel"
//                   >
//                     <Tab
//                       className="tab-header"
//                       eventKey="description"
//                       title="Description"
//                     >
//                       <p>{event.description}</p>
//                     </Tab>
//                     <Tab
//                       className="tab-header"
//                       eventKey="Details"
//                       title="Details"
//                     >
//                       <p>Registration fees: {event.registration_fee}</p>
//                       <p>Team Size: {event.teamSize}</p>
//                     </Tab>
//                     <Tab
//                       className="tab-header"
//                       eventKey="Rule book"
//                       title="Rule Book"
//                     >
//                       <a href={event.rulebookUrl} target="_bpk">
//                         Rule Book
//                       </a>
//                       {/* <a>{event.rulebookUrl}</p> */}
//                     </Tab>
//                   </Tabs>
//                 </div>
//               </div>

//               <Link
//                 style={{ textDecoration: "none" }}
//                 to={`/register/${id.id}`}
//                 state={{ eventName: event.name }}
//               >
//                 <div className="row register-btn justify-content-center">
//                   <button>Register</button>
//                 </div>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default EventsPage;
