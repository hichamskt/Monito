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


module.exports = {addNewProduct};