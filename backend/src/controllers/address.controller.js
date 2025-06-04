import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;
        await Address.create({ ...address, userId });
        res.status(200).json({success:true,message:"Address Added Successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}

export const getAddress= async(req,res)=>{
    try{
        const {userId}=req.query;
        const address= await Address.find({userId});
        res.status(200).json({ success: true, address });
    }catch(error){
        console.log(error.message);
        res.status(500).json({success: false, message: "Internal Server Error" });
    }
}