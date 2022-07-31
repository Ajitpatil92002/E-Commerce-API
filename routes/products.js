import express from "express";
import {
  CreateProduct,
  DeleteProduct,
  getProduct,
  getProducts,
  UpdateProduct,
} from "../controllers/ProductController.js";
import { verifyTokenAndAdmin } from "../middlewares/verifyToken.js";
import { upload } from "../utils/imageUpload.js";

const router = express.Router();

//create
router.post("/", upload.single("img"), verifyTokenAndAdmin, CreateProduct);

//Update
router.put("/:id", upload.single("img"), verifyTokenAndAdmin, UpdateProduct);

//Delete
router.delete("/:id", verifyTokenAndAdmin, DeleteProduct);
//Get
router.get("/:id", verifyTokenAndAdmin, getProduct);
router.get("/", verifyTokenAndAdmin, getProducts);

export default router;
