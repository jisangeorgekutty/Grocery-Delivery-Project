import express from 'express';
import { upload } from '../configs/multer.js';
import { protectSellerRoute } from '../middlewares/seller.auth.middleware.js';
import { addProduct, changeStock, productById, productList } from '../controllers/product.controller.js';


const router=express.Router();

router.post('/add',upload.array(["images"]),protectSellerRoute,addProduct);

router.get('/list',productList);

router.get('/id',productById);

router.post('/stock',protectSellerRoute,changeStock);

export default router;