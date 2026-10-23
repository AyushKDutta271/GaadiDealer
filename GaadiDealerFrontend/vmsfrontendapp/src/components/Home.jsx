import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import instance from '../axiosConfig';
import HomeUser from './HomeUser';
import HomeAdmin from './HomeAdmin';

const Home = () => {
    const [currentUser,setCurrentUser]=useState(null);

    const location =useLocation();
   useEffect(
    ()=>{
        fetchLoggedInUser();
    },
    [location]
   )

   const fetchLoggedInUser=async ()=>{
    const fetchedUser=await instance.get('/me');
    setCurrentUser(fetchedUser.data);
   }
   if(currentUser)console.log("currentUser: ",currentUser);
  return (
    <>
    {
        currentUser?
            currentUser==='USER'?<HomeUser/>:<HomeAdmin/>
            :
            <p>Loading please wait...</p>
    }
    </>
  )
}

export default Home