import React, { useEffect, useState } from 'react'
import instance from '../axiosConfig';
import { Link, useLocation } from 'react-router-dom';

const Contacts = () => {
    const [contacts,setContacts]=useState(null);
    const location =useLocation();
    useEffect(
        ()=>{
            fetchContacts()
        },
        [location]
    )

    const fetchContacts=async ()=>{
       const fetchedContacts= await instance.get('/contacts/get');
       console.log(fetchedContacts.data.content)
        setContacts(fetchedContacts.data.content);
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
                            <th>UserId</th>
                            <th>Car Plate No</th>
                            <th>Paid Price:</th>
                            
                        </tr>
                       {
                        contacts?
                            (
                               contacts.map((c,idx)=>{
                                return (
                                    <tr key={c.id} className='test-drive-row' height='10px'>
                                        <td>{idx+1}</td>
                                        <td>{
                                            
                                               <p>
                                                   <strong> {c.userId}</strong>
                                                </p>
                                            }
                                        </td>
                                        <td width='30%'>
                                           
                                            <p>
                                             <strong>{c.carPlateNo}</strong>
                                            </p>
                                        </td>
                                        <td>
                                           <p>
                                            <strong>{c.paidPrice}</strong>
                                           </p>
                                        </td>
                                        
                                    </tr>
                                )
                               })
                            )
                        :
                        <h3>Fetching Contacts...</h3>
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

export default Contacts