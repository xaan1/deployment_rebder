import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContex'

const NewPost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [thumbnail, seThumbnail] = useState(null)  // Sawirka waa in laga dhigo null markii hore
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Samee formData oo ku dar xogta iyo thumbnail-ka (sawirka)
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('thumbnail', thumbnail)  // Thumbnail-ka wuxuu noqon doonaa sawirka file-ka
      formData.append('author', user._id)

      // Dir xogta `formData` ahaan
      const { data } = await axios.post('http://localhost:8000/api/posts/create-post', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })

      console.log(data)

      // Clear form-ka kadib
      setTitle("")
      setContent("")
      seThumbnail(null)
      navigate("/")

    } catch (e) {
      alert(e.response?.data?.message || "Error while creating post")
      console.log(e)
    }
  }

  const handleChangeImage = (e) => {
    const file = e.target.files[0]
    seThumbnail(file)  // Xogta image-ka file-ka ku keydi
  }

  return (
    <div className='max-w-4xl mx-auto flex items-center justify-center min-h-[700px] p-4'>
      <div className='bg-white p-10 rounded-lg shadow-lg w-[700px] mt-20'>
        <h2 className='text-center text-3xl font-semibold mb-5'>New Post</h2>
        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4 mt-4 space-y-3'>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type='text'
            placeholder='Title'
            className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type='text'
            placeholder='Description'
            className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />
          <input
            type='file'
            onChange={handleChangeImage}
            className='p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400'
          />

          {
            thumbnail && (
              <img src={URL.createObjectURL(thumbnail)} alt='thumbnail' className='w-full h-96 object-cover rounded-lg' />
            )
          }



          <button className='bg-blue-400 text-white p-2 rounded-lg text-3xl font-semibold'>Publish</button>
        </form>
      </div>
    </div>
  )
}

export default NewPost
