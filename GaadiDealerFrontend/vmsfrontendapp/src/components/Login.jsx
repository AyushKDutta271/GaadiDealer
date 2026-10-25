import React, { useState } from 'react'
import instance from '../axiosConfig';
import { Link, Navigate } from 'react-router-dom';
import '../assets/componentscss/SellVehicle.css'

const Login = () => {

    const [formInputs,setFormInputs]=useState({
            
            'email':'',
            'password':'',
            'usertype':''
        });
    
        const [errors,setErrors]=useState({
            
            'emailError':null,
            'passwordError':null,
            'userTypeError':null
        });
    
        const [finalError,setFinalError]=useState(null);
        const [successMessage,setSuccessMessage]=useState(null);
    
        const formInputsHandler=(e)=>{
            const {name,value}=e.target;
    
            const error={
    
            }
    
            let pwd=null;
            switch(name)
            {
                
                
                case 'email':
                    if(value===null || value==='' || !value.match('^[a-zA-Z0-9]+@gmail\.[a-z]+$'))
                    {
                        error.emailError='email should match pattern abc@gmail.com';
                    }
                    else
                    {
                        error.emailError=''
                    }
                    break;
                
                case 'password':
                    if(value===null || value==='' || value.length<5)
                    {
                        error.passwordError='password should be of atleast 5 characters!';
                    }
                    else{
                        error.passwordError=''
                        pwd=value;
                    }
                    break;
    
                
                
                case 'usertype':
                    if(value===null || value==='')
                    {
                        error.userTypeError='Please select a user type!';
                    }
                    else
                    {
                        error.userTypeError='';
                    }
                    break;
            }
    
    
            setErrors((prev)=>{
              return {
                ...prev,
                ...error
              }
            });
            setFormInputs((prev)=>{
                return {
                ...prev,
                [name]:value
                }
            })
        };
    
        const submitHandler=async(e)=>{
            e.preventDefault();
    
            if( errors.emailError!=='' || errors.passwordError!==''  || errors.userTypeError!=='')
            {
                setFinalError("Failed to Register!\n Please enter valid details!");
                setSuccessMessage(null);
            }
            else
            {
                try
                {
               const response= await instance.post('/login',{
                    'emailId':formInputs.email,
                    'password':formInputs.password,
                    'userType':formInputs.usertype
                });

                // const token = response.data;

                //M2:Saving the token in localStorage...until the expire time...but danger for xxs attacks
                // localStorage.setItem('token',token);

                //M1:saving token in memory---could be lost if page is reloaded
                // instance.defaults.headers.common["Authorization"] =
                //     `Bearer ${token}`;
                setFinalError(null);
                setSuccessMessage("Login Successfully!");
            }
            catch(error)
            {
                setFinalError("Wrong EmailId or Password! Try again!");
            }
            }
            
    
        }
  return (
    <>
    <div className='homeUser-body' style={{height:'900px'}}> 
     
     <h3 align='center'> User Login:</h3>

        <div>
            <form onSubmit={submitHandler} className='form-body'>
            
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Email Id</label>
                <input type="email" class="form-control" id="exampleFormControlInput2" name='email' value={formInputs.email} onChange={formInputsHandler}/>
            </div>
                <div>{
                        errors.emailError?errors.emailError:null
                    }</div>
            <div class="mb-3">
                <label for="exampleFormControlInput3" class="form-label">Password</label>
                <input type="password" class="form-control" id="exampleFormControlInput3" name='password' value={formInputs.password} onChange={formInputsHandler}/>
            </div>
                    <div>{
                        errors.passwordError?errors.passwordError:null
                    }</div>
            
            <div class="mb-3">
                <label>Type of User:</label>
               <select name='usertype' onChange={formInputsHandler}>
                    <option value=''>Select</option>
                    <option value='USER'>User</option>
                    <option value='ADMIN'>Admin</option>
               </select>
            </div>
                <div>{
                        errors.userTypeError?errors.userTypeError:null
                    }</div>
                <div style={{width:"80%",height:'50px',margin:"3% auto", display:'flex',justifyContent:'space-between'}}>
                    <button type='submit' className=' btn btn-primary' style={{width:'100%'}}>Login</button>
                     <h6 align='right' style={{marginTop:'0%'}}>Not a user yet?<Link to='/register'>Register</Link></h6>
                </div>
                 
        </form>
       
        {
            finalError?<h3>{finalError}</h3>:null
        }
        {
            successMessage?<h3>{successMessage}</h3>:null
        }
        {
            successMessage?<Navigate to='/'/>:null
        }
        </div>
        </div>


    </>
  )
}

export default Login