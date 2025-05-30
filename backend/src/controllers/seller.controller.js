import jwt from 'jsonwebtoken';

export const sellerLogin = (req, res) => {
    const { email, password } = req.body;

    try {
        if (password == process.env.SELLER_PASSWORD && email == process.env.SELLER_EMAIL) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

            res.cookie("sellerToken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(200).json({ message: "Seller logged in successfully" });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error in the seller login:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sellerAuth = (req, res) => {
    try {
        return res.status(200).json({ success: true, message: "Seller is authenticated" });
    } catch (error) {
        console.log("Error in the sellerAuth:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sellerLogOut = (req, res) => {
    try {
        // cookie remove
        res.cookie("sellerToken", "", { maxAge: 0 });
        res.status(201).json({ message: "Seller Logged out successfully" });
    } catch (error) {
        console.log("Error in logged out:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};