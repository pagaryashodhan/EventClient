import "bootstrap/dist/css/bootstrap.min.css";
import poster from "../../Images/poster.jpg";
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import axios from "axios";
import checkLogedIn from "../auth/checkLogin";

export class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        first_name: "",
        isLoggedIn: false,
        registeredEvents: [],
        userId:"",
      },
    };
    this.token = localStorage.getItem("token");
  }

  logout = () => {
    localStorage.removeItem("token");
    this.setState({ isLoggedIn: false });
    window.location.replace("https://pccoeieee.org/");
  };

  getPass=async()=>{
await axios.get(`https://api.pccoeieee.org/user/get-pass/${this.state.data.id}`)
.then(async (res)=>{
  console.log(await res.data)
if(res.data.status)
{
  window.location.replace("/passlist ");
  // Navigate("/passlist")

}else {
 alert("No Need OF Pass")
}
  
})
.catch((err)=>console.error(err))


  }
 
  updatePage = async () => {
    console.log(this.token);
    let decoded = jwt_decode(this.token);
    console.log(decoded);
    let parsedData;
    this.setState({ isLoggedIn: true });
    // console.log("Bearer " + this.token.substring(1, this.token.length - 1));
    let url = `https://api.pccoeieee.org/user/profile`;
    // console.log(this.token);
    // console.log("Bearer " + this.token.substring(1, this.token.length - 1));
    await axios
      .post(url, {
        email: decoded.email,
      })
      .then(async (res) => {
        console.log(await res.data.data);

        this.setState({ data: res.data.data });
        // console.log((await res.json()).status);
        // if ((await res.json()).status) {
        // parsedData = ;
        // console.log(parsedData);
        // } else {
        //   localStorage.clear();
        //   window.location.href("https://pccoeieee.org/login");
        // }
      })
      .catch((e) => {
        console.log(e);
        this.setState({ problemOccrured: true });
      });



      //await axios.get(`https://api.pccoeieee.org/user/${}`)
  };

  async componentDidMount() {
    await this.updatePage().then((res) => {
      console.log(this.state);
    });
  }

  render() {
    let isLoggedIn = checkLogedIn();
    console.log(this.state.data);
    if (this.state.data)
      return (
        <div
          className="container-fluid"
          style={{ padding: "0px", margin: "0" }}
        >
          <div id="particles-js">
            <div className="bg-circles"></div>

            <div id="my-particles">
              <Particle />
            </div>
            <PraxisNav isLoggedIn={isLoggedIn} />

            <div className="row main-container">
              <div className="profile-box container col-md-10">
                <div
                  className="row mx-auto justify-content-center align-items-center  rounded-circle bg-dark "
                  style={{
                    left: "50%",
                    zIndex: "1",
                    height: "5.5rem",
                    width: "5.5rem",
                  }}
                >
                  <span style={{ textAlign: "center" }} className="fs-1">
                    {this.state.data.first_name.charAt(0)}
                  </span>
                </div>
                <div className="row justify-content-center">
                  <div className="col-md-12 mt-3">
                     <h3 className="text-center mx-auto">
                      {this.state.data.first_name} {this.state.data.last_name}
                    </h3>
                  </div>
                  
                 
                </div>
                
                <div className="">
                  <div className="col register" style={{ textAlign: "center" }}>
                    Registered Events
                  </div>
                  <div className="d-flex col justify-content-evenly align-items-center">
                    {this.state.data.registeredEvents &&
                      this.state.data.registeredEvents.map((event) => (
                        <div key={event.id} className="profileposter">
                          <img
                            src={event.image_url}
                            alt="Poster"
                            width="100%"
                          />
                        </div>
                      ))}
                    {!this.state.data.registeredEvents && (
                      <div>No Registered Event</div>
                    )}
                  </div>
                </div>
                <hr className="text-light" />

              
                <div className="" style={{display: "flex", justifyContent:"Center"}}>
                <a href="https://drive.google.com/file/d/1NvBY5Fff8hwLcf5azvYQXY0UxctLbqfK/view?usp=share_link" target={"_blank"}><button className="btn btn-success">Event Timeline </button> </a>
                
              
                  </div>
                <hr className="text-light" />

                <div className="row">
                  <div className="col profiletxt">Email</div>
                  <div className="col">
                    <input
                      disabled="true"
                      type="text"
                      placeholder="xyz@.com"
                      value={this.state.data.email}
                    ></input>
                  </div>
                </div>

                <hr className="text-light" />

                <div className="row">
                  <div className="col profiletxt">Mobile</div>
                  <div className="col">
                    <input
                      disabled="true"
                      type="text"
                      placeholder="0123456789"
                      value={this.state.data.mobile}
                    ></input>
                  </div>
                </div>

                <hr className="text-light" />

                <div className="row">
                  <div className="col profiletxt">College Details</div>
                  <div className="col">
                    <input
                      disabled="true"
                      type="text"
                      placeholder="PCCOE"
                      value={this.state.data.college}
                    ></input>
                    <br />
                    <input
                      disabled="true"
                      type="text"
                      placeholder="IT"
                      value={this.state.data.branch}
                    ></input>
                    <br />
                    <input
                      disabled="true"
                      type="text"
                      placeholder="Second Year"
                      value={this.state.data.year}
                    ></input>
                  </div>
                </div>

                <hr className="text-light" />

                <div className="row">
                  <div className="col profiletxt">Address Details</div>
                  <div className="col">
                    <input
                      disabled="true"
                      type="text"
                      placeholder="Pune"
                      value={this.state.data.city}
                    ></input>
                    <br />
                    <input
                      disabled="true"
                      type="text"
                      placeholder="Maharashtra"
                      value={this.state.data.state}
                    ></input>
                  </div>
                </div>

                <div className="row d-flex justify-content-center mt-4">
                  <button className="col-md-2 smallButton mx-4">
                    Certificate
                  </button>
                  <button className="col-md-2 smallButton mx-4">Receipt</button>
                  {isLoggedIn && (
                    <button
                      className="col-md-2 smallButton mx-4"
                      onClick={this.logout}
                    >
                      Logout
                    </button>
                  )}

                    <button
                      className="col-md-2 smallButton mx-4"
                      onClick={this.getPass}
                    >
                      Get Pass
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    else {
      return <div>Loading...</div>;
    }
  }
}

export default Profile;
