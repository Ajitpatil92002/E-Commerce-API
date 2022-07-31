import Cart from "../models/Cart.js";

export const CreateCart = async (req, res) => {
  const newcart = new Cart(req.body);
  try {
    const savedcart = await newcart.save();
    res.status(200).json(savedcart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Updatecart = async (req, res) => {
  try {
    const Updatecart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(Updatecart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Deletecart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getcart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.usreid });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getALLCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};
