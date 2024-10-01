
import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    content : {
        type: String,
        required: true,
      
    },

    thumbnail : {
        type: String,
      
      
    },


    author : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
   
  
} ,[{timestamps: true}])



const Post = mongoose.model("Post", postSchema)

export default Post;