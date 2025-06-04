import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/order.controller.js';

const router = express.Router();

router.post('/cod',protectRoute,placeOrderCOD);

router.get('/user',protectRoute,getUserOrders);

router.get('/seller',protectRoute,getAllOrders);

router.post('/stripe',protectRoute,placeOrderStripe);

export default router;