import express from "express";
import protectRoute from "../middleware/authMiddleware.js";
import { createBook, getBooks , deleteBook,getBookByUser } from "../controllers/bookControllers.js";



const router= express.Router();

router.post('/create',protectRoute,createBook);
router.get('/',protectRoute,getBooks);
router.get('/user',protectRoute,getBookByUser);
router.delete('/:id',protectRoute,deleteBook);

export default router;