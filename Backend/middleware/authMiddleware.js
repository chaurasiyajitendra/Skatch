const jwt = require('jsonwebtoken');
const User = require('../modules/user'); // ⬅️ import your User model

module.exports.authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    
    // ✅ Fetch the user by ID and attach it to req.user
    const userEmail = decoded.email;
    const user = await User.findOne({email: userEmail});
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    req.user = user;
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports.authAdmin = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized - No token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    
    // ✅ Fetch the user by ID and attach it to req.user
    const userEmail = decoded.email;
    const user = await User.findOne({email: userEmail});
    
    if (!user) return res.status(404).json({ message: 'User not found' });
    if(!user.email === 'admin@me.com' ) return res.status(401).json({message : "Your are not a admin !"})
    
    req.user = user;
    next();

  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

