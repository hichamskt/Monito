const mongoose = require('mongoose');
//const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Please provide your email!'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      //minlength: 8,
      //select: false
    },
    role: {
      type: String,
      required: [true, 'Please provide a role'],
      
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const User = mongoose.model('User', userSchema);

module.exports = User;