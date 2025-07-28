const { json } = require('express');
const userModule = require('../modules/user');
const userServices = require('../service/user');
const { validationResult } = require('express-validator')
const mongoose = require('mongoose');

module.exports.registerController = async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) { return res.status(400).json({ error: err.array()[0].msg }); }
    const {fullName,email,password} = req.body;
    const isUserExist = await userModule.findOne({email});
    if (isUserExist) { return res.status(400).json({ message: "user Alreday Exist !!" }) }
    try {
        const user = await userServices.createUser(req.body);
        const token = await user.gnrateToken();
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json(err.message);
    }
};

module.exports.loginController = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty())
    {
        return res.status(400).json({ message: 'Invalid Email or Password' });
    }
    const {email, password} = req.body;
    const user = await userModule.findOne({email});
    if(!user)
        {
            return res.status(401).json({message:"Invalid Email Password"});
        } 
    const isMatch = await user.validpassword(password);
    if(!isMatch)
    {
            return res.status(401).json({message:"Invalid Email Password"});      
    }
    const token = user.gnrateToken();
    res.cookie('token',token);
    res.status(200).json({token,user});
};

module.exports.loggedoutUser = async (req,res)=>{
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
}

module.exports.profile = async(req,res)=>{
    const {email} = req.user;
    const user = await userModule.findOne({email});
    res.status(200).json({user}) ;
};

module.exports.updateProfile = async (req,res)=>{
    try {
    const {email} = req.user;
    const user = await userModule.findOne({email})
    const updateFildes = {};
    if(req.body.fullName) updateFildes.fullName = req.body.fullName;
    if(req.body.phone) updateFildes.phone = req.body.phone;
    if(req.body.address){
        updateFildes.address={
            ...user.address.toObject(),
            ...req.body.address
        };
    }
    const updateProfile = await userModule.findOneAndUpdate({email},updateFildes,{new:true});
    res.status(200).json({message: "Profile Update ",user: updateProfile});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Kuch toh problem aa rhi update me bhai chek kr "})
    }

};

module.exports.allUsers = async (req, res) => {
    try{
        const users = await userModule.find({}).select('-password -__v');
        res.status(200).json(users);
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching users"});
    }
}
 
module.exports.deleteUser = async(req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(400).json({message: "User ID is required"});
    }
    if(id === req.user._id.toString()){
        return res.status(400).json({message: "You cannot delete your own account"});
    }

    try{
        const user = await userModule.findByIdAndDelete(id);
        if(!user){
            res.status(404).json({message:"user not found"});
            return;
        }
        res.status(200).json({message:"User deleted successfully"});
    }catch(erro){
        console.log(req._id);
        res.status(500).json({message: 'Error to delete user'+ erro.message});
    }
}

module.exports.addToCart = async (req, res) => {
  const { id } = req.params; // Product ID
  const user = req.user;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const userData = await userModule.findById(user._id);

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if product already in cart
    const existingItem = userData.cart.find(item => item.productId === id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      userData.cart.push({ productId: id, quantity: 1 }); // ✅ push as object
    }

    await userData.save();

    res.status(200).json({ message: "Product added to cart successfully", cart: userData.cart });
  } catch (error) {
    return res.status(500).json({ message: "Error adding to cart " + error.message });
  }
};


module.exports.getCart = async(req,res)=>{
    const userId = req.user._id;
  try {
    const user = await userModule.findById(userId).populate("cart.productId");

    const cartWithBase64Images = user.cart.map((item) => {
      const product = item.productId;

      let base64Image = null;

      if (
        product?.images &&
        product?.images.length > 0
      ) {
        const imageBuffer = product.images[0]; // If direct Buffer
        base64Image = Buffer.from(imageBuffer).toString("base64");
      }

      return {
        ...item?.toObject(),
        productId: {
          ...product?.toObject(),
          images: [base64Image], // ✅ Send base64 string here
        },
      };
    });

    res.status(200).json({ cart: cartWithBase64Images });

  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports.removeFromCart = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!id) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const userData = await userModule.findById(user._id);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔥 One-line fix here
    userData.cart.pull(id);    
    await userData.save();

    res.status(200).json({
      message: "Product removed from cart successfully",
      cart: userData.cart,
    });
    
  } catch (error) {
    console.error("Error removing from cart:", error.message);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

module.exports.chekout = async(req,res)=>{
    try {
      const userId = req.user.id; // 🛡️ You must have JWT middleware to set this
      
      // STEP 1: Find the user
      const user = await userModule.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // STEP 2: Check if cart is empty
      if (!user.cart || user.cart.length === 0) {
        return res.status(400).json({ message: "Cart is already empty" });
      }

      // STEP 3: Calculate total
      const total = user.cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
      }, 0);

      // STEP 4: Prepare pastOrder object (same format as schema)
      const newOrder = {
        items: user.cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price || 0,
        })),
        total: total || 0,
        orderDate: new Date(),
      };

      // STEP 5: Push pastOrder & Clear cart
      await userModule.findByIdAndUpdate(userId, {
        $push: { pastOrders: newOrder },
        $set: { cart: [] },
      });

      // STEP 6: Respond success
      res.status(200).json({
        message: "Order placed successfully!",
        pastOrder: newOrder,
      });
    } catch (err) {
      res.status(500).json({ message: "Something went wrong while placing order" + err });
    }
}

module.exports.getOders = async(req,res)=>{
  try{
    const userId = req.user.id;
    const userData = await userModule.findById(userId).populate('pastOrders.items.productId');
    const pastOrder = userData.pastOrders
    res.status(200).json(pastOrder);
  }catch(err)
  {
    res.status(500).json({message: "Something error to get old oders " + err})
  }
}