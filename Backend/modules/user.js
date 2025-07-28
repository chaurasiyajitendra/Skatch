const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {body}= require('express-validator');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
        country: { type: String }
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    cart: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: { type: Number, default: 1 },
            price: { type: Number }
        }
    ],
    pastOrders: [
        {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            items: [
                {
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
                    quantity: Number,
                    price: Number
                }
            ],
            total: Number,
            orderDate: { type: Date, default: Date.now }
        }
    ],
});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password,10)
};

userSchema.methods.validpassword = async function (password) {
    return await bcrypt.compare(password,this.password);
};

userSchema.methods.gnrateToken = function(email){
    return jwt.sign({email :this.email},process.env.JWT,{expiresIn: '48h'})
};

const User = mongoose.model('User', userSchema);

module.exports = User;
