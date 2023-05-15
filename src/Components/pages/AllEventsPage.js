import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import MyTabPanel from "../widgets/Tabpanel";
import Particle from "../widgets/Particle";

function EventsPage() {
  return (
    <>
      <div id="particles-js">
        <Particle />
      </div>
      <div className="container EventsPage cardComponent">
        <div className="row">
          <div className="col-md-6 poster-cover">
            <div className="event-poster"></div>
          </div>

          <div className="col-md-6">
            <h3 className="event-title">Event Title</h3>
            <div className="Accordion">
              <MyTabPanel />
            </div>
            <div className="row register-btn justify-content-center">
              <button>Register</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventsPage;
