import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import instance from '../axiosConfig';

const TestDrives = () => {
    const params=useParams();
    const carId=params.carId;
    const [car,setCar]=useState(null);
    const [currentUser,setCurrentUser]=useState(null);
    const navigate=useNavigate();

   

    const [errors,setErrors]=useState({
      'nameError':'',
      'emailError':'',
      'ageError':'',
      'dateError':'',
      'carBrandError':'',
      'carPlateNoError':''
    });
    const [successMessage,setSuccessMessage]=useState(null);
    const [formInputs,setFormInputs]=useState({
              "fullname":'',
              "email":'',
              "age":0,
              "datetime":'',
              
              
    });

    
    const [finalError,setFinalError]=useState(null);
  

    useEffect(
      ()=>{
        fetchCar();
        fetchMe();
      },
      [location]
    )

    const fetchMe=async ()=>{
      const emailId=await instance.get('/me');
      const user=await instance.get(`/users/getUserByEmailId`,{
        params:{
          emailId:emailId.data
        }
      });

      setCurrentUser(user.data);
    }

    const inputsHandler=(e)=>
    {
      const {name,value}=e.target;
      const error={

    }
      switch(name)
      {
        case "fullname":
                        if(value===null || value==='' || value.length<3)
                        {
                          error.nameError="Name should be atleast of 3 characters!";
                        }
                        else
                        {
                          error.nameError="";
                        }
                        break;

        case "email":
                      if(value===null || value==='' ||!value.match("^[a-zA-Z0-9]+@gmail\.[a-z]+$"))
                      {
                          error.emailError="The email should match the pattern:abc@gmail.com";
                      }
                      else
                      {
                        error.emailError='';
                      }
                      break;

        case "age":
                      if(value===null || value=== '' ||value<18)
                      {
                        error.ageError="Age should be 18 or more than 18 years old";
                      }
                      else
                      {
                        error.ageError='';
                      }
                      break;
        case "datetime":
                      if(value===null || value==='' || new Date(value)<new Date())
                      {
                        error.dateError="date should be anyday from today!";
                      }
                      else
                      {
                       error.dateError='';
                      }
                      break;
      }

      setErrors((prev)=>{
       return { ...prev,
        ...error
       }
      })

      setFormInputs(prev=>{
        return {
        ...prev,
        [name]:value
        }
      });

      
    }

    

    const postTestDrive=async (testdriveData)=>{
      console.log('tesdrive data',testdriveData)
      await instance.post("/testdrives/add",testdriveData);
    }

    const fetchCar=async ()=>{
      const fetchedCar=await instance.get(`/cars/viewVehicleById/${carId}`);
      console.log(fetchedCar.data);
      setCar(fetchedCar.data);
    }

 

    


    
    
    const submitHandler=(e)=>{
      e.preventDefault();
      console.log(errors.nameError);
      if((errors.nameError.length!=0 || errors.emailError.length!=0 || errors.ageError.length!=0 || errors.dateError.length!=0) || !formInputs.age || !formInputs.datetime )
      {
        setFinalError("failed to submit! Pleas fill all details correctly!")
        setSuccessMessage(null);
      }
      else 
        {
          setFinalError(null);
          setSuccessMessage('Testdrive request has been sent successfully!....Redirecting to View-Testdrives page...'
          )
          console.log("carid during post: ",car.id);
          console.log("emailId sent: ",formInputs.email)
          const testdriveData={
         
          "emailId":currentUser.emailId,
          "dateAndTimeOfTestDrive":formInputs.datetime,
          "carId":car.id,
          "city":car.city,
          'isDateConfirmed':false,
          'isDone':false
          }
          postTestDrive(testdriveData);

          setTimeout(()=>{
                          navigate("/viewTestDrives");
                            },5000);
              
              
              
            
        }
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
    <div >
     
            {
              car?
              <div className='payment-body-content'>
              <div>
                <img src={car.carImages[0]} style={{height:"300px",width:'100%', objectFit:'cover', borderRadius:'15px'}}/>
              </div>
              <div className='payment-details-body'>
              <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car Brand:</strong> {car.carBrand}</p>
              <p style={{color:'hotpink',marginLeft:'3%'}}><strong style={{color:'black'}}>Car PlateNo:</strong> {car.carPlateNo}</p>
              </div>
            </div>
            :
            <p>Car not selected</p>
            }
             {
              currentUser?
            <form onSubmit={submitHandler} className='form-body'>
              <div class="mb-3">
                <label for="fullName" class="form-label">Full Name: </label>
                <input type="text" class="form-control" id="fullName" name='fullname' value={formInputs.fullname?formInputs.fullname:currentUser.fullName} onChange={inputsHandler} placeholder="Ex: Rohan"/>
              </div>
              <div>
               
                {errors.nameError?<p>{errors.nameError}</p>:null}
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Id: </label>
                <input type="email" class="form-control" id="email" name='email' value={formInputs.email?formInputs.email:currentUser.emailId} onChange={inputsHandler} placeholder="Ex: abc@gmail.com"/>
              </div>
              <div>
                {errors.emailError?<p>{errors.emailError}</p>:null}
              </div>
              <div class="mb-3">
                <label for="age" class="form-label">Age: </label>
                <input type="number" class="form-control" id="age" name='age' value={formInputs.age} onChange={inputsHandler} placeholder="23"/>
              </div>
              <div>
                {errors.ageError?<p>{errors.ageError}</p>:null}
              </div>
              <div class="mb-3">
                <label for="carbrand" class="form-label">Car Brand: </label>
                <input type="text" class="form-control" id="carbrand" name='carbrand' value={formInputs.carbrand?formInputs.carBrand:car.carBrand} onChange={inputsHandler} placeholder="Ex: Toyota"/>
              </div>
              <div>
                
              </div>
              <div class="mb-3">
                <label for="carplateno" class="form-label">car plate no: </label>
                <input type="text" class="form-control" id="carplateno" name='carplateno' value={formInputs.carplateno?formInputs.carplateno:car.carPlateNo} onChange={inputsHandler} placeholder="Ex: Rohan"/>
              </div>
              <div>
                
              </div>
              <div class="mb-3">
                <label for="date" class="form-label">test drive date and time: </label>
                <input type="datetime-local" class="form-control" name='datetime' value={formInputs.datetime} onChange={inputsHandler} id="date" placeholder=""/>
              </div>
              <div>
                {errors.dateError?<p>{errors.dateError}</p>:null}
              </div>
               <div style={{width:"30%",margin:"3% auto"}}>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </div>
            </form>
            :
            <h3>fetching user</h3>
            }
            <div style={{width:"30%",margin:"3% auto"}}>{
             finalError?finalError:null 
             
            }
            </div>
            <div style={{width:"30%",margin:"3% auto"}}>
            {
              successMessage?successMessage:null
            }
            </div>
            
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

export default TestDrives