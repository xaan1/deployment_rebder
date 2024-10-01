import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { useAuth } from './AuthContex';
import axios from 'axios';

const App = () => {

  // getProfile


  const {user, setUser} = useAuth()

  // console.log(user)



useEffect(() => {

  const fetchUserProfile = async () => {

    try {
      
   const { data } = await axios.get("http://localhost:8000/api/users/profile", { withCredentials: true });

    // console.log(data)
    setUser(data)
    } catch (err) {
     
      console.log("err", err);
      setLoading(false)
    }
  };
  fetchUserProfile();
  // setLoading(false)
}, []);



  return (
    <div className='max-w-4xl mx-auto pt-20 mt-10'>
      <Header/>
      <Outlet/>
   
    
    </div>
  );
}

export default App;
