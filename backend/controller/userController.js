import User from "../model/user.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const Register =  async (req, res) => {


    try {


        const {name , email,password} = req.body;

     
     
        if(!name || !email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }



        const existingUser =  await User.findOne({email});


        if(existingUser) {
            return res.status(400).json({message: "User already exists"});
        }




        const HashedPassword = await bcrypt.hash(password, 10);


        const user = await User.create({
            name,
            email,
            password: HashedPassword
        })



        return res.status(201).json({user});



    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}



export const login = async (req, res) => {



    try {



        const {email,password} = req.body;




        if(!email || !password) {
            return res.status(400).json({message: "Please fill all the fields"});
        }




        const existingUser =  await User.findOne({email})



        if(!existingUser) {
            return res.status(400).json({message: "User does not exist"});
        }




        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);



        if(!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid Credentials"});
        }


        console.log(existingUser)




        // jwtnp


        const token = jwt.sign(
            { id: existingUser._id  }, 
            "test", 
            { expiresIn: "1hr" }
          );


          
         res.cookie("token", token, {
         httpOnly: true,
         secure: false,
      
         
      })

        
        return res.status(200).send(existingUser);
        

    } catch (error) {
        return res.status(500).json({error: error.message});
    }







}



// getProfile

export const getProfile = async(req, res) => {

    try {

        const user =  await  User.findById(req.user.id)

        res.send(user)




        





    }catch(err){

        console.log("error at get user profile", err);
        res.status(400).send("unknown error");
    }



}



//  logout


export const logout = async(req, res) => {
    
        try {
    
                    // Tirtir token cookie-ga
                    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" }); // Sidoo kale waxaad ku dari kartaa options amniga oo dheeraad ah
                    res.status(200).json({ message: "Logged out successfully" }); // U dir jawaab sax ah iyo farriin cad
                    
        
            
    
        }catch(err){
    
            console.log("error at logout", err);
        }
}


export const makeAsAdmin = async(req, res) => {
    try {
        const id = req.user.id;  // ID-ga user-ka waa inuu ku jiraa req.user



        const updatedUser = await User.findByIdAndUpdate(
            id,  // ID-ga user-ka
            { isAdmin: true },  // isAdmin = true
            { new: true, runValidators: true }  // Si updated user loo helo
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User is now admin", user: updatedUser });
         // U dir user-ka cusub
    } catch (err) {
        console.log("error at makeAsAdmin", err);
        return res.status(500).json({ message: "Server error" });
    }
};
