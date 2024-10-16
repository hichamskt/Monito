const Dog = require('../models/dogModel');
const Image = require("../models/imageModel")
const fs = require('fs');
const path = require('path');


const addNewDog = async (req, res) => {
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
              type: 'Dog', 
              relatedId: null 
            });
            imageIds.push(newImage._id); 
          }
        
          const newDog = new Dog({
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

          const savedDog = await newDog.save();

          await Image.updateMany(
            { _id: { $in: imageIds } },
            { $set: { relatedId: savedDog._id } } 
          );

          return res.status(201).json({
            message: 'Product added successfully',
            success: true,
            savedDog
          });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'An error occurred while adding the dog.', error: error.message });
    }
}


const getAllDogs = async (req,res)=>{
  try {
    const allDogs = await Dog.find().populate('images');

    
    res.status(200).json(allDogs);


  } catch (error) {
    console.log(error)
  }
}

const getDogById = async (req,res)=>{

  try {
    const id = req.body._id;
    if(!id){
      return res.status(400).json({ message: 'there is no id' });
    }
    const dog = await Dog.findById(id).populate('images');

    if(!dog){
      return res.status(400).json({ message: 'no data with id ' });
    }

    return res.status(200).json({
      dog
    });
    
  } catch (error) {
    console.log(error)
  }
}

const deleteDogById = async (req, res) => {
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

  
    await Dog.findByIdAndDelete(id);

  
    return res.status(200).json({ message: 'Dog and related images deleted successfully.' });

  } catch (error) {
    console.error('Error deleting dog and images:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



const updateDog = async (req, res) => {
  try {
    const dogId = req.body._id;
    const fieldsToUpdate = [
      'name', 'sku', 'size', 'gender', 'category', 
      'price', 'color', 'vaccinated', 'dewormed', 
      'status', 'additionalInfo', 'birthDate', 
      'location', 'certified', 'microchip'
    ];

    const existingDog = await Dog.findById(dogId);
    if (!existingDog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== existingDog[field]) {
        existingDog[field] = req.body[field];
      }
    });

    // Delete existing images
    
    const images = await Image.find({ relatedId: dogId });
    await Promise.all(images.map(image => {
      const imagePath = path.join(image.url);
      return fs.promises.unlink(imagePath)
        .then(() => console.log(`Deleted image from filesystem: ${imagePath}`))
        .catch(err => console.error('Failed to delete image from filesystem:', imagePath, err));
    }));

    await Image.deleteMany({ relatedId: dogId });

    // Save new images
    const files = req.files;
    const newImages = await Promise.all(files.map(file => 
      Image.create({
        url: file.path,
        altText: file.originalname,
        type: 'Dog',
        relatedId: dogId
      })
    ));

    const updatedDog = await existingDog.save();

    return res.status(200).json({
      message: 'Dog updated successfully',
      success: true,
      updatedDog,
      newImages // Include new images in the response if needed
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the dog.', error: error.message });
  }
};








module.exports = {  addNewDog , getAllDogs ,getDogById , deleteDogById , updateDog};