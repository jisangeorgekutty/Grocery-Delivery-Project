import Address from "../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;
        await Address.create({ ...address, userId });
        res.status(200).json({message:"Address Added Successfully"})
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAddress= async(req,res)=>{
    try{
        const {userId}=req.body;
        const address= await Address.find({userId});
        res.status(200).json(address);
    }catch(error){
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}