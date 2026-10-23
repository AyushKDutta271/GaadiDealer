import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ViewCars = () => {
    const location=useNavigate();
    const [cars,setCars]=useState([]);
   

    useEffect(()=>{
        const response= axios.get("http://localhost:8080/cars/viewVehicles");
        setCars(response.data);
       
    },[location]);
        

  return (
    <>
    <h1>Available Cars:</h1>
        <div className='row'>
            {
                cars.map(c=>{
                    return (
                        <div className='col-4-md car-col-item'>
                            <div className='car-col-image'>
                                <img src={`data:image/jpeg;base64,${c.carImages[0]}`} alt='car Image' height='200px' width='350px'/>
                            </div>
                            <div className='car-col-body'>
                                <p>Car Brand: {c.carBrand}</p>
                                <p>Available in State: {c.state} </p>
                                <p>Available in city: {c.city}</p>
                                <p>price: {c.price}</p>
                                <button type='button'>View</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    
    </>
  )
}

export default ViewCars