import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Product from './models/product.Model.js'; // Import the model
// Removed unused import
import mongoose from "mongoose";


dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // Allows us to use JSON data in req.body

app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json ({success: true , data: products});
    } catch (error) {
        console.log("Couldn't get products", error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

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

app.put ('/api/products/:id', async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: 'Invalid Product ID' });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        res.status(200).json({ success: true, data: updatedProduct });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    });

app.delete('/api/products/:id', async (req, res) => {
    const {id} = req.params;
    
try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product is deleted' });
} catch (error) {
    console.log("Couldn't delete product", error.message);
    console.error("Couldn't delete product", error.message);
    res.status(404).json({ success: false, message: 'Product not found' });
    }
});

console.log(process.env.MONGO_URI); // Fix the console log syntax

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
