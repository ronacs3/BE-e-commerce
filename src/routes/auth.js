import express from "express";
import { body, validationResult } from "express-validator";
import {
  register,
  login,
  profile,
  registerAdmin,
} from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/register",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return register(req, res);
  }
);

router.post(
  "/registerAdmin",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    return registerAdmin(req, res);
  }
);

router.post("/login", login);
router.get("/profile", protect, profile);

export default router;
