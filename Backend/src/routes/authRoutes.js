import express from "express";
import { login, register, updateProfile } from "../controllers/authControllers.js";
import protectRoute from "../middleware/authMiddleware.js";


const router= express.Router();


router.post("/register",register);

router.post("/login",login);

router.put("/update-profile", updateProfile);

export default router;