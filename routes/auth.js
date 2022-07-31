import express from "express";
import { register_post, login_post } from "../controllers/AuthController.js";

const router = express.Router();

router.post("/register", register_post);
router.post("/login", login_post);

export default router;
