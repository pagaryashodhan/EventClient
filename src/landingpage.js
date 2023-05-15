import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./landingPage.css";
import logo from "./Images/praxis-logo.svg";
import robot from "./Images/robot.svg";
import Mynav from "./Components/widgets/HomeNav";
import PreLoader from "../src/Components/Loader/PreLoader";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, springAnimation } from "./variants";
import checkLogedIn from "./Components/auth/checkLogin";
import Footer from "./Components/widgets/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import indigg from "./Images/indigg.png";
import sairaj from "./Images/sairaj.png";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const Navigate=useNavigate();
  const notify = () => toast("User logged In Successfully ! ");
  useEffect(() => {
    setIsLoggedIn(checkLogedIn());
    if (isLoggedIn) {
      // Navigate('/events')
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
  console.log(isLoggedIn);
  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div>
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
          <div className="landingpage">
            <div className="bg-circles"></div>
            <motion.div
              variants={fadeInUp(0, -100, 0, 0)}
              initial="initial"
              animate="animate"
              className="title"
            >
              <Mynav isLoggedIn={isLoggedIn} />
            </motion.div>

            <div className="home">
              <motion.div
                variants={fadeInUp(0, -200, 0, 0)}
                initial="initial"
                animate="animate"
                className="title"
              >
                <img src={logo} />
              </motion.div>
              <motion.div
                variants={springAnimation(500, 0, 0, 0, 0.2)}
                initial="initial"
                animate="animate"
                className="subtitle"
              >
                Unleashing Innovations
              </motion.div>

              <motion.div
                variants={staggerContainer(0.5, 0.5)}
                initial="initial"
                animate="animate"
                className="highlights row"
              >
                <motion.span
                  variants={fadeInUp(-0, 100, 0, 0)}
                  className="hg col-md-4 col-10"
                >
                  10 Events
                </motion.span>
                <motion.span
                  variants={fadeInUp(-0, 100, 0, 0)}
                  className="hg col-md-4 col-10"
                >
                 Prizes worth 2.10L
                </motion.span>
                <motion.span
                  variants={fadeInUp(-0, 100, 0, 0)}
                  className="hg col-md-4 col-10"
                >
                  7 Day long event
                </motion.span>
              </motion.div>
             
              <motion.div
                variants={staggerContainer(0.5, 0.5)}
                initial="initial"
                animate="animate"
                className="highlights row"
              >
                 <div className="sponser-block">
            <div className=" sponser-label ">
              Co-powered by <img src={indigg} width="80" />
            </div>
         
          </div> 
                </motion.div>
              <motion.div
                variants={staggerContainer(0.5, 0.5)}
                initial="initial"
                animate="animate"
                className="highlights row"
              >
                <motion.span
                  variants={fadeInUp(-0, 100, 0, 0)}
                  className="btn-cover hg col-md-3 col-10"
                >
                  <Link to={`/events`} style={{ textDecoration: "none" }}>
                    <div className="explore-btn">Explore Events</div>
                  </Link>
                </motion.span>
              </motion.div>
                                     
   
            </div>
            <motion.div
              variants={springAnimation}
              initial="initial"
              animate="animate"
            >
              <motion.img
                variants={fadeInUp(0, 400, 0, 0, 0)}
                initial="initial"
                animate="animate"
                src={robot}
                id="btm-img"
                alt="Robot"
              />
            </motion.div>
          </div>

          <div className="landing-page-footer">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}

export default LandingPage;

