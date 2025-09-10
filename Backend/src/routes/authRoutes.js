import express from "express";
import { forgotPassword, login, register, resetPassword, updateProfile } from "../controllers/authControllers.js";
import protectRoute from "../middleware/authMiddleware.js";



const router= express.Router();


router.post("/register",register);

router.post("/login",login);

router.put("/update",protectRoute,updateProfile);

// 🔥 Forgot / Reset Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;