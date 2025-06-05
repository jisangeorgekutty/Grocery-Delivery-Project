import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import authRoutes from './routes/auth.route.js';
import sellerAuthRoutes from './routes/seller.auth.route.js';
import connectCloudinary from './configs/cloudinary.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import addressRoutes from './routes/address.route.js';
import orderRoutes from './routes/order.route.js';
import { stripeWebHooks } from './controllers/order.controller.js';


dotenv.config();
const PORT = process.env.PORT;
const app = express();
const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({ type: "application/json" }), stripeWebHooks);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));





app.get('/', (req, res) => {
    res.send("Welcome to E-commerce API");
});
app.use('/api/auth', authRoutes);
app.use('/api/seller', sellerAuthRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);



app.listen(PORT, () => {
    console.log("Server Running On Port : " + PORT);
    connectDB();
    connectCloudinary();
})