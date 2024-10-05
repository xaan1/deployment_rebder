
import express from "express";

import { createComment, createPost, deleteComment, deletePost, getAllComment, getAllPost, getOneComment, getOnePost, getPostByAuthor, likePost, updateComment, updatePost } from "../controller/postController.js";
import { isAuthenticate } from "../mddlewere/isAuth.js";
import upload from "../config/multer.js";

const postRouter =  express.Router()




postRouter.post("/create-post", isAuthenticate,  upload.single("thumbnail"), createPost)

postRouter.delete("/delete-post/:id", isAuthenticate, deletePost)


postRouter.put("/updated-post/:id", isAuthenticate,upload.single("thumbnail"), updatePost)


postRouter.get("/author"    ,isAuthenticate , getPostByAuthor)


postRouter.get("/allPost"    , getAllPost)

postRouter.get("/onePost/:id"    , getOnePost)

// commentroute


postRouter.post("/comment/:id", isAuthenticate, createComment)

postRouter.delete("/delete-comment/:id", isAuthenticate, deleteComment)


postRouter.put("/updated-comment/:id", isAuthenticate, updateComment)

postRouter.get("/allcommet"    , getAllComment)


postRouter.get("/onecomment/:id"    , getOneComment)



// like post route

postRouter.post("/like/:id", isAuthenticate, likePost)




export default postRouter;