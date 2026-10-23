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
        
                <div>
                    <table>
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
                                           
                                            <select name='confirmation'  onChange={(e)=>confirmFunction(e,t.id,t)}>
                                                <option value=''>Select</option>
                                                <option value='confirm'>Confirm</option>
                                                <option value='notAvailable'>Not Available!</option>
                                            </select>
                                            {
                                              t.isDateConfirmed?<p>Confirmed</p>:<p>Not available</p>
                                            }
                                        </td>
                                        <td>
                                            <select onChange={(e)=>testdriveDoneFunction(e,t)}>
                                                <option value=''>Select</option>
                                                <option value='Done'>Done</option>
                                            </select>
                                            {t.isDone?<p>Done</p>:<p>Not done</p>}
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

        
    </>
  )
}

export default ViewTestDrivesAdmin