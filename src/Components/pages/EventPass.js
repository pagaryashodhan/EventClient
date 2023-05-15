import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { async } from '@firebase/util';
import pccoe from "../../Images/pccoe.png";
import passtitle from "../../Images/pass.png";
import robo from "../../Images/robo.png";
import PraxisNav from "../widgets/CommonNav";
import { useLocation } from 'react-router-dom';
const url = "https://api.pccoeieee.org/";

const EventPass = () => {
  

  const event=useLocation();
console.log(event.state)

const [pass,getPass]=useState({});
useEffect(()=>{
getPass(event.state)
},[])

 const [isLoading,setLoading]=useState(false);


 function startTime(start){
  var d = new Date(start);
  

return d.getUTCDate(); // Hours
 }

 function endTime(end){
  var d= new Date(end);

return d.getUTCHours(); // Hours
 }

 
  return (
    <div>
      {isLoading ? <div>Loading..</div> : 
      <div id="particles-js">
      <div id="my-particles">
        {/* <Particle /> */}
      </div>
      <PraxisNav isLoggedIn={false} />
      <div className="bg-circles"></div>
      <div className='pass-wrapper'>
      <div className='eventpass'>
      <div className='pass-header'>
    <div className='top-line'>
      
      <img id='passlogo' src={passtitle}/>
      <img id='pccoelogo' src={pccoe}  width="4em"/>
    </div> 
    <div className='pass-btm-img'>
    <img id='roboimg' src={robo} />
      
      </div>
      
      </div>
      <div className='pass-bottom'>
         <div className='passbtm-header'>
         <h3>{pass.event_name}</h3>
         <div className='invite-msg'> 
         <b> Hi {pass.name} ,</b>
          <p> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; You are invited to join <i> <b>{pass.event_name}</b></i> event in Pimpri Chinchwad College of Engineering, Pune. </p>
         </div>
           </div>
          
           <div className='pass-venue'>
            <p> Venue: {pass.venue}<br/>
            Starting Date: {startTime(pass.start_date)} <sup>th</sup> March 2023</p>
            
       
            
             </div>
           <div className='pass-regards'>
            <p>
              Regards, <br/> Team ITSA.
            </p>
            </div>
           <div className='pass-email'>
            <p>
            {pass.email}
            </p>
            </div>
            </div>
       </div>
        </div>
       </div>} 
    </div>
  )
}

export default EventPass