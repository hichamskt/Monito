const Dog = require('../models/dogModel');
const Image = require("../models/imageModel")

const addNewDog = async (req, res) => {
    try {
        const { breed, name ,sku ,genre ,size ,price,color ,vaccinated, dewormed,status,additionalInfo } = req.body;

        const imageIds = [];
        const files = req.files;

        if (!files || files.length === 0) {
            return res.status(400).json({ message: 'No files uploaded' });
        }
        for (const file of req.files) {
            const newImage = await Image.create({
              url: file.path, 
              altText: file.originalname, 
              type: 'Dog', 
              relatedId: null 
            });
            imageIds.push(newImage._id); 
          }
        
          const newDog = new Dog({
            breed,
             name ,
             sku ,
             genre ,
             size ,
             price,
             color ,
             vaccinated,
              dewormed,
              status,
              additionalInfo,
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
        console.log(error)
    }
}

module.exports = {  addNewDog};