import React, { useEffect, useState } from 'react'
import instance from '../axiosConfig';
import {  useLocation, useNavigate } from 'react-router-dom';


const ViewTestDrives = () => {

    const [testDrives,setTestDrives]=useState([]);
    const [cars,setCars]=useState([]);
    const [leads,setLeads]=useState([]);
    const location=useLocation();

   
    useEffect(
        ()=>{
            fetchTestDrives();
            fetchCar();
            fetchLeads();
            
            console.log(testDrives);
            console.log(cars);
            console.log("fetched leads: ",leads);
        },
        [location]
    );

   
    const fetchTestDrives=async ()=>{
       const fetchedTestDrives= await instance.get("/testdrives/get");
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
      const filteredLeads= leads.data.content.filter(l=>l.emailId===t.emailId);
      
        
      const response=  await instance.get(`leads/customerVerificationDoc/download/${filteredLeads[0].id}`,
            { responseType: "blob" }
        );

         const blob = new Blob([response.data], {
        type: response.headers["content-type"] || "application/octet-stream",
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
    <div>
          
                <div>
                    <table>
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
                                    <tr key={t.id}>
                                        <td>{idx}</td>
                                        <td>{
                                            <>
                                                <p>
                                                    Requested date and time: {t.dateAndTimeOfTestDrive}
                                                </p>
                                                {}
                                                <p>
                                                    Requested Car for testdrive:{
                                                        cars.filter(c=>{console.log("car's id: ",c.id);return c.id==t.carId}).map(c=>{console.log(c.carBrand);return c.carBrand})
                                                    }
                                                </p>
                                            </>
                                            }
                                        </td>
                                        <td>
                                            {
                                                t.isDateConfirmed?<p>Confirmed  Check your email for testdrive details!</p>:<p>wait for update</p>
                                                
                                            }
                                            {
                                                console.log(t.isDateConfirmed)
                                            }
                                        </td>
                                        <td>
                                            {
                                                t.isDone?<button type='button' onClick={()=>downloadDoc(t)}>Dowload</button>:null
                                            }
                                        </td>
                                        <td>
                                            {
                                                t.isDone?<input type='file' upload/>:null
                                            }
                                        </td>
                                        <td>
                                            {
                                               checkVerifiyStatus(t)?<button type='button' onClick={()=>paymentDirect(t.id)} value='clicked'>Purchase</button>:null
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

        </div>
    </>
  )
}

export default ViewTestDrives