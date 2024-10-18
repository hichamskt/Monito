const Cat = require('../models/catModel');
const Image = require("../models/imageModel")
const fs = require('fs');
const path = require('path');


const addNewCat = async (req, res) => {
    try {
        const {  name ,sku ,size,gender,category ,price,color ,vaccinated, dewormed,status,additionalInfo , birthDate,location,certified,microchip} = req.body;

        const imageIds = [];
        const files = req.files;
        
        
        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        
        for (const file of files) {
            const newImage = await Image.create({
              url: file.path, 
              altText: file.originalname, 
              type: 'Cat', 
              relatedId: null 
            });
            imageIds.push(newImage._id); 
          }
        
          const newCat = new Cat({
             name ,
             sku ,
             gender,
             size ,
             price,
             color ,
             category,
             vaccinated,
              dewormed,
              status,
              additionalInfo,
              location,
              certified,
              microchip,
              birthDate,
            images: imageIds,
            
          });

          const savedCat = await newCat.save();

          await Image.updateMany(
            { _id: { $in: imageIds } },
            { $set: { relatedId: savedCat._id } } 
          );

          return res.status(201).json({
            message: 'cat added successfully',
            success: true,
            savedCat
          });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while adding the Cat.', error: error.message });
    }
}


const getAllCats = async (req,res)=>{
  try {
    const allCats = await Cat.find().populate('images');

    
    res.status(200).json(allCats);


  } catch (error) {
    console.log(error)
  }
}

const getCatById = async (req,res)=>{

  try {
    const id = req.body._id;
    if(!id){
      return res.status(400).json({ message: 'there is no id' });
    }
    const cat = await Cat.findById(id).populate('images');

    if(!cat){
      return res.status(400).json({ message: 'no data with id ' });
    }

    return res.status(200).json({
      cat
    });
    
  } catch (error) {
    console.log(error)
  }
}

const deleteCatById = async (req, res) => {
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

  
    await Cat.findByIdAndDelete(id);

  
    return res.status(200).json({ message: 'Cat and related images deleted successfully.' });

  } catch (error) {
    console.error('Error deleting Cat and images:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



const updateCat = async (req, res) => {
  try {
    const catId = req.body.id;
    

    const fieldsToUpdate = [
      'name', 'sku', 'size', 'gender', 'category',
      'price', 'color', 'vaccinated', 'dewormed',
      'status', 'additionalInfo', 'birthDate',
      'location', 'certified', 'microchip'
    ];

   
    const existingCat = await Cat.findById(catId);
    if (!existingCat) {
      return res.status(404).json({ message: 'Cat not found' });
    }

   
  
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== existingCat[field]) {
        existingCat[field] = req.body[field];
      }
    });

   
    const images = await Image.find({ relatedId: catId });
    const imagsId = [];

    
    await Promise.all(
      images.map(async (image) => {
        const imagePath = path.join(image.url);

        
        if (!req.body.imagesarr || !req.body.imagesarr.includes(image.url)) {
          imagsId.push(image._id); 
          try {
            await fs.promises.unlink(imagePath); 
            console.log(`Deleted image from filesystem: ${imagePath}`);
          } catch (err) {
            console.error('Failed to delete image from filesystem:', imagePath, err);
          }
        }
      })
    );


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


    
const newImgsId = []
    const files = req.files || [];
    for (const file of files) {
      const newimg =  await Image.create({
        url: file.path, 
        altText: file.originalname, 
        type: 'Cat', 
        relatedId: catId 
      });
      newImgsId.push(newimg._id);
    }

    
    const idOfNotDeletedImages = []; 
    
   
    existingCat.images.forEach(id => {
      

      if (!imagsId.includes(id)) {
        idOfNotDeletedImages.push(id);
      }
    });

    

    existingCat.images = [...idOfNotDeletedImages, ...newImgsId];
    
    
    const updatedCat = await existingCat.save();

    return res.status(200).json({
      message: 'Cat updated successfully',
      success: true,
      updatedCat,
       
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the cat.',
      error: error.message
    });
  }
};









module.exports = {  addNewCat , getAllCats ,getCatById , deleteCatById , updateCat};