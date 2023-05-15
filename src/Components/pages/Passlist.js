import React, { useEffect, useState } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { async } from '@firebase/util';
import pccoe from "../../Images/pccoe.png";
import passtitle from "../../Images/pass.png";
import robo from "../../Images/robo.png";
import PraxisNav from "../widgets/CommonNav";
import { useNavigate } from 'react-router-dom';
const url = "https://api.pccoeieee.org/";

const Passlist = () => {
  const [pass,getPass]=useState([]);
  const [events,getEvents]=useState([]);
 const [isLoading,setLoading]=useState(false);
 const navigate=useNavigate();
useEffect(()=>{


let decode=jwt_decode(localStorage.getItem('token'))

  axios
  .get(`${url}user/get-pass/${decode.id}`)
  .then(async function (response) {
  setLoading(true)
  getPass(await response.data.data)
    setLoading(false)
  })
  .catch((err) => console.log(err));

},[])


const gotoPass=event=>()=>{
  console.log(event)
 navigate('/pass',{state:event})
}

console.log(pass)

  return (
    <div>
      {isLoading ? <div>Loading..</div> :
      <div>
        <div id="particles-js">


        <div id="my-particles">
      
      </div>
        <PraxisNav isLoggedIn={false} />
         <div className="bg-circles">
     <div className='passlist'>
     <div className='passlist-title'>
          <h3> Registered Events</h3>
          </div> 
        <div className='pass-cards'>
      
      {pass && pass.map((event)=>(<div className='pcard' key={event.id}>
         
         <h4>{event.event_name}</h4> 
         <button className='btn btn-success' onClick={gotoPass(event)}>View Pass</button>

      </div>))}
     </div>

     </div>
        
     </div> 
        </div>
          
         

      </div> 
     } 
    </div>
  )
}

export default Passlist