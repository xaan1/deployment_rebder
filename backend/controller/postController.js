import Post from "../model/post.js";


export const createPost = async (req, res) => {

  

    try {
        const { title, content, thumbnail ,author} = req.body;

        if(!title || !content || !thumbnail || !author) {
            return res.status(400).json({message: "All fields are required"})
        }


        const userId = req.user

        console.log(userId.id)


        const post = new Post({
            title,
            content,
            thumbnail,
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


        const {id} = req.params;


        //  check if the user author post updated








          const post = await Post.findById(id)

          if(!post) {
            return res.status(404).json({message: "Post not found"})
        }


           const userId = req.user.id


        // if(userId.toString() !==   post.author.toString()) {
        //     return res.status(401).json({message: "You are not authorized to update this post"})
        // }


      




        const updatedPost = await Post.findByIdAndUpdate(id ,{
            title: req.body.title,
            content: req.body.content,
            thumbnail: req.body.thumbnail
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

        const post = await Post.findById(id).populate("author")

        res.status(200).json({post})

    } catch (error) {
        console.log(error);
        res.send("error avialabe in get One Post")
    }



}