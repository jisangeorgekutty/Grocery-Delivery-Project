import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT=process.env.PORT;
const app = express();



app.get('/',(req,res)=>{
    res.send("API is Working");
})

app.listen(PORT,()=>{
    console.log("Server Running On Port : "+PORT);
})