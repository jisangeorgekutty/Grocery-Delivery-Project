import User from "../models/User.js";

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.bosy;
        await User.findByIdAndUpdate(userId, { cartItems });
        res.status(200).json({ message: "Cart Updated" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

