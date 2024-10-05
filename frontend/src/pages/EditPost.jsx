import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContex';

const EditPost = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState({});
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(''); // Store image URL or file here

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/posts/onePost/${id}`);
        setPosts(data.post);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (posts) {
      setTitle(posts.title || '');
      setContent(posts.content || '');
      setThumbnail(posts.thumbnail || ''); // Set thumbnail URL if exists
    }
  }, [posts]);

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (thumbnail instanceof File) {
        formData.append('thumbnail', thumbnail); // Only append if it's a file
      }

      await axios.put(`http://localhost:8000/api/posts/updated-post/${id}`, formData, {
        withCredentials: true,
      });

      navigate('/');
    } catch (e) {
      alert(e.response?.data?.message || 'Something went wrong');
      console.log(e);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file); // Store the file directly
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[700px] p-4">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[700px] mt-20">
        <h2 className="text-center text-3xl font-semibold mb-5">Update Post</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-y-4 mt-4 space-y-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Description"
            className="p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="file"
            onChange={handleChangeImage}
            className="p-2 border text-2xl font-semibold border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {thumbnail && (
            <>
              {thumbnail instanceof File ? (
                // If thumbnail is a file, use createObjectURL
                <img
                  src={URL.createObjectURL(thumbnail)}
                  alt="Thumbnail"
                  className="w-full h-96 object-cover rounded-lg"
                />
              ) : (
                // If thumbnail is a URL (from the database), use the URL directly
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="w-full h-96 object-cover rounded-lg"
                />
              )}
            </>
          )}
          <button className="bg-blue-400 text-white p-2 rounded-lg text-3xl font-semibold">
            Update Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
