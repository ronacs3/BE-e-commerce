import Category from "../models/Category.js";
import Product from "../models/Product.js";
// list categories with pagination and search
export const listCategories = async (req, res) => {
  try {
    // Lấy query params
    const { search, page = 1, limit = 10 } = req.query;

    // Điều kiện tìm kiếm
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Tìm theo tên, không phân biệt hoa thường
    }

    // Đếm tổng số sản phẩm
    const total = await Category.countDocuments(query);

    // Phân trang
    const categories = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // gắn thêm product cho từng category
    const categoriesWithProducts = await Promise.all(
      categories.map(async (cat) => {
        const products = await Product.find({ category: cat._id }).limit(50); // tránh quá tải
        return { ...cat.toObject(), products };
      })
    );
    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      categories: categoriesWithProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// tao category
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
