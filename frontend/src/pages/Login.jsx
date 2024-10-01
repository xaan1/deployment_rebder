
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContex'

const Login = () => {





  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [password , setPassword] = useState("")

  const navigate = useNavigate()



  const {user, setUser} = useAuth()

  console.log(user)

  useEffect(() => {

    if(user){
      navigate('/newPost')
    }


  },[user])





  const handlesubmit =async (e) => {
    e.preventDefault()


     try {

      const {data} =await axios.post('http://localhost:8000/api/users/login', {
        email,
        password
      },{ withCredentials: true })

      console.log(data)

      setUser(data)

    


      navigate("/")

      

     } catch(e){
      alert(e.response.data.message)
      console.log(e.response.data.message)
     }


  }






  return (
    <div

    className='max-w-4xl mx-auto flex items-center justify-center min-h-[700px] p-4 '


    >


      <div className='bg-white p-10 rounded-lg shadow-lg w-[700px] mt-20'>

       <h2 className='text-center text-3xl font-semibold mb-5'>Login</h2>

        <form

        onSubmit={handlesubmit}
        
        className='flex flex-col gap-y-4 mt-4 space-y-3'>


    

          <input

value={email}
onChange={(e) =>  setEmail(e.target.value)}
          
          type='email' placeholder='email' className='p-2 border text-2xl font-semibold  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>

          <input 

value={password}
onChange={(e) =>  setPassword(e.target.value)}
          
          type='password' placeholder='password' className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>


        <button className='bg-blue-400 text-white p-2 rounded-lg text-2xl font-semibold'>Login</button>
        </form>

      </div>





    </div>
  )
}


export default Login;
