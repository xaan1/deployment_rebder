
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],


    author : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },


    likes : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Like"
        }
    ]
   
  
} ,[{timestamps: true}])



const Post = mongoose.model("Post", postSchema)

export default Post;