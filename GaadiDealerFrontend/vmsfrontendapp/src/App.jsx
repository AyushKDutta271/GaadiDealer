
import './App.css'
import { Route, Routes } from 'react-router-dom'


import ViewACar from './components/ViewACar'
import TestDrives from './components/TestDrives'
import ViewTestDrives from './components/ViewTestDrives'
import ViewTestDrivesAdmin from './components/ViewTestDrivesAdmin'
import Leads from './components/Leads'
import SellVehicle from './components/SellVehicle'
import BuyVehicle from './components/BuyVehicle'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Register from './components/Register'
import HomeUser from './components/HomeUser'
import HomeAdmin from './components/HomeAdmin'
import Home from './components/Home'
import AddVehicle from './components/AddVehicle'
import Payment from './components/Payment'
import Contacts from './components/Contacts'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/user' element={<ProtectedRoute><HomeUser/></ProtectedRoute>} />
        <Route path='/admin' element={<ProtectedRoute><HomeAdmin/></ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/viewACar/:carId' element={<ProtectedRoute><ViewACar/></ProtectedRoute>} />
        <Route path='/buyVehicle' element={<ProtectedRoute><BuyVehicle/></ProtectedRoute>}/> 
         <Route path='/sellVehicle' element={<ProtectedRoute><SellVehicle/></ProtectedRoute>} /> 
         <Route path='/addVehicle' element={<ProtectedRoute><AddVehicle/></ProtectedRoute>}/>
        <Route path='/testdrives/:carId' element={<ProtectedRoute><TestDrives/></ProtectedRoute>}/>
        <Route path='/viewTestDrives' element={<ProtectedRoute><ViewTestDrives/></ProtectedRoute>}/>
        <Route path='/searchCar' element={<ProtectedRoute><BuyVehicle/></ProtectedRoute>}/>
        <Route path='/viewTestDrivesAdmin' element={<ProtectedRoute><ViewTestDrivesAdmin/></ProtectedRoute>}/>
        {/* <Route path='/viewProfile' element={<ProtectedRoute><ViewProfile/></ProtectedRoute>} /> */}
        <Route path='/viewLeads' element={<ProtectedRoute><Leads/></ProtectedRoute>}/>
        <Route path='/checkout/:tId' element={<ProtectedRoute><Payment/></ProtectedRoute>}/>
        <Route path='/contacts' element={<ProtectedRoute><Contacts/></ProtectedRoute>}/>
      </Routes>
    </>
  )
}

export default App
