
import express from "express";
import { createPost, deletePost, getAllPost, getOnePost, getPostByAuthor, updatePost } from "../controller/postController.js";
import { isAuthenticate } from "../mddlewere/isAuth.js";

const postRouter =  express.Router()




postRouter.post("/create-post", isAuthenticate, createPost)

postRouter.delete("/delete-post/:id", isAuthenticate, deletePost)


postRouter.put("/updated-post/:id", isAuthenticate, updatePost)


postRouter.get("/author"    ,isAuthenticate , getPostByAuthor)


postRouter.get("/allPost"    , getAllPost)

postRouter.get("/onePost/:id"    , getOnePost)




export default postRouter;