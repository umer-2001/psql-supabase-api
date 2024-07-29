const express = require("express");
const router = express.Router();
const product = require("../controllers/productController");
const isAuthenticated = require("../middleware/auth");

//post
router.route("/add").post(product.addProduct);
router.route("/add-category").get(product.addCategory);

//get
router.route("/get-all").get(product.fetchProducts);
router.route("/get-categories").get(product.fetchCategory);

module.exports = router;
