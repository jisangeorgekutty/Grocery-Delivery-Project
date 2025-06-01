import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";


export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);

        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path,
                    { resource_type: 'image' }
                );
                return result.secure_url;
            })
        )

        await Product.create({ ...productData, image: imagesUrl });
        res.status(201).json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: "Internal Server Error" });
    }
}

export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock });
        res.status(200).json({ success: true, message: "Stock updated successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}