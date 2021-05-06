const router = require("express").Router();
const Product = require("../models/Product");
const upload = require("../middlewares/upload-photo")

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let { title, description, price, stockQuantity } = req.body;
    let { filename } = req.file;
    let product = new Product({title, description, price, stockQuantity,photo:filename});
    await product.save();
    res.json({ status: true, message: "Successfully saved" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

});

module.exports = router;
