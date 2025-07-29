const express = require('express');
const app = express();
const db = require('./config/db'); 
const cookieParser = require('cookie-parser');
db();
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/produtRouter');
const cors = require('cors');
const path = require('path');

const allowedOrigins = [
  'http://localhost:5173',                   // Local frontend
  'https://skatch-frontend.onrender.com'     // Production frontend
];

// ✅ Dynamic CORS handling
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests from allowed origins or server-to-server (no origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Handle preflight OPTIONS request
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



app.use('/user',userRouter);
app.use('/product',productRouter);


 



module.exports = app;
