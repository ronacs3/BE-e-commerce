import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, // tên category không trùng nhau
    trim: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String, // có thể lưu URL ảnh đại diện cho category
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Category", categorySchema);
