import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// 
import React from "react";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginCard from "./Components/auth/LoginCard";
import SignupCard from "./Components/auth/SignupCard";
import VerificationCard from "./Components/auth/VerificationCard";
import DetailPage from "./Components/pages/DetailPage";
// import OtherPage from "./Components/OtherPage";
import EventsPage from "./Components/pages/Eventspage";
import LandingPage from "./landingpage";
import Footer from "./Components/widgets/Footer";

import Profile from "./Components/pages/Profile";
import Events from "./Components/pages/Events";
import CodmRegistration from "./Components/EventRegistrations/CodmRegistration";
import OurTeam from "./Components/pages/OurTeam";
import ResetPassword from "./Components/auth/ResetPassword";
import EventsPage2 from "./Components/pages/Eventspage2";

import PageNotFound from "./Components/widgets/PageNotFound";
import QrPage from "./Components/pages/Qrpage";
import PaymentButton from "./Components/paytm-button/PaymentButton";
import PaymentStatus from "./Components/paytm-button/PaymentStatus";
import Receipt from "./Components/pages/receipts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checkLogedIn from "./Components/auth/checkLogin";
import EventPass from "./Components/pages/EventPass";
import Passlist from "./Components/pages/Passlist";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
    if (isLoggedIn) {
      toast.success("🦄 Login Successful", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  });
 

  return (
    <Router>
      <Routes>
      
    
        <Route path="/" exact element={ <LandingPage/>  }  />
        <Route path="/login" exact element={<LoginCard />} />
        <Route path="/signup" exact element={<SignupCard />} />
        <Route path="/reset" exact element={<ResetPassword />} />

        <Route path="/verification" exact element={<VerificationCard />} />
        <Route path="/detailPage" exact element={<DetailPage />} />
        <Route path="/eventspage/:id" exact element={<EventsPage2 />} />
        {/* <Route path="/footer" exact element={<Footer />} /> */}
        <Route path="/Profile" exact element={<Profile />} />
        <Route path="/events" exact element={<Events />} />
        <Route path="/register/:id" exact element={<CodmRegistration />} />
        <Route path="/team" exact element={<OurTeam />} />
        <Route path="/pg" exact element={<PaymentButton />} />
        <Route path="/status/:orderId" exact element={<PaymentStatus />} />
        <Route path="/pass" exact element={<EventPass/>} />
        <Route path="/passlist" exact element={<Passlist/>} />

        {/* <Route path="/receipts" exact element={<Receipt />} /> */}

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>

    // </section>
  );
}

export default App;
