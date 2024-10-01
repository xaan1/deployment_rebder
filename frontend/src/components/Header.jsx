
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContex'

import axios from 'axios'
const Header = () => {

  
  const {user, setUser} = useAuth()
  console.log(user)

  const naviage = useNavigate()



  const handlelogout = async() => {

      try {
        const data  = await axios.post("http://localhost:8000/api/users/logout");
        // toast.success(data);
        console.log(data)
        setUser(null);
        naviage("/login")
      } catch (err) {
        console.log(err.response.data);
        // toast.error(err.response.data);
      }








  }





  const handleAdmin = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/api/users/admin", 
        {userId: user._id},
       
        { withCredentials: true } 
        
    
      );
      alert("Your are Now Admin")
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };





  return (
    <div
    
    className='fixed top-0 left-0 right-0 bg-white bg-opacity-60 backdrop-blur-md shadow z-10'
    >
    
       <div className='max-w-4xl mx-auto flex justify-between items-center p-4'>
<Link to="/">


     <h2

     className='text-2xl font-bold text-gray-800'
     
     >Logo</h2>
     </Link>


     <ul className='flex gap-x-3'>

      {
        user ? (
          <>
           <Link
        to="/newPost"
        className='cursor-pointer'
        
        >

        <li className='text-gray-800 text-2xl font-semibold'>NewPost</li>

        </Link>

        

        <Link
        to="/contact"
        className='cursor-pointer'
        
        >

        <li className='text-gray-800 text-2xl font-semibold'>Contact</li>

        </Link>

        <Link
        to="/about"
        className='cursor-pointer'
        
        >

        <li className='text-gray-800 text-2xl font-semibold'>About</li>

        </Link>


        <li
          onClick={handlelogout}
          className='cursor-pointer text-gray-800 text-2xl font-semibold'
          >Logout</li>




          </>



        


        ) : (
          <>

<Link
          to="/login"
          className='cursor-pointer'
          
          >
  
          <li className='text-gray-800 text-2xl font-semibold'>Login</li>
  
          </Link>
  
          <Link
          to="/signup"
          className='cursor-pointer'
          
          >
  
          <li className='text-gray-800 text-2xl font-semibold'>SignUp</li>
  
          </Link>
          </>
         
  
        )
      }

       

        

        

     </ul>

     {
      user && (
        <div className='flex gap-x-3 items-center'>
               <button

onClick={handleAdmin}
className='bg-orange-900 text-white px-2 py-3 cursor-pointer text-2xl rounded-md'

>
  Make As Admin
</button>

        <p

        className='text-gray-800 text-2xl font-semibold'
        
        >{user.name}</p>
        
        </div>
      )
     }



       </div>


    </div>
  )
}

export default Header