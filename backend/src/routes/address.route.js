import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { addAddress, getAddress } from '../controllers/address.controller.js';

const router = express.Router();

router.post('/add', protectRoute,addAddress);

router.get('/get',protectRoute,getAddress);


export default router;