//import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminHome from '../src/pages/Admin/home/home'
import AdminLogin from '../src/pages/Admin/login/Login';
import AdminRegister from './pages/Admin/register/Register';
import AdminUsers from './pages/Admin/users/Users'
import AdminVerification from './pages/Admin/verification/Verification'
import AdminAbuse from './pages/Admin/AbuseHandling/AbuseHandling'

import Home from '../src/pages/User/Home/Home'
import Profile from './pages/User/Profile/Profile';
import Rider from '../src/pages/User/Rider/Rider'
import Driver from '../src/pages/User/Driver/Driver'
import Login from './pages/User/Login/Login';
import MyVehicle from './components/User/profile/Myvehicle'
import Register from './pages/User/Register/Register';
import AdminPrivate from './components/Admin/AdminPrivate'
import UserPrivate from './components/User/UserPrivate';
import DetailView from './pages/User/Rider/DetailView';
import Connection from './pages/User/Connection/Connections'
import Success from './components/User/Connection/SuccessPayment'
import Notfound from './pages/User/Notfound';
import Wallet from './pages/User/Wallet/Wallet';
//import { useSelector } from 'react-redux';
import './App.css'



function App() {
   
  return (
    <>
   
         <Routes>

        <Route path='/'>
        <Route index element={<Home />} />
      <Route  element={<UserPrivate/>}>
        <Route path="profile" element={ <Profile/>  } />
        <Route path="connections" element={ <Connection/>  } />
        <Route path="myvehicles" element={ <MyVehicle/>  } />
        <Route path="rider" element={ <Rider/>  }   />
        <Route path="driver" element={  <Driver/>}  />
        <Route path="detailView/:id" element={  <DetailView/>}  />
        <Route path="wallet" element={<Wallet/>}  />
        <Route path="payment-success" element={  <Success/>}  />
        <Route path="*" element={  <Notfound/>}  />
      </Route>
        </Route>
        <Route path='/login' element={<Login />  }  />
        <Route path='/register' element={<Register /> }  />



        <Route path='/admin' element={<AdminPrivate/>}>
        <Route index element={ <AdminHome/>  }/>
        <Route path="users" element={<AdminUsers/>}/>
        <Route path="verification" element={<AdminVerification/>}/>
        <Route path="abuseHandling" element={<AdminAbuse/>}/>
        </Route>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route path="/admin/register" element={<AdminRegister/>}/>

        </Routes>
    </>
  )
}

export default App
