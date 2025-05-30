import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { updateCart } from '../controllers/cart.controller.js';

const router=express.Router();

router.post('/update',protectRoute,updateCart);


export default router;