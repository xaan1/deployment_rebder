import Post from "../model/post.js";

import Comment from "../model/commnt.js";
import cloudinary from "../config/cloudnry.js";
import Like from "../model/like.js";

export const createPost = async (req, res) => {

  

    try {


        let result;


        if(req.file){
            // console.log(req.file)

            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'auto',  // Tusaale ahaan, 'auto' haddii uu yahay image ama video
                transformation: [
                    { width: 500, height: 500, crop: "limit" }
                ],
                encoding: 'base64',
            });


        }





       

        const userId = req.user

        console.log(userId.id)

        // const post = new Post({
        //     content: req.body.content,
        //     image: result?.url || null,
        //     author: req.user._id
        // });


        const post = new Post({
            title : req.body.title,
            content: req.body.content,
            thumbnail : result?.url || "",
            author: userId.id
        })


        await post.save()



        res.status(201).send(post)




      
        } catch (error) {
        console.log(error);
        res.send("error avialabe in create Post")
        }



}


//  delete post


export const deletePost = async (req, res) => {


    try {
        const {id} = req.params;


        const post = await Post.findById(id)


        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        
        const userId = req.user.id


        // if(userId.toString() !==   post.author.toString()) {
        //     return res.status(401).json({message: "You are not authorized to deleted this post"})
        // }


        const deleted =  await Post.findByIdAndDelete(id)

        res.status(200).json({message: "Post deleted successfully"})


    }catch(e){
        console.log(e);
        res.send("error avialabe in delete Post")
    }

}





//  updated post



export const updatePost = async (req, res) => {


    try{

        let result;


        if(req.file){
            // console.log(req.file)

            let encodedImage = `data:image/jpg;base64,${req.file.buffer.toString('base64')}`;

            result = await cloudinary.uploader.upload(encodedImage, {
                resource_type: 'auto',  // Tusaale ahaan, 'auto' haddii uu yahay image ama video
                transformation: [
                    { width: 500, height: 500, crop: "limit" }
                ],
                encoding: 'base64',
            });


        }


        const {id} = req.params;


        //  check if the user author post updated

          const post = await Post.findById(id)

          if(!post) {
            return res.status(404).json({message: "Post not found"})
        }


           const userId = req.user.id
      




        const updatedPost = await Post.findByIdAndUpdate(id ,{
            title: req.body.title,
            content: req.body.content,
            thumbnail: result?.url || ""
        }, {new: true})


        res.status(200).json({updatedPost})
        


    }  catch(e){
        console.log(e);
    }




}






//  get all post


export const getAllPost = async (req, res) => {

    try {
        const posts = await Post.find({})

        res.status(200).json({posts})

    } catch (error) {
        console.log(error);
        res.send("error avialabe in get All Post")
    }
}



//  get all post from author



export const getPostByAuthor = async (req, res) => {


    try {


        const user = req.user.id

        console.log(user)


        const posts = await Post.find({author: user})


     
        res.status(200).json({posts})



    }catch(e){
        console.log(error);
        res.send("error avialabe in Post from author")

    }



}




//  getOnePost


export const getOnePost = async (req, res) => {

    try {
        const {id} = req.params;

        const post = await Post.findById(id)
        .populate({
            path : "author",
            model : "User"
        })       // Tani waxay soo qaadaysaa xogta qoraaga
        .populate({
            path: 'comments',
            populate: { path: 'author' }  // Xogta qoraaga faallada
        }).populate({
            path: 'likes',
            populate: { path: 'author' }  // Xogta qoraaga faallada

           
        })



        res.status(200).send({post})  

    } catch (error) {
        console.log(error);
        res.send("error avialabe in get One Post")
    }



}



// createPost

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.params;  // ID-ga post-ka
        
        const userId = req.user.id;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Sameynta faallada cusub
        const comment = new Comment({
            content,
            author: userId,
            blog: id
        });

        await comment.save();

        // Ku darista comment-ka array-ga faallooyinka ee post-ka
        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({ comment });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error in creating comment" });
    }
}



//  delete comment



export const deleteComment = async (req, res) => {


    try {
        const {id} = req.params;

        const comment = await Comment.findById(id)

        if(!comment) {
            return res.status(404).json({message: "Comment not found"})
        }

        const userId = req.user.id

        if(userId.toString() !==   comment.author.toString()) {
            return res.status(401).json({message: "You are not authorized to deleted this comment"})
        }

        const deleted =  await Comment.findByIdAndDelete(id)

        res.status(200).json({message: "Comment deleted successfully"})
    }catch(e){
        console.log(e);
        res.send("error avialabe in delete comment")
    }
}



// update comment



export const updateComment = async (req, res) => {


    try{



        const {id} = req.params;

        const comment = await Comment.findById(id)





        if(!comment) {
            return res.status(404).json({message: "Comment not found"})
        }



        const userId = req.user.id




        if(userId.toString() !==   comment.author.toString()) {
            return res.status(401).json({message: "You are not authorized to update this comment"})
        }




        const updatedComment = await Comment.findByIdAndUpdate(id ,{
            content: req.body.content
        }, {new: true})


        res.status(200).json({updatedComment})



    }  catch(e){
        console.log(e);
    }
}



// get all comment



export const getAllComment = async (req, res) => {
    
        try {
            const comments = await Comment.find({})
    
            res.status(200).json({comments})
    
        } catch (error) {
            console.log(error);
            res.send("error avialabe in get All Comment")
        }
}



// oneComment


export const getOneComment = async (req, res) => {

    try {
        const {id} = req.params;

        const comment = await Comment.findById(id)
        .populate("author")       // Tani waxay soo qaadaysaa xogta qoraaga
        .populate({
            path: 'blog',
            populate: { path: 'author' }  // Xogta qoraaga faallada

        })



    res.status(200).send({comment})
    }



 

    
    catch (error) {
        console.log(error);
        res.send("error avialabe in get One Comment")
    }
        
}





// likePost



export const likePost = async (req, res) => {



     try {


        const {id} = req.params;

        const post = await Post.findById(id)

        if(!post) {
            return res.status(404).json({message: "Post not found"})
        }

        

        const existingLike =  await Like.findOne({ blog : post._id, author: req.user.id})

        console.log(existingLike , "waaaye")


        if(existingLike) {

            await Like.findByIdAndDelete(existingLike._id)

            post.likes.pull(existingLike._id)
            await post.save()
            return res.status(200).json({message: "Post unliked successfully"})
        }



        const like = new Like({

            author : req.user.id,
            blog : post._id
        })


        await like.save()


        post.likes.push(like._id)


        await post.save()

        res.status(200).json({message: "Post liked successfully"})




     }  catch(e){
        console.log(e);


     }



}