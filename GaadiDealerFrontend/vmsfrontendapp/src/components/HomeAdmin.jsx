import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

const HomeAdmin = () => {
    const location=useLocation();
    


useEffect(
    ()=>{
      
       

    },
    [location]
);

    




const navigate=useNavigate();

const clickHandler=(carId)=>{
navigate(`/viewACar/${carId}`)
}




  return (
    <>
    <div>
        <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">GaadiDealer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between" style={{border:"2px solid black",width:"80%"}}>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/sellVehicle'>Add Vehicle</Link>
                        </li>
                       
                        <li className="nav-item">
                            <Link className="nav-link" to='/viewTestDrives' >TestDrives</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to='/viewLeads' >Leads</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" href="#" >Contacts</Link>
                        </li>
                        
                    </ul>  
                    <div className="nav-item" style={{marginRight:"5%",border:"2px solid black"}}>
                            <Link className="nav-link" href="#">Profile</Link>
                    </div> 
                </div>
            </div>
        </nav>
        <div>
            
           
       
        </div>
    </div>
    </>
  )
}

export default HomeAdmin