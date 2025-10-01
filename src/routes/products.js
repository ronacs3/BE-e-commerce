import express from 'express';
import multer from 'multer';
import { protect, admin } from '../middleware/auth.js';
import { listProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// multer setup (store in /src/uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'src/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', listProducts);
router.get('/:id', getProduct);
router.post('/', protect, admin, upload.array('images', 5), createProduct);
router.put('/:id', protect, admin, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
