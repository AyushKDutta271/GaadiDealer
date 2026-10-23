import React, { useEffect, useState } from 'react'
import '../assets/componentscss/HomeUser.css'
import carAd from '../assets/videos/carsAd.mp4'

import { Link, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

const HomeUser = () => {

const location=useNavigate();
const [cars,setCars]=useState([]);
const [offerNotification,setOfferNotification]=useState(false);

useEffect(
    ()=>{
       fetchCars();
       const tId=setTimeout(()=>{
        setOfferNotification(true);
       },3000);

       

       return ()=>clearTimeout(tId);
    },
    [location]
);


const crossDisplayOff=()=>{
  setOfferNotification(false);
}


const carDescs=[
    <p>The 2JZ-GTE Engine: Powered by a legendary 3.0-liter twin-turbo inline-6 engine, renowned for its bulletproof cast-iron block that can handle massive horsepower modifications.</p>,
    <p>mid-engine Japanese sports car that famously revolutionized the supercar market by offering everyday reliability and exotic performance</p>,
    <p>The Mahindra BE 6e is a cutting-edge, fully electric coupe-SUV featuring an aggressive</p>,
    <p>Equipped with ultra-slim LED headlamps and intricate geometric patterns on the lower bumper</p>,
    <p> Ford GT is a high-performance, mid-engine American supercar built as a spiritual and technological successor to the historic, Le Mans-winning Ford GT40</p>

]
const fetchCars=async ()=>{
   const gotCars= await instance.get("/cars/viewVehicles");
   console.log("got cars: ",gotCars.data.content);
   console.log("got images: ", gotCars.data.content[0].carImages[0]);
    setCars(gotCars.data.content);
}

const navigate=useNavigate();

const clickHandler=(carId)=>{
navigate(`/viewACar/${carId}`)
}


  return (
    <>
    <div className='homeUser-body'>
         <nav className="navbar navbar-expand-lg  ">
            <div className="container-fluid">
                <a className="navbar-brand navLogo" href="#" >GaadiDealer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between" style={{width:"80%"}}>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/sellVehicle'>Sell Vehicle</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to='/buyVehicle' >Buy Vehicle</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/viewTestDrives' >TestDrives</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#" >Contact Info</Link>
                        </li>
                        
                    </ul>  
                    <div className="nav-item" style={{marginRight:"5%",border:"2px solid black"}}>
                            <a className="nav-link" href="#">Profile</a>
                    </div> 
                </div>
            </div>
         </nav>
        
        {/* <div>
          {
            cars.map((car,idx)=>{
              return (
                <div key={car.id}>
                  <div>
                    <img src={car.carImages[0]} style={{height:"200px",width:"100%",objectFit:"cover", borderRadius:"8px"}}/>
                  </div>

                  <div>
                      <p>{car.carBrand}</p>
                      <p>{car.carPlateNo}</p>
                      <p>{car.price}</p>
                      {
                        carDescs[idx]
                      }
                  </div>
                </div>
              )
             
            })
          }
        </div>    */}
        
      <div className='home-content-body' >
        
        <div id='offer-notification' style={{display:offerNotification?'block':'none', width:'20%', position:'fixed', top:'50%',right:'10%',zIndex:3, background:" rgba(75,50,60,0.5)", padding:"2%",borderRadius:'10%'}}>
                <h3 className='d-flex justify-content-between'>Great Grand Offer!<span onClick={crossDisplayOff} style={{fontSize:'20px'}}>&#10060;</span></h3>
                <h5>Applying testdrives before 28th Oct, will get you 10% off on brands!</h5>
                <p>hurry up!</p>
        </div>
        <h3 align='center' style={{margin: "3% 8%"}} id='welcome-heading'> Drive loud. Sell smart. Own the night</h3>
        <p style={{textIndent:'150px', lineHeight:'25px', wordSpacing:'20px',fontFamily:"monospace"}}>
          <em>Step into <strong>GaadiDealer</strong>, where the city’s finest machines wait beneath a skyline of neon rain and electric possibility. Scan through a living garage of cars, search the grid for your perfect ride, and filter the chaos by brand, budget, and the price that fits your future. Lock in a test drive with a few taps, feel the engine wake beneath your hands, and let the holographic headlights cut through the night. Then load up your family, choose a horizon, and disappear into a sweet, endless long drive—where every road glows like a circuit and every journey feels like the future.</em>
        </p>
        
        <div id="carouselExampleInterval" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{width:"50%",margin:"25% auto"}}  >
          <h5 align='center'>Top brands on offers:</h5>
          <div className="carousel-inner">
            {
              cars.map((car,idx)=>{
                return (
                    <div className={idx===0?"carousel-item active":"carousel-item"} data-bs-interval="10000" key={car.id}>
                            
                      <img src={car.carImages[0]} style={{height:"400px",width:"100%",objectFit:"cover", borderRadius:"8px"}} className="d-block w-100" alt="..."/>
                              
                      <div class="carousel-caption d-none d-md-block">
                            <h5 style={{marginBottom:"40%"}}>{car.carBrand}</h5>
                            <p>{carDescs[idx]}</p>
                            <button type='button'>View</button>
                      </div>
                    </div>
                    
                )
              })
            }
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
          </button>

           
        </div>
       
       
          <video style={{width:'25%' ,height:'auto',position:'sticky',bottom:'0%',left:'1%', zIndex:3}} autoPlay muted loop>
                <source src={carAd} type='video/mp4'/>
          </video> 
      </div>

      


      <div className='footer-body'>
      <div>
            <h3><i class="fa-duotone fa-solid fa-address-book"></i>Address:</h3>
            <p>Ayush Kamal Dutta</p>
            <p>42 Neon Circuit, Sector 21</p>
            <p>Pune, Maharashtra 411045,</p>
            <p>India</p>
      </div>
      <div>
            <h3>Contact Links</h3>
            <p><i class="fa-solid fa-phone"></i>8983504881</p>
            <p><i class="fa-solid fa-envelope"></i>duttaayush732@gmail.com</p>
            <p><i class="fa-brands fa-microsoft"></i>ayush@outlook.co.in</p>
      </div>
      <div>
            <p>FAQs</p>
            <p>Privacy Policy</p>
            <p>Terms and Conditions</p>
            <p>Cookie Policy</p>
      </div>
    </div>
    </div>

    
    </>
  )
}

export default HomeUser