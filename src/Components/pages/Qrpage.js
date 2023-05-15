
import React, {useState} from "react";
import PraxisNav from "../widgets/CommonNav";
import Particle from "../widgets/Particle";
import qr from "../../Images/payment.jpg";
function QrPage() {
  const isLoggedIn =true;
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const setEmailState = (event) => {
    setEmail(event.target.value);
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(URL.createObjectURL(img));
      
    }
  };

  console.log(image);
    return (
<div id="particles-js">
        <div id="my-particles">
          <Particle />
        </div>

        <PraxisNav isLoggedIn={isLoggedIn} />
        <div className="bg-circles"></div>
            <div className="payment-page" style={{display: "flex", justifyContent: "center"}}>
            <div className="cardComponent">
       
                <div className="qr-block " style={{display: "flex", justifyContent: "center", flexFlow:"column", alignItems:"center"}} >
                <div className="input-label" style={{fontWeight:"bold", padding:"1em"}}>
            <marquee >Make Payment on the QR code and attach the screenshot and transaction Id   </marquee>
          </div>
                <div>
                <img src={qr} width="150em"/>
                </div>
                </div>
                <div className="payment-ticket">
                <div className="input-label">
            Transaction Screenshot <span style={{ color: "red" }}> * </span>
          </div>
          <input type="file" name="myImage" 
          onChange={onImageChange} 
          />
          </div>
          
          <div className="payment-ticket">
          <div className="input-label">
            Transaction ID <span style={{ color: "red" }}> * </span>
          </div>
          <input
            type="text"
            name="transaction-id"
            id="transaction-id"
            
            className="my-2"
            placeholder="Transaction ID*"
            // onChange={setEmailState}
            required
          />
          </div>
          

                <div className="payment-ticket">
                <input
            type="button"
            className="mt-4 loginButton"
            value="Submit"
            // onClick={loginUser}
            // style={loading ? { display: "none" } : { display: "block" }}
          />
                </div>
            </div>
            </div>
            </div>
        
    );
}

export default QrPage;