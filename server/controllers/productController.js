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
      sizeUnit,
      size
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
      size,
      sizeUnit,
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




const getProductById = async (req,res)=>{

  try {
    const { productid } = req.params;
    
   
    if(!productid){
      return res.status(400).json({ message: 'there is no id' });
    }
    const product = await Product.findById(productid).populate('images');

    if(!product){
      return res.status(400).json({ message: 'no data with id ' });
    }

    return res.status(200).json({
      product
    });
    
  } catch (error) {
    console.log(error)
  }
}

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


const updateProduct = async (req, res) => {
  try {
    const productId = req.body._id;
    

    const fieldsToUpdate = [
      'porductName',
      'productCategory',
      'productSku',
      'purchasePrice',
      'sellingPrice',
      'quantity',
      'unite',
      'size',
      "sizeUnit"
    ];

    // Find existing product
    const existingPrd = await Product.findById(productId);
    if (!existingPrd) {
      return res.status(404).json({ message: 'prd not found' });
    }

   
    // Update fields if changed
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== existingPrd[field]) {
        existingPrd[field] = req.body[field];
      }
    });

    // Fetch existing images related to the dog
    const images = await Image.find({ relatedId: productId  });
    const imagsId = [];

    // Delete images that are not in the req.body.imagesarr
    await Promise.all(
      images.map(async (image) => {
        const imagePath = path.join(image.url);

        // If the image URL is not included in req.body.imagesarr, delete it
        if (!req.body.imagesarr || !req.body.imagesarr.includes(image.url)) {
          imagsId.push(image._id); // Collect image IDs for database deletion
          try {
            await fs.promises.unlink(imagePath); // Delete from filesystem
            console.log(`Deleted image from filesystem: ${imagePath}`);
          } catch (err) {
            console.error('Failed to delete image from filesystem:', imagePath, err);
          }
        }
      })
    );

    // Delete image records from the database
    await Promise.all(
      imagsId.map(async (imagId) => {
        try {
          await Image.findByIdAndDelete(imagId);
          console.log(`Deleted image from database: ${imagId}`);
        } catch (err) {
          console.error(`Failed to delete image from database: ${imagId}`, err);
        }
      })
    );


    // Save new images (if any are uploaded)
const newImgsId = []
    const files = req.files || [];
    for (const file of files) {
      const newimg =  await Image.create({
        url: file.path, 
        altText: file.originalname, 
        type: 'Product', 
        relatedId: productId
      });
      newImgsId.push(newimg._id);
    }

    //save new images id 
    const idOfNotDeletedImages = []; 
    
   
    existingPrd.images.forEach(id => {
      

      if (!imagsId.includes(id)) {
        idOfNotDeletedImages.push(id);
      }
    });

    

    existingPrd.images = [...idOfNotDeletedImages, ...newImgsId];
    
    // Save updated product
    const updatedPrd = await existingPrd.save();

    return res.status(200).json({
      message: 'Product updated successfully',
      success: true,
      updatedPrd,
       // Return new images if any were added
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the prd.',
      error: error.message
    });
  }
};
const deleteProductById = async (req, res) => {
  try {
    const id = req.body._id;

    if (!id) {
      return res.status(400).json({ message: 'No ID provided.' });
    }

    
    const images = await Image.find({ relatedId: id });

    
    if (!images || images.length === 0) {
      return res.status(404).json({ message: 'No related images found.' });
    }

    

    images.forEach((image) => {
      const imagePath = path.join(image.url);
      console.log(imagePath)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Failed to delete image from filesystem:', imagePath, err);
        } else {
          console.log(`Deleted image from filesystem: ${imagePath}`);
        }
      });
    });
    
    await Image.deleteMany({ relatedId: id });

  
    await Product.findByIdAndDelete(id);

  
    return res.status(200).json({ message: 'Dog and related images deleted successfully.' });

  } catch (error) {
    console.error('Error deleting dog and images:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {addNewProduct, getAllProducts, modifieProductStatus , updateProduct, deleteProductById , getProductById};