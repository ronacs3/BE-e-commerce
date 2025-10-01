import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  price: { type: Number, required: true },
  images: [String],
  stock: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // tham chiếu tới Category
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
