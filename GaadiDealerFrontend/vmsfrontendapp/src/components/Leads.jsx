import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import instance from '../axiosConfig';

const Leads = () => {
    const [leads,setLeads]=useState([]);

    const location=useLocation();

   

    useEffect(
        ()=>{
            fetchLeads();
            
        }
        ,
        [location]
    );

    

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
    
        <div>
           <table>
                        <tr>
                            <th>Sr.no</th>
                            <th>lead-details</th>
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
                                        <td>{idx}</td>
                                        <td>{
                                            <>
                                                <p>
                                                    {`UserId:${l.emailId}, \nCarId:${l.carId}`}
                                                </p>
                                                
                                            </>
                                            }
                                        </td>
                                        <td>
                                            {
                                                l.buy?<p>Yes</p>:<p>No</p> 
                                            }
                                            
                                        </td>
                                        <td>
                                            {
                                             <input type='file' download/>                                                      
                                            }
                                        </td>
                                        <td>
                                            {
                                                <select onChange={(e)=>verificationStatusUpdate(l,e)} name='statusoption'>
                                                    <option value=''>Select</option>
                                                    <option value='yes'>Yes</option>
                                                    <option value='no'>No</option>
                                                </select>
                                            }
                                            {
                                                l.isVerified?<p>Yes</p>:<p>No</p> 
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
    
    </>
  )
}

export default Leads