import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'

const AdminPrivate = () => {
    const { admin } = useSelector((state)=>state.adminAuth)
 if(admin) {
 return <Outlet />
 }else{
  return <Navigate to='/admin/login'/>
 }
}

export default AdminPrivate
