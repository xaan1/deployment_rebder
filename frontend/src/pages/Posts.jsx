
import React, { useEffect, useState } from 'react';

import axios from 'axios'
import { Link } from 'react-router-dom';

const Posts = () => {


  //  fetch posts from the server






  const  [posts, setPosts] = useState([]);



  useEffect(() => {


    const fetchPosts = async () => {
      try {
        const {data} = await axios.get('http://localhost:8000/api/posts/allPost')
     
        setPosts(data.posts)
      } catch(e){
        console.log(e)
      }
    }

    fetchPosts()





  },[])

  



  console.log(posts)

  return (
    <div  

    className='grid grid-cols-1 mt-20 space-y-1 gap-x-2 md:grid-cols-2 md:space-x-3 lg:grid-cols-3 gap-4'  
    
    >

      {posts.map(post => (
        <Link to={`post/${post._id}`} key={post._id} className='bg-gray-100 p-4 rounded-md'>

          <h1 className='text-lg font-semibold'>{post.title}</h1>
          <p className='text-sm'>{post.content}</p>
        
          <img src={post.thumbnail} alt={post.title} className='w-full h-48 object-cover rounded-md mt-2' />
        </Link>
      )
      )}




    </div>
  );
}

export default Posts;
