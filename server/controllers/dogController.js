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
            message: 'dog added successfully',
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
    const { id } = req.params;
   
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
const getDogsByBreed = async (req, res) => {
  try {
    const { breed } = req.params;

    console.log(`Requested breed: ${breed}`);
    if (!breed) {
      return res.status(400).json({ message: 'Breed parameter is required.' });
    }

    const dogs = await Dog.find({ category: breed }).populate('images');

    if (!dogs ) {
      return res.status(404).json({ message: `No dogs found for breed: ${breed}` });
    }

    return res.status(200).json({ dogs });
  } catch (error) {
    console.error('Error fetching dogs by breed:', error);
    return res.status(500).json({ message: 'An error occurred while fetching data.' });
  }
};


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
    const dogId = req.body.id;
    

    const fieldsToUpdate = [
      'name', 'sku', 'size', 'gender', 'category',
      'price', 'color', 'vaccinated', 'dewormed',
      'status', 'additionalInfo', 'birthDate',
      'location', 'certified', 'microchip'
    ];

    // Find existing dog
    const existingDog = await Dog.findById(dogId);
    if (!existingDog) {
      return res.status(404).json({ message: 'Dog not found' });
    }

    console.log(req.body.category);
    // Update fields if changed
    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined && req.body[field] !== existingDog[field]) {
        existingDog[field] = req.body[field];
      }
    });

    // Fetch existing images related to the dog
    const images = await Image.find({ relatedId: dogId });
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
        type: 'Dog', 
        relatedId: dogId 
      });
      newImgsId.push(newimg._id);
    }

    //save new images id 
    const idOfNotDeletedImages = []; 
    
   
    existingDog.images.forEach(id => {
      

      if (!imagsId.includes(id)) {
        idOfNotDeletedImages.push(id);
      }
    });

    

    existingDog.images = [...idOfNotDeletedImages, ...newImgsId];
    
    // Save updated dog
    const updatedDog = await existingDog.save();

    return res.status(200).json({
      message: 'Dog updated successfully',
      success: true,
      updatedDog,
       // Return new images if any were added
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'An error occurred while updating the dog.',
      error: error.message
    });
  }
};









module.exports = {  addNewDog , getAllDogs ,getDogById , deleteDogById , updateDog , getDogsByBreed};