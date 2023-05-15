import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import Accordion from "../widgets/Tabpanel";
import Particle from "../widgets/Particle";
import PraxisNav from "../widgets/CommonNav";
import axios from "axios";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import checkLogedIn from "../auth/checkLogin";
import frazpotrait from "../../assets/posters/fraz.png";

const url = "https://api.pccoeieee.org/";


function EventsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
  });

  const [event, sendEvent] = useState();
  const id = useParams();
  useEffect(() => {
    axios
      .get(`${url}/api/event/get-event/${id.id}`)
      .then((response) => {
        sendEvent(response.data.data);
        console.log(response);
      })
      .catch((err) => console.log(err));
  }, []);

  if (event !== undefined) {
    console.log("inside events page");
    console.log(event);
    console.log(event.id);
    return (
      <div
        className="container-fluid Events-wrapper"
        style={{ padding: "0px", margin: "0" }}
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

          <div className="row justify-content-center">
            <div className="col-md-5 col-12 poster-cover">
              <div className="event-poster">
               {event.id == "63fb99497a4db1fc79578f8e63fb99497a4db1fc79578f8e" ?  <img src={frazpotrait} /> : <img src={event.posterUrl} /> }
              </div>
            </div>

            <div className="col-md-6 col-11  event-info">
              <h3 className="event-title">{event.name}</h3>
              <div className="event-info-top">
                <h4 className="info-heading">About: </h4>
                <p className="info-para"> &nbsp; &nbsp;{event.description}</p>

                <h4 className="info-heading">Criteria</h4>
                <p className="info-para">
                  Registration fees:<span> Rs. {event.registration_fee} </span>
                </p>
                <p className="info-para">
                  Team Size: <span>{event.teamSize} </span>
                </p>
                <h4 className="info-heading">Event Details</h4>
                <p>
                  Venue: <span>{event.venue}</span>
                </p>
                <p>
                  Start Date: <span>{event.startDate.substring(0, 10)}</span>
                </p>
                <p>
                  End Date: <span>{event.endDate.substring(0, 10)}</span>
                </p>
                {/* <p>End Date: <span>{event.endDate.toString().toUTCDate()}</span></p> */}
                <h4 className="info-heading">Rule Book</h4>
                <a href={event.rulebookUrl} target="_blank">
                  Click here to open
                </a>
                {/* <div className="Accordion" style={{ padding: "0 20px" }}>
                  <Tabs
                    defaultActiveKey="description"
                    id="fill-tab"
                    className="mb-3 tabpanel"
                  >
                    <Tab
                      className="tab-header"
                      eventKey="description"
                      title="Description"
                    >
                      <p>{event.description}</p>
                    </Tab>
                    <Tab
                      className="tab-header"
                      eventKey="Details"
                      title="Details"
                    >
                      <p>Registration fees: {event.registration_fee}</p>
                      <p>Team Size: {event.teamSize}</p>
                    </Tab>
                    <Tab
                      className="tab-header"
                      eventKey="Rule book"
                      title="Rule Book"
                    >
                      <a href={event.rulebookUrl} target="_blank">
                        Rule Book
                      </a>
                      {/* <a>{event.rulebookUrl}</p> */}
                {/* </Tab> */}
                {/* </Tabs> */}
                {/* </div> */}
              </div>

              <Link
                style={{ textDecoration: "none" }}
                to={`/register/${id.id}`}
                state={{ eventName: event.name }}
              >
                <div className="row register-btn justify-content-center">
                  <button>Register</button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EventsPage;

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
//                       <a href={event.rulebookUrl} target="_blank">
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
