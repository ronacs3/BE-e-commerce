import Product from "../models/Product.js";

export const listProducts = async (req, res) => {
  try {
    // Lấy query params
    const { search, page = 1, limit = 10 } = req.query;

    // Điều kiện tìm kiếm
    const query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" }; // Tìm theo tên, không phân biệt hoa thường
    }

    // Đếm tổng số sản phẩm
    const total = await Product.countDocuments(query);

    // Phân trang
    const products = await Product.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const images = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const p = await Product.create({
      name,
      description,
      price: Number(price),
      stock: Number(stock || 0),
      category,
      images,
    });
    res.status(201).json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    if (req.files && req.files.length) {
      updates.images = (req.files || []).map((f) => `/uploads/${f.filename}`);
    }
    const p = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
