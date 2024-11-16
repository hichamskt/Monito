const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    
    porductName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productSku: {
        type: String,
        required: true,
        unique: true
    },
    
    purchasePrice: {
        type: Number,
        required: true
    },
    sellingPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unite: {
        type: String,
        required: true
    },
    
    size: {
        type: String,
       
    },
    sizeUnit: {
        type: String,
        
    },
    status: {
        type: String,
        enum: ['Sold', 'Available'], 
        default: 'Available'
    },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;