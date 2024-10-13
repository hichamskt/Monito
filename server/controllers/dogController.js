const Dog = require('../models/dogModel');
const Image = require("../models/imageModel")

const addNewDog = async (req, res) => {
    try {
        const { breed, name ,sku ,genre ,size ,price,color ,vaccinated, dewormed,status,additionalInfo ,files} = req.body;

        const imageIds = [];

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