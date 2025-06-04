import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (!address || items.length === 0) {
            return res.status(400).json({ message: "Inavlaid Data" });
        }

        // calculate total amount of order
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // calculate amount after  2% tax
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        res.status(200).json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log("Error in placing order:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.query;
        const orders = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
        }).populate("items.product address").sort({ createdAt: -1 });
        res.status(200).json({ success: true, orders });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}