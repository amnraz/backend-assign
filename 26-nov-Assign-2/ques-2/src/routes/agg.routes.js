const express = require("express");
const router = express.Router();
const ctrl = require("../controlers/agg.controller");

router.get("/total-by-customer", ctrl.totalByCustomer);
router.get("/orders-with-customers", ctrl.ordersWithCustomers);
router.get("/orders-above-500", ctrl.ordersAbove500);
router.get("/avg-per-customer", ctrl.avgPerCustomer);
router.get("/valid-orders", ctrl.validOrdersWithCustomer);

module.exports = router;
