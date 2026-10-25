import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import instance from '../axiosConfig';
import '../assets/componentscss/Payment.css'
const Payment = () => {
    const {tId}=useParams();
    const location=useLocation();
    const [fetchedCar, setFetchedCar]=useState(null);
    const [fetchedLead,setFetchedLead]=useState(null);
    const [currentUser,setCurrentUser]=useState(null);

    const navigate=useNavigate();

    const [successPayment, setSuccessPayment]=useState(null);
    useEffect(
        ()=>{
            fetchLead();
            fetchLoggedInUser();
            
        },
        [location]
    )

    const fetchLead=async ()=>{
        const lead=await instance.get(`/leads/getLeadByTestDriveId/${tId}`);
        setFetchedLead(lead.data);
        const car=await instance.get(`/cars/viewVehicleById/${lead.data.carId}`);
        setFetchedCar(car.data);
    }

   

    const fetchLoggedInUser=async()=>{
        const emailId=await instance.get('/me');
        console.log(emailId.data)
        const user=await instance.get(`/users/getUserByEmailId`,{
            params:{
                emailId:emailId.data
            }
        });
        setCurrentUser(user.data);
    }

    const payClick = async () => {
  try {
    if (!fetchedCar || !fetchedLead) {
      alert("Payment details are not loaded yet");
      return;
    }

    const amountInPaise = fetchedCar.carPrice ;
    console.log(amountInPaise)
    // 1. Create order in Spring Boot backend
    const response = await instance.post("/payments/makePayment", {
      amount: amountInPaise,
      currency: "INR"
    });

    const order = response.data;
    console.log("Razorpay order:", order);

    const options = {
      key: 'rzp_test_Ts557PWjM1zned',
      amount: amountInPaise,
      currency: "INR",
      name: "GaadiDealer",
      description: `Payment for ${fetchedCar.carBrand}`,
      order_id: order.id, // Razorpay order ID, NOT fetchedLead.id
      handler: async function (paymentResult) {
        console.log("Payment success:", paymentResult);
        alert("Payment successful");

        
      },
      prefill: {
        name: currentUser?.fullName || "",
        email: currentUser?.emailId || ""
      },
      theme: {
        color: "#3399cc"
      }
    };

   

    const razorpay = new window.Razorpay(options);
    razorpay.open();
    await instance.patch(`/leads/updateByStatusOfALead/${fetchedLead.id}`,{
        'buy':true
    });

    
    navigate('/user')
  } catch (error) {
    console.error("Payment error:", error);
    alert("Payment could not be started");
  }
};
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
            <div>
                <div className='payment-body-content'>
                    <h3 align='center'>Payment Details:</h3>
                    {
                        fetchedCar && currentUser?
                            <>
                            <div>
                        
                                <img src={`${fetchedCar.carImages[0]}`} style={{height:"300px",width:'100%', objectFit:'cover', borderRadius:'15px'}}/>
                        
                            </div>
                            <div className='payment-details-body'>
                                <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car Brand:</strong> {fetchedCar.carBrand}</p>
                                <p style={{color:'hotpink',marginLeft:'3%'}}><strong  style={{color:'black'}}>Car Price:</strong>  {fetchedCar.carPrice}</p>
                                <p style={{color:'hotpink',marginLeft:'3%'}}><strong  style={{color:'black'}}>User Name:</strong>  {currentUser.fullName}</p>
                                <button type='button' onClick={payClick} style={{backgroundColor:'green',margin:'5% auto', borderRadius:'15px',width:'15%',marginLeft:'3%'}}>Pay</button>
                            </div>
                            </>
                            :
                            null
                    }
                    
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

export default Payment