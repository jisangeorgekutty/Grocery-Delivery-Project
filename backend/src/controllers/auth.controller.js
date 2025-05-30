import { generateToken } from "../configs/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";


export const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashPassword
        })

        if (newUser) {
             generateToken(newUser._id, res);
            await newUser.save();  // save user in db
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }

    } catch (error) {
        console.log("Error in the signup:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Password is invalid" });
        }

        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });

    } catch (error) {
        console.log("Error in the login:", error.message);
        res.status(500).json({ message: "Internal Server  Error" })
    }
};

export const logOut = (req, res) => {
    try {
        // cookie remove
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(201).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logged out:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in the checkAuth:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

