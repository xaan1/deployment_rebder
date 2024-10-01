import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const naviagete = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/posts/onePost/${id}`);
        setPost(data.post); // Assuming your API returns the post in 'data.post'
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  console.log(post);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }



  // handleDeleted




  const handleDeleted = async (id) => {
    try {

    

    const data  = await axios.delete(`http://localhost:8000/api/posts/delete-post/${id}` ,
      { withCredentials: true }
    );
    // toast.success(data);
    console.log(data)
    alert("Post Deleted")
    naviagete("/")
    // window.location.reload()
    // naviagte("/")

  } catch (err) {
    console.log(err.response.data);
    // toast.error(err.response.data);
  }

  }






  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.thumbnail} alt={post.title} className="w-full h-96 object-cover rounded-md" />
      <p className="mt-4 text-lg">{post.content}</p>
      <p className="mt-4 text-lg">{post?.author?.name}</p>

      <div className='flex gap-x-3'>

        <button

        onClick={() => naviagete(`/updated_post/${post._id}`)}
        
        className='bg-blue-500 text-white px-4 py-2 rounded-md'>Edit</button>


        <button

        onClick={() => handleDeleted(post._id)}
        
        className='bg-red-500 text-white px-4 py-2 rounded-md'>Delete</button>


      </div>
    </div>
  );
};

export default PostDetail;
