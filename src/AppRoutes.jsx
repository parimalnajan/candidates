import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import {  Navigate,Route, Routes, Redirect, Link, NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from './App';
import ErrorPage from './components/ErrorPage';

import Auth from './pages/Auth'
import Candidates from './pages/Candidates'

const AppRoutes = () => {

     const storageAuth = sessionStorage.getItem("isAuth")
     console.log(storageAuth)
  
  const ProtectedRoute = ({ user, children }) => {
    if (storageAuth===false) {
      alert("Please login to access this resource");
      return <Navigate to="/auth" replace />;

    }
      return children;
  };
  return (
        <Routes>
            <Route path="/" element = {<Auth/>}></Route>
            <Route path="/auth" element = {<Auth/>}></Route>
            
            <Route exact path="/candidate/*"
               element = {<ProtectedRoute ><Candidates/></ProtectedRoute>}>
            </Route>

            {/* <Route exact path="/candidates" element = {<Candidates/>}></Route> */} 
            {/* <Route path="*" element={<ErrorPage/>} /> */}
     </Routes>
    // <div>asd</div>
  )
}

export default AppRoutes