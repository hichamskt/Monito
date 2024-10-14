const Dog = require('../models/dogModel');
const Image = require("../models/imageModel")
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

    console.log(allDogs);
    res.status(200).json(allDogs);


  } catch (error) {
    console.log(error)
  }
}




module.exports = {  addNewDog , getAllDogs};