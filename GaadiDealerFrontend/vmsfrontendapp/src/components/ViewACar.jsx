import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../axiosConfig';


const ViewACar = () => {
    const [selectedCar,setSelectedCar]=useState(null);

    
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
            
        }
        ,[carId]
    )    

   

    const clickHandler=(id)=>{
        navigate(`/testdrives/${id}`);
    }
  return (
    <>
        
       
     
        
        {
            selectedCar?
                <div className='car-container'>
                    <div className='car-container-image'>
                        <img src={selectedCar.carImages[0]} style={{width:"100%",height:"30%",objectFit:"cover"}}/>
                            
                    </div>
                    <p>
                               Car Brand: {selectedCar.carBrand}
                              <p>Price: {selectedCar.carPrice}</p>
                    </p>
                    <button onClick={()=>clickHandler(selectedCar.id)}>Testdrive</button>
                </div>
                    :
                    "No car is selected!"
        }
       
    </>
  )
}

export default ViewACar