import express from "express";
import {loginUser, registerUser,logoutUser} from '../controller/user.controller'
import { verifyJWT } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

// secured route

router.route("/logout").post(verifyJWT ,logoutUser)

export default router;