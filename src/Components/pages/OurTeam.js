import React, { useEffect, useState } from "react";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import git from "../../assets/icons/github.png";
import linkedin from "../../assets/icons/linkedin.png";
import browser from "../../assets/icons/browser.png";
import insta from "../../assets/icons/instagram.png";
import teamdata from "../teams2.json";
import checkLogedIn from "../auth/checkLogin";
import PreLoader from "../Loader/PreLoader";
import "./ourteam.css";
function OurTeam() {
  const [data, setData] = useState(teamdata);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
  });

  console.log(isLoggedIn);
  return (
    <>
      <div style={loading ? { display: "block" } : { display: "none" }}>
        <PreLoader />
      </div>
      <div
        id="particles-js"
        style={loading ? { display: "none" } : { display: "block" }}
      >
        <div id="my-particles">
          <Particle />
        </div>

        <PraxisNav isLoggedIn={isLoggedIn} />

        <div
          className=" text-light mt-4"
          style={{ textAlign: "center", color: "#f2f3f4" }}
        >
          <h1 style={{ fontWeight: "bold" }}>Meet Our Team</h1>
        </div>

        <div className="container-fluid">
          <div className="column justify-content-center">
            {data &&
              data.length > 0 &&
              data.map((team) => (
                <div className="row justify-content-center">
                  <h3
                    style={{
                      fontWeight: "bold",
                      color: "yellow",
                      textAlign: "center",
                    }}
                  >
                    {team.team_name}
                  </h3>
                  {team.members &&
                    team.members.length > 0 &&
                    team.members.map((item) => (
                      <div
                        key={item.id}
                        className="col-md-3 col-12 team-wrapper"
                      >
                        <div className="team-card">
                          <div className="team-img">
                            <img
                              className="img-thumbnail"
                              src={`https://raw.githubusercontent.com/ITSA-Webmasters/praxis-resources/main/${item.name.replace(
                                " ",
                                "%20"
                              )}.png`}
                              alt={item.name}
                            />
                          </div>

                          <div className="team-details">
                            <h4>{item.name}</h4>
                            <h6>{item.role}</h6>
                          </div>
                          <div className="team-social">
                            <ul>
                              <li>
                                <a href={item.linkedin}>
                                  <img src={linkedin} />
                                </a>
                              </li>
                              <li>
                                <a href={item.website}>
                                  <img src={browser} />
                                </a>
                              </li>
                              <li>
                                <a href={item.github}>
                                  <img src={git} />
                                </a>
                              </li>
                              <li>
                                <a href={item.insta}>
                                  <img src={insta} />
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default OurTeam;
