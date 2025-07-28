const productmodule = require('../modules/product');

module.exports.addProduct = async(req,res)=>{
    const { name, price, description, category } = req.body;
    const images = req.file ? [req.file.buffer] : [];
    const newProduct = productmodule.create({
        name,
        price,
        description,
        category,
        images,
    })
    try {
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product' });
    }
};

module.exports.getAllProducts = async(req,res)=>{
  
    try {
        const products = await productmodule.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching products' });
    }
}

module.exports.deleteProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        const deleteProduct = await productmodule.findByIdAndDelete(id);
        if(!deleteProduct){
            res.status(404).json({message: 'Product not found'});
            return;
        }
        res.status(200).json({message: 'Product deleted successfully'});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Something Error to Delete Product' + error})
    }
}

module.exports.getSingleProduct = async(req,res)=>{
    const {id} = req.params;
    try{
        const product = await productmodule.findById(id);
        if(!product)
        {
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: 'Something Error to Get Product' + error})
    }
}

module.exports.editProduct = async (req, res) => {
  const { id } = req.params;

  try { 
    const existingProduct = await productmodule.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedFields = {};

    // Check text fields
    const { name, description, price, category } = req.body;
    if (name && name !== existingProduct.name) updatedFields.name = name;
    if (description && description !== existingProduct.description)
      updatedFields.description = description;
    if (price && price !== existingProduct.price)
      updatedFields.price = price;
    if (category && category !== existingProduct.category)
      updatedFields.category = category;

    // Check image
      
    if (req.file && req.file.buffer) 
    {
      updatedFields.images = [req.file.buffer];
    }

    const updatedProduct = await productmodule.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );  
    res.status(200).json({
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error " + err });
  }
};


