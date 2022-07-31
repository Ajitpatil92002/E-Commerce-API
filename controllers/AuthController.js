import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import handleError from "../utils/handleError.js";
dotenv.config();

export const register_post = async (req, res) => {
  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const Token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );
    res.status(201).json({ user: user._id, Token });
  } catch (err) {
    const errors = handleError(err);
    res.status(400).json({ errors });
  }
};
