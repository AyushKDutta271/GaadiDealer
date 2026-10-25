import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import instance from '../axiosConfig';
import '../assets/componentscss/HomeAdmin.css'

const HomeAdmin = () => {
    const location=useLocation();
    const [noOfSoldCars,setNoOfSoldCars]=useState(0);
    const [totalCars,setTotalCars]=useState(0);
    const [totalRevenue,setTotalRevenue]=useState(0);
    const [totalConversions,setTotalConversions]=useState(0);
    const [totalLeads,setTotalLeads]=useState(null);
    const [totalDoneTestDrives,setTotalDoneTestDrives]=useState(0);
    const [totalTestDrives,setTotalTestDrives]=useState(0);

    const [loggedInUser,setLoggedInUser]=useState(null);
useEffect(
    ()=>{
      
      fetchNoOfSoldCars();
      fetchAllDoneTestDrives();
      fetchAllTestDrives();
      fetchLeadsConversion();
      fetchTotalCars();
      fetchTotalLeads();
      fetchTotalRevenue();
      fetchLoggedInUser();
    },
    [location]
);
const fetchLoggedInUser=async ()=>{
   const emailId= await instance.get('/me');
   const user=await instance.get('/users/getUserByEmailId',{
    params:{
        emailId:emailId.data
    }
   });
   setLoggedInUser(user.data);
}
const fetchNoOfSoldCars=async ()=>{
   const num= await instance.get(`/cars/getAllSoldCars`);
  setNoOfSoldCars(num.data);
}

const fetchTotalCars=async()=>{
    const num=await instance.get(`/cars/getCountOfAllCars`);
    setTotalCars(num.data);
}

const fetchTotalRevenue=async()=>{
    const num=await instance.get(`/cars/getTotalMoneyEarned`);
    setTotalRevenue(num.data);
}

const fetchLeadsConversion=async()=>{
    const num=await instance.get(`/contacts/getAll`);
    setTotalConversions(num.data);
}

const fetchTotalLeads=async ()=>{
    const num=await instance.get(`/leads/getTotalLeads`)
    setTotalLeads(num.data);
}

const fetchAllDoneTestDrives=async()=>{
    const num=await instance.get(`/testdrives/getAllDoneTestDrives`);
    setTotalDoneTestDrives(num.data);
}

const fetchAllTestDrives=async()=>{
    const num=await instance.get(`/testdrives/getTotalTestDrives`);
    setTotalTestDrives(num.data);
}







  return (
    <>
    <div className='admin-home-content'>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand  navLogo" href="#">GaadiDealer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between" style={{border:"2px solid black",width:"80%"}}>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/admin'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/addVehicle'>Add Vehicle</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to='/viewTestDrivesAdmin' >TestDrives</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='/viewLeads' >Leads</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='/contacts' >Contacts</Link>
                        </li>
                        
                    </ul>  
                    <div className="nav-item" style={{marginRight:"3%",width:"10%",height:'30px',backgroundColor:'palegreen'}}>
                            <Link className="nav-link" to='/admin' style={{margin:"3% auto",width:'8%',borderRadius:'100%'}}>{loggedInUser?<p><strong>{loggedInUser.fullName.charAt(0)}</strong></p>:<p>...</p>}</Link>
                    </div> 
                </div>
            </div>
        </nav>

        <div>
            
          <div className='stats-content'> 
            <div className='row stats-row1 mt-5'>
                <div className='stats-body1 col-md-4'>
                    <h4>Cars Sold:</h4>
                    <p className='mt-5'><strong>Total Sold Cars: (Sold count){noOfSoldCars}/(total inventory){totalCars}</strong></p>
                </div>
                <div className='stats-body2 col-md-3'>
                    <h4>Total Revenue:</h4>
                    <p className='mt-5'><strong>Total Earned Revenue: {totalRevenue}</strong></p>
                </div>
            </div>
            
         
            
         
            <div className='row stats-row2 mt-5'>
            <div className='stats-body3 col-md-3'>
                <h4>Test Drives:</h4>
                <p className='mt-5'><strong>Total Done Testdrives: (Completed ){totalDoneTestDrives}/(total test drives){totalTestDrives}</strong></p>
            </div>
            <div className='stats-body4 col-md-4'>
                <h3>Lead Conversion:</h3>
                <p className='mt-5'><strong>Leads Conversion: {totalConversions}/{totalLeads}</strong></p>
            </div>
            </div>
           </div> 

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

export default HomeAdmin