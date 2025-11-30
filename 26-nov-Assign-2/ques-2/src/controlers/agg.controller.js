const Customer = require("../models/customer.model");
const Order = require("../models/order.model");

// 1. Total amount spent by each customer
exports.totalByCustomer = async (req, res) => {
  const result = await Order.aggregate([
    { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } }
  ]);
  res.json(result);
};

// 2. Order details + customer info
exports.ordersWithCustomers = async (req, res) => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer"
      }
    }
  ]);
  res.json(result);
};

// 3. Orders where amount > 500
exports.ordersAbove500 = async (req, res) => {
  const result = await Order.aggregate([
    { $match: { amount: { $gt: 500 } } }
  ]);
  res.json(result);
};

// 4. Average order amount per customer
exports.avgPerCustomer = async (req, res) => {
  const result = await Order.aggregate([
    {
      $group: {
        _id: "$customerId",
        avgAmount: { $avg: "$amount" }
      }
    }
  ]);
  res.json(result);
};

// 5. Orders + customer details ensuring valid match
exports.validOrdersWithCustomer = async (req, res) => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer"
      }
    },
    { $match: { customer: { $ne: [] } } }
  ]);
  res.json(result);
};
