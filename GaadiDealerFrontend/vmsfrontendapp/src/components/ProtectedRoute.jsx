import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import instance from '../axiosConfig';

const ProtectedRoute = ({children}) => {
  const [auth,setAuth]=useState(null);
 
    useEffect(()=>{
       // let mount=true;
        instance.get("/me")
               .then(res=>{
                //if(mount)
                if(res.data){
                    //setAuth(res.data?true:false)
                //setAuth(!!res.data)
                setAuth(true)
               }
               else{setAuth(false)}}
            )
               .catch(()=>{
                //if(mount)
                    setAuth(false)
               })
               //return ()=>mount=false;
    },[])
    if(auth==null)
        {
            return <div>checking authentiaction....</div>
        }

     return auth?children:<Navigate to="/login" />

}

export default ProtectedRoute