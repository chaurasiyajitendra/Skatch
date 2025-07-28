const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controller/user');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register',[
    body('fullName').isLength({min: 3}).withMessage("Full name must be have 3 latters "),
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')],
    userController.registerController
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password')],
    userController.loginController
);

router.get('/logout',
    authMiddleware.authUser,//midleware
    userController.loggedoutUser//controler
);

router.put('/update',
    authMiddleware.authUser,
    userController.updateProfile
)

router.get('/profile',
    authMiddleware.authUser,//middleware 
    userController.profile//controler
)

router.get("/allUsers",
    authMiddleware.authUser,
    userController.allUsers
);

router.get('/delete/:id',
    authMiddleware.authAdmin,
    userController.deleteUser
)

router.get('/addToCart/:id',
    authMiddleware.authUser,
    userController.addToCart
)

router.get('/getCart',
    authMiddleware.authUser,
    userController.getCart
);

router.get('/removeFromCart/:id',
    authMiddleware.authUser,
    userController.removeFromCart
)

router.post('/chekout',
    authMiddleware.authUser,
    userController.chekout
)

router.get('/myOrders',
    authMiddleware.authUser,
    userController.getOders
)


module.exports = router;