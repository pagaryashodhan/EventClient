import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../App.css";
import Particle from "../widgets/Particle";
import PreLoader from "../Loader/PreLoader";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PraxisNav from "../widgets/CommonNav";
import { fadeInUp, staggerContainer, springAnimation } from "../../variants";
import checkLogedIn from "../auth/checkLogin";
import frazpotrait from "../../assets/posters/fraz.png";
import frazlandscape from "../../assets/posters/GRID.png";
import pageAccess from "./page_access";

const Events = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
  });
  const [events, setEvents] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.pccoeieee.org/event/get-events/`)
      .then(async function (resp) {
        console.log(resp);
        setEvents(await resp.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(events.data);
  return (
    <div>
      {loading ? (
        <PreLoader />
      ) : (
        <div id="particles-js">
          <div id="my-particles">
            <Particle />
          </div>
          <PraxisNav isLoggedIn={isLoggedIn} />
          <div className="bg-circles"></div>

          {events.data && (
            <div className="container-fluid">
              <motion.div
                variants={staggerContainer(0.1)}
                initial="initial"
                animate="animate"
                className="all-events row justify-content-around "
              >
                <div className="container">
                  <div className="row fraz-poster justify-content-center">
                    <div className="col-md-12">
                      <Link
                        to={"/eventspage/63fb99497a4db1fc79578f8e"}
                        state={{ eventName: "Fraz" }}
                        style={{
                          padding: "0",
                          margin: "0",
                          width: "100%",
                          textAlign: "center",
                          justifyContent: "center",
                          textDecoration: "none",
                        }}
                      >
                        <div
                          className="fpost "
                          style={
                            window.innerWidth > 600
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          <img src={frazlandscape} />

                          <button
                            className="register-btn"
                            style={{ marginTop: "1em" }}
                          >
                            {" "}
                            Register
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                {events.data &&
                  events.data.map((event) => (
                    <motion.div
                      variants={fadeInUp(-60, 0, 0, 0)}
                      className="event-card col-md-3"
                      key={event.id}
                      style={
                        event.id === "63fb99497a4db1fc79578f8e" &&
                        window.innerWidth > 600
                          ? {
                              display: "none",
                            }
                          : { display: "flex" }
                      }
                    >
                      {pageAccess[event.id] === true ? (
                        <Link
                          // to={`/eventspage/${event.id}`}
                          // state={{ eventName: event.name }}
                          style={{
                            padding: "0",
                            margin: "0",
                            width: "100%",
                            textAlign: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                          }}
                        >
                          <h6
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            &nbsp;&nbsp;{event.name}
                          </h6>

                          <div className="inner-card">
                            <img
                              src={
                                event.id === "63fb99497a4db1fc79578f8e"
                                  ? frazpotrait
                                  : event.posterUrl
                              }
                            />
                          </div>

                          <button
                            className="btn btn-warning"
                            style={{ color: "black", fontWeight: "bold" }}
                          >
                            {" "}
                            Registrations Closed
                          </button>
                        </Link>
                      ) : (
                        <Link
                          to={`/eventspage/${event.id}`}
                          state={{ eventName: event.name }}
                          style={{
                            padding: "0",
                            margin: "0",
                            width: "100%",
                            textAlign: "center",
                            justifyContent: "center",
                            textDecoration: "none",
                          }}
                        >
                          <h6
                            style={{
                              textAlign: "center",
                              color: "white",
                              fontWeight: "bold",
                              fontSize: "1.2rem",
                            }}
                          >
                            &nbsp;&nbsp;{event.name}
                          </h6>

                          <div className="inner-card">
                            <img
                              src={
                                event.id === "63fb99497a4db1fc79578f8e"
                                  ? frazpotrait
                                  : event.posterUrl
                              }
                            />
                          </div>

                          <button className="register-btn"> Register</button>
                        </Link>
                      )}
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Events;

// import React, { useState, useEffect } from 'react';

// function Events() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch('http://praxisapi.pccoeieee.org/api/event/get-events');
//       const json = await response.json();
//       setData(["1", "2"]);
//     }
//     fetchData();
//   }, []);

//   return (
//     <div className="page-bg">
//     <img src="./Images/logo.svg" height="50rem" className="m-3" />
//     <div>
//       {data.map((item, index) => (
//         <div key={index}>
//           <h2>{item.title}</h2>
//           <p>{item.description}</p>
//         </div>
//       ))}
//     </div>
// </div>
//   );
// }

// export default Events;
