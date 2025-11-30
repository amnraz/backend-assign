const Sale = require("../models/sale.model");

// 1. Total sales amount for each category
exports.totalByCategory = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$category", totalSales: { $sum: "$amount" } } }
  ]);
  res.json(data);
};

// 2. Month-wise total sales amount
exports.monthWiseSales = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: {
        _id: { $month: "$date" },
        totalSales: { $sum: "$amount" }
    }}
  ]);
  res.json(data);
};

// 3. Highest revenue product
exports.topProduct = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$product", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 1 }
  ]);
  res.json(data);
};

// 4. Average sale amount
exports.avgSale = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: null, avgAmount: { $avg: "$amount" } } }
  ]);
  res.json(data);
};

// 5. Count sales per month
exports.countPerMonth = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: { $month: "$date" }, count: { $sum: 1 } } }
  ]);
  res.json(data);
};

// 6. Total sales per region
exports.salesByRegion = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$region", total: { $sum: "$amount" } } }
  ]);
  res.json(data);
};

// 7. Top 3 highest revenue products
exports.top3Products = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$product", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
    { $limit: 3 }
  ]);
  res.json(data);
};

// 8. Total number of transactions per category
exports.countPerCategory = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } }
  ]);
  res.json(data);
};

// 9. Average sale amount per region
exports.avgRegion = async (req, res) => {
  const data = await Sale.aggregate([
    { $group: { _id: "$region", avgAmount: { $avg: "$amount" } } }
  ]);
  res.json(data);
};

// 10. Total sales for Electronics & Fashion separately
exports.categoryTotals = async (req, res) => {
  const data = await Sale.aggregate([
    { $match: { category: { $in: ["Electronics", "Fashion"] } } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);
  res.json(data);
};
