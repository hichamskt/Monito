const Product = require("../models/productModel");
const Image = require("../models/imageModel");
const fs = require("fs");
const path = require("path");

const addNewProduct = async (req, res) => {
  try {
    const {
      porductName,
      productCategory,
      productSku,
      purchasePrice,
      sellingPrice,
      quantity,
      unite,
      status,
    } = req.body;

    const imageIds = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    for (const file of files) {
      const newImage = await Image.create({
        url: file.path,
        altText: file.originalname,
        type: "Product",
        relatedId: null,
      });
      imageIds.push(newImage._id);
    }

    const newProduct = new Product({
      porductName,
      productCategory,
      productSku,
      purchasePrice,
      sellingPrice,
      quantity,
      unite,
      images: imageIds,
    });

   
    const savedProduct = await newProduct.save();

          await Image.updateMany(
            { _id: { $in: imageIds } },
            { $set: { relatedId: savedProduct._id } } 
          );


    
          return res.status(201).json({
            message: 'Product added successfully',
            success: true,
            savedProduct
          });


  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "An error occurred while adding the Product.",
        error: error.message,
      });
  }
};



const getAllProducts = async (req,res)=>{
  try {
    const allProducts = await Product.find().populate('images');

    
    res.status(200).json(allProducts);


  } catch (error) {
    console.log(error)
  }
}
const modifieProductStatus = async (req, res) => {
  try {
    const id = req.body._id;
    const newStatus = req.body.status;
    
    
    const product = await Product.findById(id);

    
    if (!product) {
      return res.status(400).json({ message: 'No product found with the provided ID.' });
    }

   
    product.status = newStatus;

   
    await product.save();

    
    res.status(200).json({ message: 'Product status updated successfully', product });

  } catch (error) {
    console.error(error);
    
    res.status(500).json({ message: 'An error occurred while updating the product status.' });
  }
};

module.exports = {addNewProduct, getAllProducts, modifieProductStatus};