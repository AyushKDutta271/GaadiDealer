import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import instance from '../axiosConfig';
import '../assets/componentscss/HomeAdmin.css'

const AddVehicle = () => {
    const location=useLocation();
    const [backendError,setBackendError]=useState(null);
    const [loggedInUser,setLoggedInUser]=useState(null);

    const navigate =useNavigate();
    useEffect(
        ()=>{
            fetchLoggedInUser();
        },
        [location]
    )

    const fetchLoggedInUser=async ()=>{
       const fetchedEmailId=await instance.get('/me');
    const fetchedUser=await instance.get('/users/getUserByEmailId',{
        params:{
            emailId:fetchedEmailId.data
        }   //for request params in controller as requestbody not allowed for GET...but why like this? and why not formData?
        });
    setLoggedInUser(fetchedUser.data);
    }

    const [formInputs,setFormInputs]=useState({
        'carplateno':'',
        'carbrand':'',
        'state':'',
        'city':'',
        'carimages':[],
        'carprice':''
    })

    const [errors,setErrors]=useState({
        'carPlateError':null,
        'carBrandError':null,
        'stateError':null,
        'cityError':null,
        'carImagesError':null,
        'carPriceError':null
        
    });



    const [finalError,setFinalError]=useState(null);
    const [successMessage,setSuccessMessage]=useState(null);
   
    const formInputsHandler=(e)=>{
        const {name,value}=e.target;

        const error={}

        switch(name)
        {
            case 'carplateno': 
                                if(value.length!=10)
                                {
                                    error.carPlateError='Car plate No should be of 10 characters!'
                                }
                                else
                                {
                                    error.carPlateError=null
                                }
                                break;

            case 'carbrand':
                            if(value.length<3)
                            {
                                error.carBrandError='Please enter valid car brand!'
                            }
                            else
                            {
                                error.carBrandError=null
                            }
                            break;

            case 'state':
                            if(value.length<3)
                            {
                                error.stateError='Please enter valid state name!'
                            }
                            else
                            {
                                error.stateError=null
                            }
                            break;

            case 'city':
                            if(value.length<3)
                            {
                                error.cityError='Please enter valid city name!'
                            }
                            else
                            {
                                error.cityError=null;
                            }
                            break;

            case 'carimages':
                            if(e.target.files.length===0)
                            {
                                error.carImagesError='Please provide car images!'
                            }
                            else
                            {
                                error.carImagesError=null;
                            }
                            break;

            case 'carprice':
                            if(Number(value)<30000)
                            {
                                error.carPriceError='Selling price has to be more than 30000';
                            }
                            else
                            {
                                error.carPriceError=null;
                            }
                            break;
        }

        setErrors(prev=>{
            return{
                ...prev,
                ...error
            }

        });

        if(name==='carimages')
        {
        setFormInputs(prev=>{
            return {
                ...prev,
                [name]:[...prev.carimages,...Array.from(e.target.files)]
            }
        });
        }
        else
        {
             setFormInputs(prev=>{
            return {
                ...prev,
                [name]:value
            }
        });
        }

        
   
    }
    
    const removeImages=(i)=>{
       const filteredImages= formInputs.carimages.filter((c,idx)=>{
            if(idx!==i)
                return true;
        });
        setFormInputs(prev=>{
            return{
            ...prev,
            'carimages':filteredImages
            }
        });
    }
    

    const submitHandler=async (e)=>{
        e.preventDefault();

        if(!formInputs.carplateno || !formInputs.carbrand || !formInputs.state || !formInputs.city || formInputs.carimages.length===0 || !formInputs.carprice)
        {
            setFinalError("Please fill the form with valid details!");
            setSuccessMessage(null);
        }
        else if(errors.carPlateError || errors.carBrandError || errors.stateError || errors.cityError || errors.carImagesError || errors.carPriceError)
        {
            setFinalError("Please fill the form with valid details!");
            setSuccessMessage(null);
        }
        else{
            setFinalError(null);
            
        }
      
        
        const fd = new FormData();
        fd.append('carPlateNo',formInputs.carplateno);
        console.log(typeof formInputs.carplateno);
        fd.append('carBrand',formInputs.carbrand);
        fd.append('userId',loggedInUser.id);
        console.log('userId',loggedInUser.id);
        fd.append('state',formInputs.state);
        fd.append('city',formInputs.city);
        formInputs.carimages.forEach(cimage=>{
            fd.append('carImages',cimage);
        });
        fd.append('carPrice',formInputs.carprice);

        console.log(fd)
        

        try{
            if(!finalError)
            {
            await instance.post('/cars/sell',fd,
                {
                    headers:{
                        "Content-Type":false  //because browser has to set headers automatically
                    }
                }
            );
            setSuccessMessage("Car posted successfully!");
            
            }
            
        }
        catch(err)
        {
            console.error(err);
           setBackendError("failed to post vehicle ...server error!");
            
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
                            <Link className="nav-link active" aria-current="page"  to='/admin'>Home</Link>
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
    
        <form className='form-body' onSubmit={submitHandler}>
            <div className="mb-3">
                <label for="car-plate" className="form-label">Car Plate No.</label>
                <input type="text" className="form-control" id="car-plate" name='carplateno' value={formInputs.carplateno} onChange={formInputsHandler} placeholder="Ex: MH121-09-716" />
            </div>
            <div>
                {errors.carPlateError}
            </div>
            <div className="mb-3">
                <label>Car Brand</label>
                <select name='carbrand' onChange={formInputsHandler}>
                <option value=''>Select a car brand</option>
                <option value="totyota">Toyota</option>
                <option value="honda">Honda</option>
                <option value="mahindra" >Mahindra</option>
                <option value="ford" >Ford</option>
                </select>
            </div>
            <div>
                {errors.carBrandError}
            </div>

             <div className="mb-3">
                <label for="state" className="form-label">State</label>
                <input type="text" className="form-control" id="state" name='state' value={formInputs.state} onChange={formInputsHandler} placeholder="Ex: Maharashtra" />
            </div>
            <div>
                {
                    errors.stateError
                }
            </div>
            
             <div className="mb-3">
                <label for="city" className="form-label">city</label>
                <input type="text" className="form-control" id="city" name='city' value={formInputs.city} onChange={formInputsHandler} placeholder="Ex: Mumbai" />
            </div>
                <div>
                    {
                        errors.cityError
                    }
                </div>
             <div class="mb-3">
                <label for="car-images" className="form-label">Car Images:</label>
                <input type="file" className="form-control" accept='image/*' id="car-images" name='carimages'   onChange={formInputsHandler} placeholder="Ex: .jpg" multiple/>
                <div className='row'>
                    {
                        formInputs.carimages.length!==0?(formInputs.carimages.map((c,idx)=>{
                            return (
                                <div className='col-md-4 mt-2' style={{display:"flex", justifyContent:'space-between'}} key={idx}>
                                        
                                        <img src={URL.createObjectURL(c)} style={{height:"200px",width:"100%",objectFit:"cover",borderRadius:"8px"}} />
                                        <div className='me-5'><strong style={{color:"red"}}><span onClick={()=>removeImages(idx)}>X</span></strong></div>
                                </div>
                            )
                        })
                    ):
                    (
                        null
                    )
                    }
                </div>
                <div>
                    {
                        errors.carImagesError
                    }
                </div>

                <div className="mb-3">
                    <label for="price" className="form-label">Price:</label>
                    <input type="number" className="form-control" id="price" name='carprice' value={formInputs.carprice} onChange={formInputsHandler} placeholder="Ex: 37000" />
                </div>
                <div>
                    {
                       errors.carPriceError
                    }
                </div>
                
                <div style={{width:"30%",margin:"3% auto"}}>
                    <button type='submit' >Submit</button>
                </div>
            </div>

        </form>
        {
           <p align='center'>{finalError}</p>
        }
        {
            <p align='center'>{successMessage}</p>
        }
        {
            <p  align='center'>{backendError}</p>
        }
       
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

export default AddVehicle