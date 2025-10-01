import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import { createOrder, getOrder, listUserOrders, listAllOrders, updateOrderStatus } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/mine', protect, listUserOrders);
router.get('/:id', protect, getOrder);
router.get('/', protect, admin, listAllOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

export default router;
