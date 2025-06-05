import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from 'stripe';
import User from "../models/User.js";


export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;

        if (!address || items.length === 0) {
            return res.status(400).json({ message: "Invalid Data" });
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

export const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;
        const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

        if (!address || items.length === 0) {
            return res.status(400).json({ message: "Invalid Data" });
        }

        let productData = [];
        // calculate total amount of order
        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        // calculate amount after  2% tax
        amount += Math.floor(amount * 0.02);

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });


        const line_items = productData.map((item) => {
            const priceWithTax = item.price + item.price * 0.02;
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: Math.floor(priceWithTax * 100)
                },
                quantity: item.quantity,

            }
        })

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            }
        })

        res.status(200).json({ success: true, url: session.url, message: "Online Playment CheckOut" });

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
        res.status(500).json({ success: false, message: "Internal Server Error" });
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

export const stripeWebHooks = async (req, res) => {
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        res.status(400).send(`WebHook Error :${error.message}`);
        return;
    }

    // handle event

    switch (event.type) {
        case "payment_intent.succeeded": {
            console.log(" Payment succeeded");
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });
            if (!session.data.length) {
                console.error("No Stripe session found for payment_intent:", paymentIntentId);
                return res.status(400).json({ message: "No Stripe session found" });
            }

            console.log("Webhook session metadata:", session.data[0].metadata);
            const { orderId, userId } = session.data[0].metadata;
            if (!orderId || !userId) {
                console.error("orderId or userId missing in session metadata");
                return res.status(400).json({ message: "Missing orderId or userId in metadata" });
            }
            await Order.findByIdAndUpdate(orderId, { isPaid: true });
            await User.findByIdAndUpdate(userId, { cartItems: {} });
            break;
        }
        case "payment_intent.payment_failed": {
            console.log(" Payment failed");
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeInstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            });

            const { orderId } = session.data[0].metadata;


            if (!orderId) {
                console.error("orderId missing in metadata for failed payment");
                return res.status(400).json({ message: "Missing orderId in metadata" });
            }

            await Order.findByIdAndDelete(orderId);
            break;
        }
        default:
            console.error(`Unhandled event type ${event.type}`);
            break;
    }
    res.json({ received: true });

}