const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const productmodule = require('../modules/product');
const productController = require('../controller/product');
const authMiddleware = require('../middleware/authMiddleware');


router.get('/',(req,res)=>{
    res.send('workingg product')
})

router.post('/add', upload.single('image'),authMiddleware.authAdmin,productController.addProduct);

router.get('/all',productController.getAllProducts); 

router.get('/delet/:id',authMiddleware.authAdmin,productController.deleteProduct);

router.get('/single/:id',productController.getSingleProduct)

router.post('/editProduct/:id',upload.single('image'),authMiddleware.authAdmin,productController.editProduct);


module.exports = router;