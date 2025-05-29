import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './configs/db.js';
import authRoutes from './routes/auth.route.js';


dotenv.config();
const PORT=process.env.PORT;
const app = express();
const allowedOrigins=['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials:true}));





app.use('/',(req,res)=>{
    res.send("API is Working");
});
app.use('/api/auth',authRoutes);



app.listen(PORT,()=>{
    console.log("Server Running On Port : "+PORT);
    connectDB();
})