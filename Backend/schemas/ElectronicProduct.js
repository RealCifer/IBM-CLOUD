import mongoose from "mongoose";

const ElectronicProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ElectronicProduct = mongoose.model("ElectronicProduct", ElectronicProductSchema);
export default ElectronicProduct;
