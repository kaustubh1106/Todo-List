import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {userAuth} from '../../Context/Context'
const ProtectedRoute = (prop) => {
    const navigate = useNavigate();
    const isAuthenticated = useContext(userAuth)
  return isAuthenticated ? <prop.element/> : navigate("/login")
}

export default ProtectedRoute
