
import React, { useState } from 'react';
import { HiOutlineHeart } from "react-icons/hi";


import axios from 'axios';
import { AiFillHeart } from "react-icons/ai";
const LikeButton = ({post  ,user}) => {







     const [optimisticLikes, setOptimisticLikes] = useState(post.likes.length);
     
     const [isLiked, setIsLiked] = useState(post.likes.some(like => like.user === user.id));



    const handllike = async() => {


       await hadalLikeButton()

    }






    const hadalLikeButton =  async()=> {

      
        setIsLiked(!isLiked)


        setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1)




        try {

            const {data} =await axios.post(`http://localhost:8000/api/posts/like/${post._id}`, {
            
            },{ withCredentials: true })
            console.log(data)
              // window.location.reload();
        } catch (err) {
          console.log(err.response.data);
        }

    }




    // console.log(post)
    // console.log(user)



    // const existingLike = post.likes.some(like => like.user === user.id);

    // console.log(existingLike)


    // const likeText =   post.likes.length === 1 ? '1 like' : `${post.likes.length} likes`;


  return (
    <div

    className='flex gap-x-2 justify-content-center align-items-center'
    
    >

<button 

onClick={handllike}

className=" text-black px-4 py-2 rounded-md flex gap-x-2 items-center">

    {
        isLiked ?  <AiFillHeart    /> :    <HiOutlineHeart />
    }

    {optimisticLikes}

  

    </button>


   
      
    </div>
  );
}

export default LikeButton;
