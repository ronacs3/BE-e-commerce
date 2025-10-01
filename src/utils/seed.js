import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import bcrypt from 'bcryptjs';

dotenv.config();
const run = async () => {
  await connectDB();
  await User.deleteMany({});
  await Product.deleteMany({});

  const salt = await bcrypt.genSalt(10);
  const adminPass = await bcrypt.hash('admin123', salt);

  const admin = await User.create({ name: 'Admin', email: 'admin@example.com', password: adminPass, role: 'admin' });
  const p1 = await Product.create({ name: 'Sample Product 1', description: 'Sample', price: 100, stock: 10 });
  const p2 = await Product.create({ name: 'Sample Product 2', description: 'Sample', price: 200, stock: 5 });

  console.log('Seeded:', { admin: admin.email, products: [p1.name, p2.name] });
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
