import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet ,Navigate } from 'react-router-dom'

const UserPrivate = () => {
    const { user  } = useSelector((state) => state.auth)
    if(user) {
        return <Outlet />
        }else{
         return <Navigate to='/login'/>
        }
}

export default UserPrivate
