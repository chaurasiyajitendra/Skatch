const express = require('express');
const app = express();
const db = require('./config/db'); 
const cookieParser = require('cookie-parser');
db();
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/produtRouter');
const cors = require('cors');
const path = require('path');

app.use(cors({
    origin: 'https://skatch-frontend.onrender.com', // frontend ka domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // agar cookies ya tokens bhejne hain
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.use('/user',userRouter);
app.use('/product',productRouter);


 



module.exports = app;
