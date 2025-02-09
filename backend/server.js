import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import productRoutes from './routes/products.routes.js'; 

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json()); // Allows us to use JSON data in req.body

app.use("/api/products", productRoutes);

// Fix the console log syntax
console.log(process.env.MONGO_URI);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
