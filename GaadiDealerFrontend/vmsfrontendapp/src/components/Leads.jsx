import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

const Leads = () => {
    const [leads,setLeads]=useState([]);

    const location=useLocation();
    const navigate=useNavigate();
    const [loggedInUser,setLoggedInUser]=useState(null);

    useEffect(
        ()=>{
            fetchLeads();
            fetchLoggedInUser();
        }
        ,
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
    

    const fetchLeads=async ()=>{
        const fetchedLeads=await instance.get("/leads/getLeads");
        setLeads(fetchedLeads.data.content);
    };

    const verificationStatusUpdate=async(l,e)=>{
        if(e.target.value==='yes')
        {
       await instance.patch(`/leads/updateStatus/${l.id}`,{
        "isVerified":true
       });      
    }  
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
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-between" style={{width:"80%"}}>
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
                                <Link className="nav-link" to='/contacts'>Contacts</Link>
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
    
        <div>
           <table className='table-body' cellPadding='15%' cellSpacing='10%' width="80%" border='2px solid purple' >
                        <tr>
                            <th>Sr.no</th>
                            <th>Lead-details</th>
                            <th>Buy Status</th>
                            <th>Verification Document Download</th>
                            <th>isVerified</th>
                        </tr>
                       {
                        leads.length>0?
                            (
                               leads.map((l,idx)=>{
                                return (
                                    <tr key={l.id}>
                                        <td>{idx+1}</td>
                                        <td>{
                                            <>
                                               
                                                <p>
                                                   <strong>UserId:</strong> {l.emailId}
                                                </p>
                                                <p>
                                                   <strong>CarId:</strong>{l.carId}
                                                </p>
                                            </>
                                            }
                                        </td>
                                        <td>
                                            {
                                                l.buy?<p style={{color:'green', marginRight:'10%'}}>Yes</p>:<p style={{color:'orange', marginRight:'10%'}}>No</p> 
                                            }
                                            
                                        </td>
                                        <td>
                                            {
                                             <button onClick={()=>{
                                                const link=document.createElement('a');
                                                link.href=l.uploadedDoc;
                                                link.target='_blank'
                                                document.body.appendChild(link);
                                                link.click();
                                                link.remove();
                                             }} style={{borderRadius:'15px', color:'orange'}}>
                                               Open Doc </button>                                 
                                            }
                                        </td>
                                        <td>
                                            {
                                                <select onChange={(e)=>verificationStatusUpdate(l,e)} name='statusoption'>
                                                    <option value=''>Select</option>
                                                    <option value='yes' style={{backgroundColor:'olive'}}>Yes</option>
                                                    <option value='no' style={{backgroundColor:'olive'}}>No</option>
                                                </select>
                                            }
                                            {
                                                l.isVerified?<p style={{color:'green', marginRight:'10%'}}>Yes</p>:<p style={{color:'orange', marginRight:'10%'}}>No</p> 
                                            }
                                        </td>
                                    </tr>
                                )
                               })
                            )
                        :
                        <h3>Fetching Leads...</h3>
                       }
                    </table>
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

export default Leads