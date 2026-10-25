import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import instance from '../axiosConfig';

const ViewTestDrivesAdmin = () => {
  const [testDrives,setTestDrives]=useState([]);
 
  
    const [cars,setCars]=useState([]);
    const location=useLocation();
    
    const confirmFunction=async (e,id,t)=>{
        if(e.target.value==='confirm')
        {
            console.log("Inside confirm1");
            await instance.put(`/testdrives/updateTestDate/${id}`,{"isDateConfirmed":true});
            console.log("Inside confirm2");
            await instance.post(`/emails/send`,{
                "testdriveId":Number(id),
                "emailId":t.emailId,
                "dateAndTimeOfTestDrive":t.dateAndTimeOfTestDrive,
                "carId":Number(t.carId),
                "city":t.city,
                "isDateConfirmed":t.isDateConfirmed
            });
            console.log("Inside confirm3");
        }
        else{
            
             await instance.put(`/testdrives/updateTestDate/${id}`,{"isDateConfirmed":false})
    }
}

    useEffect(
        ()=>{
            fetchTestDrives();
            fetchCar();
           
            console.log(testDrives);
            console.log(cars)
        },
        [location]
    );

    
    const fetchTestDrives=async ()=>{
       const fetchedTestDrives= await instance.get("/testdrives/get");
       setTestDrives(fetchedTestDrives.data.content);
       
    }

    const fetchCar=async ()=>{
        const fetchedCar=await instance.get(`/cars/viewVehicles`);
        setCars(()=>fetchedCar.data.content); 
        
    }

    const testdriveDoneFunction=async (e,t)=>
    {
        if(e.target.value==='Done')
        {
           
            await instance.patch(`/testdrives/updateStatus/${t.id}`,{
                "isDone":true
            });

            console.log(t);
            await instance.post("/leads/save",{
                "testDriveId":t.id,
                "emailId":t.emailId,
                "carId":t.carId
                
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
                            <div className="nav-item" style={{marginRight:"5%",border:"2px solid black"}}>
                                    <Link className="nav-link" href="#">Profile</Link>
                            </div> 
                        </div>
                    </div>
                </nav>
                <div>
                    <table  className='table-body' cellPadding='15%' cellSpacing='10%' width="80%" border='2px solid purple'>
                        <tr>
                            <th>Sr.no</th>
                            <th>Testdrive-details</th>
                            <th>schedule-confirmation</th>
                            <th>Testdrive status:</th>
                            
                        </tr>
                       {
                        testDrives?
                            (
                               testDrives.map((t,idx)=>{
                                return (
                                    <tr key={t.id} className='test-drive-row' height='10px'>
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
                                                     <strong>Requested Car for testdrive:</strong>{
                                                        cars.filter(c=>{console.log("car's id: ",c.id);return c.id==t.carId}).map(c=>{console.log(c.carBrand);return c.carBrand})
                                                    }
                                                </p>
                                            </>
                                            }
                                        </td>
                                        <td width='30%'>
                                           
                                            <select name='confirmation'  onChange={(e)=>confirmFunction(e,t.id,t)}>
                                                <option value='' style={{backgroundColor:'olive'}}>Select</option>
                                                <option value='confirm' style={{backgroundColor:'olive'}}>Confirm</option>
                                                <option value='notAvailable' style={{backgroundColor:'olive'}}>Not Available!</option>
                                            </select>
                                            <div style={{width:'90%',margin:"3% auto"}}>
                                            {
                                              t.isDateConfirmed?<p style={{color:'green', marginRight:'10%'}}><strong>Confirmed</strong></p>:<p style={{color:'red',marginRight:'10%'}}><strong>Not available</strong></p>
                                            }
                                            </div>
                                        </td>
                                        <td>
                                            <select onChange={(e)=>testdriveDoneFunction(e,t)}>
                                                <option value='' style={{backgroundColor:'olive'}}>Select</option>
                                                <option value='Done' style={{backgroundColor:'olive'}}>Done</option>
                                            </select>
                                            <div style={{width:'90%',margin:"3% auto"}}>
                                            {t.isDone?<p style={{color:'green',marginRight:'5%'}}><strong>Done</strong></p>:<p style={{color:'yellow',marginRight:'5%'}}><strong>Not done</strong></p>}
                                            </div>
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

export default ViewTestDrivesAdmin