import Order from "../models/order.js";

export const Createorder = async (req, res) => {
  const neworder = new Order(req.body);
  try {
    const savedorder = await neworder.save();
    res.status(200).json(savedorder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Updateorder = async (req, res) => {
  try {
    const Updateorder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(Updateorder);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const Deleteorder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getorder = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.usreid });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getALLorders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get Monthly Income

export const getOrderStats = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
};
