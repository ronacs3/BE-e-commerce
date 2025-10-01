import express from "express";
import { protect, admin } from "../middleware/auth.js";
import {
  createCategory,
  listCategories,
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", listCategories);
router.post("/", protect, admin, createCategory);

export default router;
