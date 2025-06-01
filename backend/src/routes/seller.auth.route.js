import express from 'express';
import { sellerLogin, sellerAuth, sellerLogOut } from '../controllers/seller.controller.js';
import { protectSellerRoute } from '../middlewares/seller.auth.middleware.js';

const router = express.Router();

router.post('/login', sellerLogin);

router.get('/seller-auth', protectSellerRoute, sellerAuth);

router.get('/logout', sellerLogOut);

export default router;