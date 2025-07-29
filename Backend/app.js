require('dotenv').config(); // ✅ Must be at top

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// ✅ Your mistake: You exported app and then imported again in same file
// ✅ Fixed: app.js only initializes express and exports it
const app = express();

// ✅ Connect MongoDB
connectDB();

// Routers
const userRouter = require('./routes/userRouter');
const productRouter = require('./routes/productRouter');

// ✅ CORS Setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://skatch-frontend.onrender.com'
];

// ✅ Your mistake: earlier path-to-regexp error due to incorrect route or protocol in app.use
// ✅ Fixed: proper CORS middleware without any protocol in routes
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for this origin'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.options('*', cors()); // Preflight requests

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Static folder
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ Routes
app.use('/user', userRouter);
app.use('/product', productRouter);

module.exports = app;
