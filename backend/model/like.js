
import mongoose from "mongoose";


const likeSchema = mongoose.Schema({


    author : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },

    blog : {

        type : mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
   
  
} ,[{timestamps: true}])



const Like = mongoose.model("Like", likeSchema)

export default Like;