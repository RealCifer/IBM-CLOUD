import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  productImageUrl: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;
