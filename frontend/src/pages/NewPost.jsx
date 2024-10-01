
import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContex'

const NewPost = () => {





  const [title , setTitle] = useState("")
  const [content , setContent] = useState("")
  const [thumbnail , setThumbnail] = useState("")

  const navigate = useNavigate()


  const {user, setUser} = useAuth()



  console.log(user)





  const handlesubmit =  async (e) => {
    e.preventDefault()


  

     try {

      const data =await axios.post('http://localhost:8000/api/posts//create-post', {
        title,
        content,
        thumbnail,
        author : user._id
      },
        { withCredentials: true } )

      console.log(data.data)

      // navigate("/login")
      setContent("")
      setThumbnail("")
      setTitle("")
      navigate("/")

      

     } catch(e){
      alert(e.response.data.message)
      console.log(e)
     }


  }




  return (
    <div

    className='max-w-4xl mx-auto flex items-center justify-center min-h-[700px] p-4 '


    >


      <div className='bg-white p-10 rounded-lg shadow-lg w-[700px] mt-20'>

       <h2 className='text-center text-3xl font-semibold mb-5'>New Post</h2>

        <form

        onSubmit={handlesubmit}
        
        className='flex flex-col gap-y-4 mt-4 space-y-3'>


          <input
          value={title}
          onChange={(e) =>  setTitle(e.target.value)}
           type='text' placeholder='Tittle' className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>

          <input

value={content}
onChange={(e) =>  setContent(e.target.value)}
          
          type='text' placeholder='Descrption' className='p-2 border text-2xl font-semibold  border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>

          <input 

value={thumbnail}
onChange={(e) =>  setThumbnail(e.target.value)}
          
          type='text' placeholder='Images' className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'/>


        <button className='bg-blue-400 text-white p-2 rounded-lg text-3xl font-semibold'>Puplished</button>
        </form>

      </div>





    </div>
  )
}

export default NewPost


