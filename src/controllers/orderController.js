import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const { items, address } = req.body; // items: [{ product: id, qty }]
    let total = 0;
    const detailedItems = [];
    for (const it of items) {
      const p = await Product.findById(it.product);
      if (!p) return res.status(400).json({ message: 'Product not found' });
      const price = p.price;
      total += price * Number(it.qty);
      detailedItems.push({ product: p._id, qty: Number(it.qty), price });
    }
    const order = await Order.create({ user: req.user._id, items: detailedItems, total, address });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email').populate('items.product');
    if (!order) return res.status(404).json({ message: 'Not found' });
    // only owner or admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const listAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email');
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Not found' });
    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
