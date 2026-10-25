import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';

const BuyVehicle = () => {

  const [brandSearch,setBrandSearch]=useState('');

  const [priceSearch,setPriceSearch]=useState(0);

  const [cars,setCars]=useState([]);

  const [filteredCars,setFilteredCars]=useState([]);
 
  const location=useLocation();

  const navigate =useNavigate();
  useEffect(()=>{
    fetchCars();
    
  },
[location]
)


const fetchCars=async()=>{
  const fetchedCars=await instance.get('/cars/viewVehicles');
  setCars(fetchedCars.data.content);
  setFilteredCars(fetchedCars.data.content)
}
  const submitHandler=(e)=>{
    e.preventDefault();
    console.log(cars);
    const searchedCars=cars.filter(car=>{
      const foundBrand=brandSearch==='' || car.carBrand.toLowerCase().includes(brandSearch.toLowerCase());
      const foundPrice=priceSearch==='0' || foundPrice===0 || priceSearch==='' || Number(priceSearch)>=car.carPrice;
      console.log(foundBrand && foundPrice);
      console.log("Car:", car.carBrand, car.carPrice);
    console.log("Brand search:", brandSearch);
    console.log("Price search:", priceSearch, typeof priceSearch);
    console.log("foundBrand:", foundBrand);
    console.log("foundPrice:", foundPrice);
      return foundBrand && foundPrice;
    });
    console.log(searchedCars);
    setFilteredCars(searchedCars);
  }

  const onViewClick=(carId)=>{
    navigate(`/viewACar/${carId}`)
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
        <form  className='form-body'  onSubmit={submitHandler}>
            
            <div className="mb-3">
                <label for="exampleFormControlInput2" className="form-label">Brand Search:</label>
                <input type="text" className="form-control" id="exampleFormControlInput2" name='email' value={brandSearch} onChange={(e)=>setBrandSearch(e.target.value)}/>
            </div>
                
            <div className="mb-3">
                <label for="exampleFormControlInput3" className="form-label">Price Search:</label>
                <input type="number" className="form-control" id="exampleFormControlInput3" name='password' value={priceSearch} onChange={(e)=>setPriceSearch(e.target.value)}/>
            </div>
                    
            <div style={{margin:'5% auto',width:'90%'}}>
               <button type='submit' style={{backgroundColor:'green',borderRadius:'15px'}}>Apply</button>
            </div>
             
        </form>
       <div className='row me-0'>
        {
          filteredCars.length>0?(
           filteredCars.map(car=>{
            return(
            <div key={car.id} style={{width:'380px'}} className='col-md-4 payment-body-content'>
              <div >
                <img src={car.carImages[0]} style={{height:"300px",width:'100%', objectFit:'cover', borderRadius:'15px'}} />
                {
                  console.log(car.carImages[0])
                }
              </div>
              <div className='payment-details-body'>
                <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car Brand:</strong>{car.carBrand} </p>
                <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car PlateNo:</strong>{car.carPlateNo}</p>
                <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car Price:</strong>{car.carPrice}</p>
                <button type='button' onClick={()=>onViewClick(car.id)} style={{backgroundColor:'green',margin:'5% auto', borderRadius:'15px',width:'15%',marginLeft:'3%'}}>View</button>
              </div>
              
            </div> 
            )
           }) 
          ):<h4>No such car found!</h4>
        }
        </div>
       </div>
    </>
  )
}

export default BuyVehicle