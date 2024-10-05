import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContex';
import LikeButton from '../components/LikeButton';

const PostDetail = () => {
  const { id } = useParams();








  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for modal
  const [editingComment, setEditingComment] = useState(null); // State for comment being edited
  const [newCommentContent, setNewCommentContent] = useState(""); // State for new comment content

  const navigate = useNavigate();
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]); // State for comments
  

  if(!user) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/posts/onePost/${id}`);
        setPost(data.post);

        setComments(data.post.comments);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  // Handle deleting post
  const handleDeleted = async (id) => {
    try {
      const data = await axios.delete(`http://localhost:8000/api/posts/delete-post/${id}`, {
        withCredentials: true,
      });
      console.log(data);
      alert("Post Deleted");
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Handle comment submission
  const handlesubmitComment = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(
        `http://localhost:8000/api/posts/comment/${id}`,
        {
          content,
          author: user._id,
        },
        { withCredentials: true }
      );
      console.log(data);
      setComments([...comments, data.comment
      ]);
      setContent("");
      // window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  // Handle deleting comment
  const handleDeletedComment = async (commentId) => {
    try {
      const data = await axios.delete(`http://localhost:8000/api/posts/delete-comment/${commentId}`, {
        withCredentials: true,
      });
      console.log(data);
      window.location.reload();
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Handle opening edit modal


  const handleEditComment = (comment) => {
    setIsEditModalOpen(true);
    setEditingComment(comment);
    setNewCommentContent(comment.content); // Set initial content in the textarea
  };

  // Handle submitting edited comment
  const handleSubmitEdit = async () => {
    try {
      const data = await axios.put(
        `http://localhost:8000/api/posts/updated-comment/${editingComment._id}`,
        {
          content: newCommentContent,
        },
        { withCredentials: true }
      );
      console.log(data);
      setIsEditModalOpen(false); // Close modal
      window.location.reload(); // Refresh the page to see updated comment
    } catch (err) {
      console.log(err.response.data);
    }
  };

  // Handle closing edit modal

  
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingComment(null);
  };








  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img src={post.thumbnail} alt={post.title} className="w-full h-96 object-cover rounded-md" />
      <div className="flex items-center justify-between">

      <p className="mt-4 text-lg">{post.content}</p>
      <p className="mt-4 text-lg">{post?.author?.name}</p>

      <div>
      
      <LikeButton post={post} user={user} />
      </div>

        </div>
     



      <div className="flex gap-x-3">
        {post?.author?._id === user._id && (
          <>
            <button
              onClick={() => navigate(`/updated_post/${post._id}`)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleted(post._id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
            >
              Delete
            </button>
          </>
        )}
      </div>

      <div className="mt-4">
        <form className="flex flex-col gap-y-2" onSubmit={handlesubmitComment}>
          <textarea
            className="w-full h-24 border border-gray-300 rounded-md p-2"
            placeholder="Write your comment here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Add Comment</button>
        </form>
      </div>

      <div className="mt-4 mb-5">
        <h2 className="text-xl font-bold mb-4">Comments</h2>
        {post.comments.map((comment) => (
          <div
            key={comment._id}
            className="mt-4 border border-gray-300 p-4 rounded-md flex items-center justify-between"
          >
            <p className="text-gray-600 text-3xl font-semibold">{comment.content}</p>
            <div>
              {comment.author && comment.author._id === user._id &&(
                <div className="flex gap-x-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletedComment(comment._id)}
                    className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for editing comment */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-20 rounded-md shadow-md ">
            <h2 className="text-xl font-bold mb-4">Edit Comment</h2>
            <textarea
              className="w-[300px] h-40 border border-gray-300 rounded-md p-2"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
            ></textarea>
            <div className="flex justify-end mt-4">
              <button onClick={handleSubmitEdit} className="bg-green-500 text-white px-4 py-2 rounded-md mr-2">
                Save
              </button>
              <button onClick={handleCloseModal} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
