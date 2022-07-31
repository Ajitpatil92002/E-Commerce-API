import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/orders.js";
import cartRoute from "./routes/cart.js";
import { upload } from "./utils/imageUpload.js";

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is Connected"))
  .catch((err) => console.log(err));

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file.fieldname);

  res.send("single File Upload success");
});

app.use(express.json());
app.use(express.static("./static"));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/cart", cartRoute);

app.listen(5000, () => console.log("Backend Running at port 5000"));
