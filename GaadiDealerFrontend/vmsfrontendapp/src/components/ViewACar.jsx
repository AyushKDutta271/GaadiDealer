import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../axiosConfig';


const ViewACar = () => {
    const [selectedCar,setSelectedCar]=useState(null);
     const [loggedInUser,setLoggedInUser]=useState(null);
    
    const params=useParams();
    const carId=params.carId;

    const navigate=useNavigate();
    const fetchSelectedCar=async ()=>{
           const fetchedCar= await instance.get(`/cars/viewVehicleById/${carId}`);
           console.log(fetchedCar.data);
            setSelectedCar(fetchedCar.data);
        }
    
    useEffect(
        ()=>{
            fetchSelectedCar();
            fetchLoggedInUser();
        }
        ,[carId]
    )    

const fetchLoggedInUser=async ()=>{
   const emailId= await instance.get('/me');
   const user=await instance.get('/users/getUserByEmailId',{
    params:{
        emailId:emailId.data
    }
   });
   setLoggedInUser(user.data);
}

    const clickHandler=(id)=>{
        navigate(`/testdrives/${id}`);
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
                                <Link className="nav-link active" aria-current="page" to="/user">Home</Link>
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
                        <div className="nav-item" style={{marginRight:"7%",width:"7%",height:'70px',backgroundColor:'black',borderRadius:'100%', position:'relative'}}>
                            <div className='nav-link ' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false"  style={{margin:"25% auto",width:'100%',borderRadius:'125px',color:'blue'}}>{loggedInUser?<p align='center' style={{fontSize:'23px'}}><strong>{loggedInUser.userType.charAt(0)}</strong></p>:<p>...</p>}</div>
                            <ul className="dropdown-menu" style={{position:'absolute',top:'100%',right:'50%', marginRight:'50px'} } aria-labelledby="navbarDropdown">
            
                                <li onClick={async()=>{await instance.post('/userlogout'); navigate('/login') }}><p className="dropdown-item" >Logout</p></li>
                            </ul>
                    </div>  
                    </div>
                </div>
             </nav>

            <div className='payment-body-content' >

            
        
        {
            selectedCar?
                <div className='car-container'>
                    <div className='car-container-image'>
                        <img src={selectedCar.carImages[0]} style={{height:"300px",width:'100%', objectFit:'cover', borderRadius:'15px'}}/>
                            
                    </div>
                    <p className='payment-details-body'>
                              
                            <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car Brand:</strong> {selectedCar.carBrand}</p>
                            <p style={{color:'hotpink',marginLeft:'3%'}}><strong  style={{color:'black'}}>Car Price:</strong> {selectedCar.carPrice}</p>
                            <button onClick={()=>clickHandler(selectedCar.id)} style={{backgroundColor:'green',margin:'5% auto', borderRadius:'15px',width:'15%',marginLeft:'3%'}}>Testdrive</button>
                    </p>
                    
                </div>
                    :
                    "No car is selected!"
        }
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

export default ViewACar