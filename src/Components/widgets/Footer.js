import React from 'react';
import '../../App.css';
import linkedInImage from '../../assets/icons/linkedinLogo.png';
import instagramImage from '../../assets/icons/instagramLogo.png';


const Footer = (props) => {
    return (
        <div style={{background: "black", maxWidth: "100vw", overflow:"hidden"}}>

<div className='mx-12 p-3' >
<div className="" style={{display: "flex", justifyContent:"Center"}}>
                <a href="https://drive.google.com/file/d/1NvBY5Fff8hwLcf5azvYQXY0UxctLbqfK/view?usp=share_link" target={"_blank"}><button className="btn btn-success">Click to view Event Timeline </button> </a>
                
              
                  </div>
    </div>
<div className='mx-12 p-3' >
            <h4 className={`m-auto ssp-font text-center`}>Contact for any Technical Queries</h4>
            <div className=' contact-row '>
                  
              
                    <div className="pt-4 px-4" style={{textAlign:"center", fontSize: "1rem"}}>
<h6>Yash Jaybhaye</h6>
<h6>7972711324</h6>

                    </div>
                    <div className="pt-4 px-4" style={{textAlign:"center",  fontSize: "1rem"}}>
<h6>Dhananjay Gavali</h6>
<h6>8983631618</h6>

                    </div>
                 
              
                    <div className="pt-4 px-4" style={{textAlign:"center",  fontSize: "0.8rem"}}>
<h6>Yashodhan Pagar</h6>
<h6>7792888892</h6>

                    </div>
                    
                </div>
            </div>
            <hr className='mx-auto m-1' style={{maxWidth: "90%"}} />
        
        <div className="p-2 py-2 d-flex justify-content-evenly flex-wrap" >
            
            <div className='mx-3'>
                <h4 className={`m-auto ssp-font text-center`}>PCCOE</h4>
                <hr className='mx-auto m-1'/>
                <div className='d-flex justify-content-center'>
                    <div className="p-2"><a target="blank" href='https://www.linkedin.com/company/pccoe-pune'><img className='scale-hover' alt="LinkedInSocial Link" src={linkedInImage} width="32px" /></a></div>
                    <div className="p-2"><a target="blank" href='https://www.instagram.com/pccoepune/'><img className='scale-hover' alt="Instagram Social Link" src={instagramImage} width="32px" /></a></div>
                </div>
            </div>

            <div className='mx-3'>
                <h4 className={`m-auto ssp-font text-center`}>PCCOE IEEE</h4>
                <hr className='mx-auto m-1'/>
                <div className='d-flex justify-content-center'>
                    <div className="p-2"><a target="blank" href='https://www.linkedin.com/company/ieee-pccoe-student-branch'><img className='scale-hover' alt="LinkedInSocial Link" src={linkedInImage} width="32px" /></a></div>
                    <div className="p-2"><a target="blank" href='https://www.instagram.com/pccoeieee/'><img className='scale-hover' alt="Instagram Social Link" src={instagramImage} width="32px" /></a></div>
                </div>
            </div>
            
            <div className='mx-3'>
                <h4 className={`m-auto ssp-font text-center`}>NSCC PCCOE</h4>
                <hr className='mx-auto m-1'/>
                <div className='d-flex justify-content-center'>
                    <div className="p-2"><a target="blank" href='https://www.linkedin.com/company/nsccpccoe/'><img className='scale-hover' alt="LinkedInSocial Link" src={linkedInImage} width="32px" /></a></div>
                    <div className="p-2"><a target="blank" href='https://www.instagram.com/nsccpccoe/'><img className='scale-hover' alt="Instagram Social Link" src={instagramImage} width="32px" /></a></div>
                </div>
            </div>
            
            <div className='mx-3'>
                <h4 className={`m-auto ssp-font text-center`}>Codechef PCCOE</h4>
                <hr className='mx-auto m-1'/>
                <div className='d-flex justify-content-center'>
                    <div className="p-2"><a target="blank" href='https://www.linkedin.com/company/codechef-pccoe-chapter/'><img className='scale-hover' alt="LinkedInSocial Link" src={linkedInImage} width="32px" /></a></div>
                    <div className="p-2"><a target="blank" href='https://www.instagram.com/codechefpccoe/'><img className='scale-hover' alt="Instagram Social Link" src={instagramImage} width="32px" /></a></div>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default Footer
