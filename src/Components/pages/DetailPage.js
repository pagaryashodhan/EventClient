import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaChevronCircleDown } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import { useNavigate } from "react-router-dom";
import checkLogedIn from "../auth/checkLogin";

function DetailPage() {
  let isLoggedIn;
  useEffect(() => {
    isLoggedIn = checkLogedIn();
  });
  const navigate = useNavigate();

  const saveData = localStorage.getItem("data");
  const parseData = JSON.parse(saveData);
  const isPccoe = parseData.isPCCOE;

  const [otherCollegeField, setOtherCollegeField] = useState(false);
  const [otherBranchField, setOtherBranchField] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [college, setCollege] = useState(isPccoe ? "PCCOE" : "");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const url = "https://api.pccoeieee.org";
  const [loading, setLoading] = useState(false);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    console.log(firstName);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    console.log(lastName);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
    console.log(year);
  };

  // const [firstName,setLastName]=useState('');

  const selectOtherCollege = (e) => {
    let selectedCollege = document.getElementById("selectedCollege").value;
    if (selectedCollege === "OTHER") {
      setOtherCollegeField(true);
    } else {
      setOtherCollegeField(false);

      setCollege(e.target.value.toString());
    }
  };

  const selectOtherBranch = (e) => {
    let selectedBranch = document.getElementById("selectedBranch").value;
    if (selectedBranch === "OTHER") {
      setOtherBranchField(true);
    } else {
      setOtherBranchField(false);
      setBranch(e.target.value.toString());
      // if(isPccoe){setBranch("PCCOE")}
      console.log(branch);
    }
  };

  const handleOtherBranch = (e) => {
    setBranch(e.target.value);
  };

  const handleOtherCollege = (e) => {
    setCollege(e.target.value);
    console.log(college);
  };

  const validationMessage = (message) => {
    setValidationMsg(message);
    setTimeout(function () {
      setValidationMsg("");
    }, 5000);
  };
  const validateFields = () => {
    if (firstName.length === 0) {
      validationMessage("First Name cannot be empty");
      return false;
    } else if (lastName.length === 0) {
      validationMessage("Last Name cannot be empty");
      return false;
    } else if (branch === "") {
      validationMessage("Branch must be selected");
      return false;
    } else if (year === "") {
      validationMessage("Year must be selected");
      return false;
    }
    return true;
  };
  const savedData = localStorage.getItem("data");
  const parsedData = JSON.parse(savedData);
  const email = parsedData.email;
  const mobile = parsedData.mobile;
  const password = parsedData.password;

  const handleSubmit = (e) => {
    console.log(college);
    if (validateFields()) {
      e.preventDefault();
      const payload = {
        email: email,
        first_name: firstName,
        mobile: parseInt(mobile),
        last_name: lastName,
        college: college,
        year: parseInt(year),
        password: password,
        branch,
      };
      console.log(payload);
      axios.post(url + "/auth/signup", payload).then((response) => {
        console.log(response.data);
        if (response.data.status) {
          localStorage.clear();
          console.log(response.data.data["access_token"]);
          localStorage.setItem("token", response.data.data["access_token"]);
          navigate("/login");
        } else {
          validationMessage(response.data.message);
        }
      });
    }
  };

  return (
    <div id="particles-js">
      <div id="my-particles">
        <Particle />
      </div>
      <PraxisNav isLoggedIn={isLoggedIn} />
      <div className="bg-circles"></div>
      <div className="detailCardComponent" style={{ color: "white" }}>
        <h1 className="cardHeading mb-3" style={{ fontWeight: "600" }}>
          Details
        </h1>
        <form>
          <div style={{ fontSize: "1.1rem" }}>First Name</div>
          <input
            type="text"
            name="firstname"
            id="firstname"
            onChange={handleFirstName}
            className="my-3"
            placeholder="First Name"
          />
          <div style={{ fontSize: "1.1rem" }}>Last Name</div>
          <input
            type="text"
            name="lastname"
            id="lastname"
            onChange={handleLastName}
            className="my-3"
            placeholder="Last Name"
          />
          <div style={{ fontSize: "1.1rem" }}>College</div>
          <div>
            <input
              type="text"
              name="college"
              id="college"
              onChange={handleOtherCollege}
              disabled={isPccoe ? true : false}
              value={isPccoe ? "PCCOE" : null}
              className="my-3"
              placeholder="College"
            />

            <div className="downicon">
              <FaChevronCircleDown />
            </div>
          </div>

         
          <input
            type="text"
            name="lastname"
            id="name"
            className="my-3"
            placeholder="Other College Name"
            onChange={handleOtherCollege}
            style={
              otherCollegeField ? { display: "block" } : { display: "none" }
            }
          />
          <div style={{ fontSize: "1.1rem" }}>Branch</div>
          <div>
            <select
              className="detailOption"
              id="selectedBranch"
              onChange={selectOtherBranch}
            >
              <option value="">Select branch</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
              <option value="ENTC">ENTC</option>
              <option value="MECH">Mechanical</option>
              <option value="CIVIL">Civil</option>
              <option value="AI & ML">AI & ML</option>
              <option value="OTHER">OTHER</option>
            </select>
            <div className="downicon">
              <FaChevronCircleDown />
            </div>
          </div>
          <input
            type="text"
            name="lastname"
            id="name"
            className="my-3"
            placeholder="Other Branch Name"
            onChange={handleOtherBranch}
            style={
              otherBranchField ? { display: "block" } : { display: "none" }
            }
          />
          <div style={{ fontSize: "1.1rem" }}>Year</div>
          <div>
            <select className="detailOption" onChange={handleYear}>
              <option value="">Select Year</option>
              <option value="1">First Year</option>
              <option value="2">Second Year</option>
              <option value="3">Third Year</option>
              <option value="4">Fourth Year</option>
            </select>
            <div className="downicon">
              <FaChevronCircleDown />
            </div>
          </div>
          <span
            className="errorMessage"
            style={{ paddingTop: "20px", color: "yellow", fontWeight: "bold" }}
          >
            {validationMsg}
          </span>
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              role="status"
              style={loading ? { display: "block" } : { display: "none" }}
            ></div>
          </div>
          <input
            type="submit"
            className="mt-4 loginButton"
            style={loading ? { display: "none" } : { display: "block" }}
            value="Register"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default DetailPage;
