
//  check is loggin
import jwt from "jsonwebtoken"
import User from "../model/user.js";


export const isAuthenticate =(req ,res ,next) => {




     try {


        const token = req.cookies.token 

        if (!token) return res.status(403).send({ status: false, message: "access denied, no Token Provided please login first" });

        // console.log(token ,"token")
       



        const decode = jwt.verify(token, "test");

        // console.log(decode)

        req.user = decode;

        next();



     }  catch (error) {
        console.log(error)
         return res.status(500).json({error: error.message});
     }





}




//  isAdmin



export const isAdmin = async(req ,res ,next) => {


    try {


        const userId = req.user.id;  // user-ka ID haddii aad haysato
        const user = await User.findById(userId);
        // console.log(user)
    
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Hubi haddii uu admin yahay


      
    
        next(); 
    





    } catch (error) {
        return res.status(500).json({error: error.message});
    }




}