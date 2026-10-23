import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../axiosConfig';

const TestDrives = () => {
    const params=useParams();
    const carId=params.carId;
    const [car,setCar]=useState(null);

    const navigate=useNavigate();

   

    const [errors,setErrors]=useState({});
    const [successMessage,setSuccessMessage]=useState(null);
    const [formInputs,setFormInputs]=useState({
              "fullname":'',
              "email":'',
              "age":0,
              "datetime":'',
              "carbrand":'',
              "carplateno":'',
              
    });

    const error={

    }
    const [finalError,setFinalError]=useState(null);

    const inputsHandler=(e)=>
    {
      const {name,value}=e.target;

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

      setFormInputs({
        ...formInputs,
        [name]:value
      });

      
    }

    

    const postTestDrive=async (testdriveData)=>{
      await instance.post("/testdrives/add",testdriveData);
    }

    const fetchCar=async ()=>{
      const fetchedCar=await instance.get(`/cars/viewVehicleById/${carId}`);
      console.log(fetchedCar.data);
      setCar(fetchedCar.data);
    }

    useEffect(
      ()=>{
        fetchCar();
        getLoggedInUser();
      }
      ,
      [carId]
    );

    const getLoggedInUser=async()=>{
    const userDetails=await instance.get('/me');
    
    setUserType(userDetails.userType);
}

    
    
    const submitHandler=(e)=>{
      e.preventDefault();

      if(errors.nameError.length!=0 || errors.emailError.length!=0 || errors.ageError.length!=0 || errors.dateError.length!=0)
      {
        setFinalError("failed to submit! Pleas fill all details correctly!")
      }
      else 
        {
          setFinalError(null);
          setSuccessMessage(<><p>Testdrive request has been sent successfully!....</p>
            <h3>Redirecting to View-Testdrives page...</h3>
            </>
          )
          console.log("carid during post: ",car.id);
          const testdriveData={
          "emailId":formInputs.email,
          "dateAndTimeOfTestDrive":formInputs.datetime,
          "carId":car.id,
          "city":car.city,
          }
          postTestDrive(testdriveData);

          setTimeout(()=>{
                          navigate("/viewTestDrives");
                            },5000);
              
              
              
            
        }
    }


  return (
   <>
    <div>
     
            {
              car?
              <div>
              <div>
                <img src={car.carImages[0]}/>
              </div>
              <p>{car.carBrand}</p>
              <p>{car.carPlateNo}</p>
            </div>
            :
            <p>Car not selected</p>
            }
            <form onSubmit={submitHandler}>
              <div class="mb-3">
                <label for="fullName" class="form-label">Full Name: </label>
                <input type="text" class="form-control" id="fullName" name='fullname' value={formInputs.fullname} onChange={inputsHandler} placeholder="Ex: Rohan"/>
              </div>
              <div>
                {errors.nameError?<p>{errors.nameError}</p>:null}
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email Id: </label>
                <input type="email" class="form-control" id="email" name='email' value={formInputs.email} onChange={inputsHandler} placeholder="Ex: abc@gmail.com"/>
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
                <input type="text" class="form-control" id="carbrand" name='carbrand' value={formInputs.carbrand} onChange={inputsHandler} placeholder="Ex: Toyota"/>
              </div>
              <div>
                
              </div>
              <div class="mb-3">
                <label for="carplateno" class="form-label">car plate no: </label>
                <input type="text" class="form-control" id="carplateno" name='carplateno' value={formInputs.carplateno} onChange={inputsHandler} placeholder="Ex: Rohan"/>
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
              <button type='submit'>Submit</button>
            </form>
            {
             finalError?finalError:null 
             
            }
            {
              successMessage?successMessage:null
            }
            
        </div>
    
   </>
  )
}

export default TestDrives