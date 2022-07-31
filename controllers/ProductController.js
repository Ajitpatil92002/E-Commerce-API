import Product from "../models/Product.js";

export const CreateProduct = async (req, res) => {

  req.body.img = "images/" + req.file.filename;
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    req.body.img = "images/" + req.file.filename;
    const UpdateProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(UpdateProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getProducts = async (req, res) => {
  try {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    if (qNew) {
      const product = await Product.find().sort({ createdAt: -1 }).limit(5);
      res.status(200).json(product);
    } else if (qCategory) {
      const product = await Product.find({
        category: qCategory,
      });
      res.status(200).json(product);
    } else {
      const product = await Product.find();
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};
