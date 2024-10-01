

import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../AuthContex'

const EditPost = () => {

  const {id} = useParams()

  console.log(id)



  const  [posts, setPosts] = useState([]);



  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/posts/onePost/${id}`);
        setPosts(data.post); // Assuming your API returns the post in 'data.post'
  
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);


  console.log(posts)





  const [title , setTitle] = useState(posts.title || "")
  const [content , setContent] = useState(posts.content || "")
  const [thumbnail , setThumbnail] = useState(posts.thumbnail || "")


  useEffect(() => {
    setTitle(posts.title)
    setContent(posts.content)
    setThumbnail(posts.thumbnail)
  }, [posts])

  const navigate = useNavigate()


  const {user, setUser} = useAuth()








  const handlesubmit =  async (e) => {
    e.preventDefault()


  

     try {

      const data  =   axios.put(`http://localhost:8000/api/posts/updated-post/${id}` , {
        title,
        content,
        thumbnail
      }, { withCredentials: true
      })



      console.log(data.data)

      navigate("/login")
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

       <h2 className='text-center text-3xl font-semibold mb-5'>Updated Post</h2>

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


        <button className='bg-blue-400 text-white p-2 rounded-lg text-3xl font-semibold'>Updated post</button>
        </form>

      </div>





    </div>
  )
}






export default EditPost