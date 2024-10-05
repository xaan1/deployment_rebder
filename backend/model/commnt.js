
import mongoose from "mongoose";


const commentSchema = mongoose.Schema({

    content : {
        type: String,
        required: true,
      
    },


    author : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    blog : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
   
  
} ,[{timestamps: true}])



const Comment = mongoose.model("Comment", commentSchema)

export default Comment;