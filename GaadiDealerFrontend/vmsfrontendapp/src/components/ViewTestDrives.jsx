import React, { useEffect, useState } from 'react'
import instance from '../axiosConfig';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/componentscss/HomeAdmin.css'
import '../assets/componentscss/ViewTestDrives.css'
const ViewTestDrives = () => {

    const [testDrives,setTestDrives]=useState([]);
    const [cars,setCars]=useState([]);
    const [leads,setLeads]=useState([]);
    const location=useLocation();
    const [doc,setDoc]=useState(null);
    const [loggedInUser,setLoggedInUser]=useState(null);
    useEffect(
        ()=>{
            
            fetchTestDrives();
            fetchCar();
            fetchLeads();
            fetchLoggedInUser();
            console.log(testDrives);
            console.log(cars);
            console.log("fetched leads: ",leads);
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
   
    const fetchTestDrives=async ()=>{
             const email=  await instance.get('/me');
            const user=await instance.get("/users/getUserByEmailId",{
            params:{
             emailId:email.data
             }
             });
            setLoggedInUser(user.data);
             const fetchedTestDrives= await instance.get(`/testdrives/getTestDrivesByUserId/${user.data.id}`);
            setTestDrives(fetchedTestDrives.data.content);
        
      
    
    }

    const fetchLeads=async()=>{
        const leadsData= await instance.get("/leads/getLeads");
        setLeads(leadsData.data.content);

    }

    const fetchCar=async ()=>{
        const fetchedCar=await instance.get(`/cars/viewVehicles`);
        setCars(()=>fetchedCar.data.content); 
        
    }

    const downloadDoc=async (t)=>{
      
        console.log("testdrive",t);
      const filteredLeads= leads.filter(l=>l.emailId===t.emailId);
      
        
      const response=  await instance.get(`leads/customerVerificationDoc/download/${filteredLeads[0].id}`,
            { responseType: "blob" }
        );

         const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",  //why?
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `verification-doc-${filteredLeads[0].id}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    
    
    }

    const inputHandler=(e)=>{
        setDoc(e.target.files[0]);
    }

    const submitDoc=async (e,t)=>{
        e.preventDefault();
        const fetchedLead=leads.filter(lead=>{
            if(lead.emailId===t.emailId)
                return true;
        });
        console.log(doc, t);
        console.log('fetchedLead',fetchedLead)
        try{
            const formData = new FormData();
            formData.append("docFile",doc);
            for(const [key,value] of formData)
            {
                console.log(key,value);
            }
            console.log(formData)
             await instance.put(`/leads/customerVerificationDoc/upload/${fetchedLead[0].id}`,formData,{
                headers: {
    "Content-Type": "multipart/form-data"  //why this was not done during carimages upload...it simply worked with formdata
  }
             }
             );
        }
        catch(err)
        {
            console.error(err);
        }
       
    }

    const checkVerifiyStatus=(t)=>{

         const foundLead=leads.find(l=>
            {
                const matches=l.testDriveId==t.id;
                console.log("t-id:",t.id);
                console.log("l's t-id:",l.testDriveId);
                console.log("matches? ",matches);
                return matches;
            }
        );

        console.log(foundLead)
      if(foundLead)
        { 
        console.log(foundLead);
        return foundLead.isVerified; 
        }
        else
        {
        return false;
        }
    }
    const navigate=useNavigate();
    const paymentDirect=(tId)=>{
          navigate(`/checkout/${tId}`);
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

          
                <div>
                    <table className='table-body' cellPadding='15%' cellSpacing='10%' width="80%" border='2px solid purple' >
                        <tr>
                            <th>Sr.no</th>
                            <th>Testdrive-details</th>
                            <th>schedule-confirmation</th>
                            <th>Verification Doc Download</th>
                            <th>Verification Doc Upload</th>
                            <th>Checkout</th>
                        </tr>
                       {
                        testDrives?
                            (
                               testDrives.map((t,idx)=>{
                                return (
                                    <tr key={t.id} className='test-drive-row' height='10px'  >
                                        <td>{idx+1}</td>
                                        <td>{
                                            <>
                                                <p>
                                                   <strong>Date:</strong> {t.dateAndTimeOfTestDrive.split('T')[0]}
                                                </p>
                                                <p>
                                                    <strong>Time:</strong> {t.dateAndTimeOfTestDrive.split('T')[1]}
                                                </p>
                                                {}
                                                <p>
                                                   <strong>Requested Car for testdrive:</strong> {
                                                        cars.filter(c=>{console.log("car's id: ",c.id);return c.id==t.carId}).map(c=>{console.log(c.carBrand);return c.carBrand})
                                                    }
                                                </p>
                                            </>
                                            }
                                        </td>
                                        <td>
                                            {
                                                t.isDateConfirmed?<p style={{color:'green',backgroundColor:'ivory'}}><strong>Confirmed!</strong> <em>Check your email for testdrive details!</em></p>:<p style={{color:'yellow'}}>wait for update</p>
                                                
                                            }
                                            {
                                                console.log(t.isDateConfirmed)
                                            }
                                        </td>
                                        <td>
                                            {
                                                t.isDone?<button type='button' onClick={()=>downloadDoc(t)} style={{borderRadius:'15px', color:'orange'}}>Dowload</button>:null
                                            }
                                        </td>
                                        <td>
                                            <form onSubmit={(e)=>submitDoc(e,t)}>
                                                {t.isDone?
                                                <>
                                                <input type='file' name='Upload' onChange={inputHandler}/>
                                                <button type='submit'>Upload</button>
                                                </>
                                                :null}

                                            </form>
                                        </td>
                                        <td>
                                            {
                                               checkVerifiyStatus(t)?<button type='button' onClick={()=>paymentDirect(t.id)} value='clicked' style={{borderRadius:'15px', color:'orange'}} className='btn btn-success'>Purchase</button>:null
                                            }
                                            
                                            
                                        </td>
                                    </tr>
                                )
                               })
                            )
                        :
                        <h3>Fetching testdrives...</h3>
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

export default ViewTestDrives