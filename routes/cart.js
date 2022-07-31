import express from "express";
import {
  CreateCart,
  Deletecart,
  getcart,
  Updatecart,
  getALLCarts,
} from "../controllers/CartController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";

const router = express.Router();

//create
router.post("/", verifyTokenAndAuthorization, CreateCart);

//Update
router.put("/:id", verifyTokenAndAuthorization, Updatecart);

//Delete
router.delete("/:id", verifyTokenAndAuthorization, Deletecart);
//Get
router.get("/:usreid", verifyTokenAndAuthorization, getcart);

router.get("/", verifyTokenAndAdmin, getALLCarts);

export default router;
