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
    const id = req.body._id;
    const {
      name,
      sku,
      size,
      gender,
      category,
      price,
      color,
      vaccinated,
      dewormed,
      status,
      additionalInfo,
      birthDate,
      location,
      certified,
      microchip,

    } = req.body;

    const files = req.files; 
    const existingDog = await Dog.findById(dogId); 

    if (!existingDog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    
    if (name !== undefined && name !== existingDog.name) existingDog.name = name;
    if (sku !== undefined && sku !== existingDog.sku) existingDog.sku = sku;
    if (size !== undefined && size !== existingDog.size) existingDog.size = size;
    if (gender !== undefined && gender !== existingDog.gender) existingDog.gender = gender;
    if (category !== undefined && category !== existingDog.category) existingDog.category = category;
    if (price !== undefined && price !== existingDog.price) existingDog.price = price;
    if (color !== undefined && color !== existingDog.color) existingDog.color = color;
    if (vaccinated !== undefined && vaccinated !== existingDog.vaccinated) existingDog.vaccinated = vaccinated;
    if (dewormed !== undefined && dewormed !== existingDog.dewormed) existingDog.dewormed = dewormed;
    if (status !== undefined && status !== existingDog.status) existingDog.status = status;
    if (additionalInfo !== undefined && additionalInfo !== existingDog.additionalInfo) existingDog.additionalInfo = additionalInfo;
    if (birthDate !== undefined && birthDate !== existingDog.birthDate) existingDog.birthDate = birthDate;
    if (location !== undefined && location !== existingDog.location) existingDog.location = location;
    if (certified !== undefined && certified !== existingDog.certified) existingDog.certified = certified;
    if (microchip !== undefined && microchip !== existingDog.microchip) existingDog.microchip = microchip;

    // Get existing image IDs to check against
    const existingImageIds = existingDog.images.map(image => image.toString());

    // Process uploaded files
    if (files && files.length > 0) {
      for (const file of files) {
        // Only add new images if they don't already exist
        if (!existingImageIds.includes(file.filename)) {
          const newImage = await Image.create({
            url: file.path,
            altText: file.originalname,
            type: 'Dog',
            relatedId: null,
          });
          existingDog.images.push(newImage._id); // Add new image ID to existing images
        }
      }
    }

    // Save the updated dog entry
    const updatedDog = await existingDog.save();

    // Update the related images to link them to the updated dog entry
    await Image.updateMany(
      { _id: { $in: existingDog.images } },
      { $set: { relatedId: updatedDog._id } }
    );

    return res.status(200).json({
      message: 'Dog updated successfully',
      success: true,
      updatedDog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while updating the dog.', error: error.message });
  }
};







module.exports = {  addNewDog , getAllDogs ,getDogById , deleteDogById , updateDog};