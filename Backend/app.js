const express = require('express');
const app = express();
const db = require('./config/db'); 
db();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/produtRouter');
const cors = require('cors');
const path = require('path');

const allowedOrigins = [
  'http://localhost:5173',             // Local Vite frontend
  'https://skatch-frontend.onrender.com' // Deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Agar origin list me hai ya origin undefined hai (Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.use('/user',userRouter);
app.use('/product',productRouter);


 



module.exports = app;
