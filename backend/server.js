import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.Model.js'; // Import the model

dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Allows us to use JSON data in req.body

app.post('/api/products', async (req, res) => {
    const product = req.body; // User will send this data 

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newProduct = new Product(product); // Fixed error here

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Couldn't create product", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

console.log(process.env.MONGO_URI); // Fix the console log syntax

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
