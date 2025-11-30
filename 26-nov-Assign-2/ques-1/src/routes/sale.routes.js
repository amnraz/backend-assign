const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/sale.controller");

router.get("/category-total", ctrl.totalByCategory);
router.get("/month-wise", ctrl.monthWiseSales);
router.get("/top-product", ctrl.topProduct);
router.get("/average", ctrl.avgSale);
router.get("/count-per-month", ctrl.countPerMonth);
router.get("/region-total", ctrl.salesByRegion);
router.get("/top3-products", ctrl.top3Products);
router.get("/count-category", ctrl.countPerCategory);
router.get("/avg-region", ctrl.avgRegion);
router.get("/category-totals", ctrl.categoryTotals);

module.exports = router;
