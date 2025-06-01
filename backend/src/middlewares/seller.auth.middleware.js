import jwt from 'jsonwebtoken';

export const protectSellerRoute = async (req, res, next) => {
    const sellerToken = req.cookies.sellerToken;
    try {
        if (!sellerToken) {
            return res.status(401).json({ message: "Unautherized - No token provided" });
        }

        const tokenDecoded = jwt.verify(sellerToken, process.env.JWT_SECRET);
        if (tokenDecoded.email === process.env.SELLER_EMAIL) {
            next();
        } else {
            return res.status(401).json({ message: "Unautherized - Invalid Token" });
        }

    } catch (error) {
        console.log("Error in the seller authentication", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}