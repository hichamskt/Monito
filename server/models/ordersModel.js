const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  address: {
    type: String, required: true 
   
  },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true } 
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'Pending', enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'] },
  orderDate: { type: Date, default: Date.now },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
