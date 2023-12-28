import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../features/authSlice'

function Logout() {
    const dispatch = useDispatch();
    const logoutHandler = () =>{
      authService.logout().then(() => {
        dispatch(logout())
      })
    }
    


  return (
    <button className='bg-orange-500 text-white py-2 px-4 rounded-full focus:outline-none'
    onClick={logoutHandler}>Logout</button>
  )
}

export default Logout