
// STOPPED AT 19:15 Createing a Product Model https://www.youtube.com/watch?v=O3BUHwfHf84
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';

dotenv.config();

 const app = express();

 app.get('/products', (req, res) => {
  });

console.log('process.env,MONGO_URI');

app.listen(5000, () =>{
    console.log('Server is running on port 5000');
});

