import express from "express";
import {
  UpdateUser,
  DeleteUser,
  getUser,
  getUsers,
  userStatus,
} from "../controllers/UserController.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middlewares/verifyToken.js";

const router = express.Router();

//Update
router.put("/:id", verifyTokenAndAuthorization, UpdateUser);
router.delete("/:id", verifyTokenAndAuthorization, DeleteUser);
router.get("/stats", verifyTokenAndAdmin, userStatus);
router.get("/:id", verifyTokenAndAdmin, getUser);
router.get("/", verifyTokenAndAdmin, getUsers);

export default router;
