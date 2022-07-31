import express from "express";
import {
  Createorder,
  Deleteorder,
  getorder,
  Updateorder,
  getALLorders,
  getOrderStats,
} from "../controllers/OrderControllers.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";

const router = express.Router();

//create
router.post("/", verifyTokenAndAuthorization, Createorder);

//Update
router.put("/:id", verifyTokenAndAdmin, Updateorder);

//Delete
router.delete("/:id", verifyTokenAndAdmin, Deleteorder);

//Get

router.get("/income", verifyTokenAndAdmin, getOrderStats);

router.get("/:usreid", verifyTokenAndAuthorization, getorder);

router.get("/", verifyTokenAndAdmin, getALLorders);

export default router;
