
import express from "express";

const app = express()
import mongoose from "mongoose"
import router from "./router/userRouter.js";

import cookieParser from "cookie-parser";
import postRouter from "./router/postRouter.js";
import path from "path"

import cors from "cors"
import dotenv from "dotenv"



app.use(express.json())  //  middleware

app.use(cookieParser())  //  middleware

dotenv.config()



app.use(cors({
  origin: 'http://localhost:5173',  // Origin waa URL-ka frontend-ka
  credentials: true  // Oggolow cookies iyo token
}));



//  get request


mongoose.connect("mongodb+srv://aasiyomaxmedapdi:Oa1N7OGqmp2b2n0Z@cluster0.4rpye.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });




  app.use("/api/users", router)
  app.use("/api/posts", postRouter)




  if (process.env.NODE_ENV === 'production') {

    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });

} else {
    app.get('/api', (req, res) => {
        res.send('API is running');
    });
}
 


app.listen(8000 , () => {

    console.log("your Server is Running 8000 ")

})


