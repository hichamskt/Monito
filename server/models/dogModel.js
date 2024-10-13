const mongoose = require('mongoose');
//const validator = require('validator');

const dogSchema = new mongoose.Schema(
  {
    breed: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    vaccinated: {
        type: Boolean,
        required: true
    },
    dewormed: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        enum: ['Sold', 'Available'], 
        default: 'Available'
    },
    additionalInfo: {
        type: [String],
        default: []
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;