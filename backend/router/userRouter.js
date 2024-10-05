
import express from "express";
import { getProfile, login, logout, makeAsAdmin, Register } from "../controller/userController.js";
import { isAdmin, isAuthenticate } from "../mddlewere/isAuth.js";


const router =  express.Router()






router.post("/register",  Register)


router.post("/login",  login)


router.get("/profile" , isAuthenticate , getProfile)

router.post("/logout" , logout)

router.put("/admin", isAuthenticate, isAdmin, makeAsAdmin);


export default router;