import React from 'react'
import {useAuthContext}  from '../context/AuthUser.jsx'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const {user} =  useAuthContext();
  return  user ? children : <Navigate to ="/Login"/> 
}

export const SignupPrivateRoute = ({children}) => {
  const {user} =  useAuthContext();
  return user ? <Navigate to= '/'/>: children ;
}

export default PrivateRoute