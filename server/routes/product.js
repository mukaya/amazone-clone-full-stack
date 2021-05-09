const router = require("express").Router();
const Product = require("../models/Product");
const upload = require("../middlewares/upload-photo");

router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let {
      title,
      description,
      price,
      stockQuantity,
      ownerID,
      categoryID,
    } = req.body;
    let { filename } = req.file;
    let product = new Product({
      title,
      description,
      price,
      stockQuantity,
      photo: filename,
      owner:ownerID,
      category:categoryID,
    });
    await product.save();
    res.json({ status: true, message: "Successfully saved" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.get("/products", async (req, res) => {
  try {
    let products = await Product.find().populate("owner category").exec();
    return res.json({ status: true, products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id }).populate("owner category").exec();
    return res.json({ status: true, product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/products/:id", upload.single("photo"), async (req, res) => {
  try {
    let {
      title,
      description,
      price,
      stockQuantity,
      ownerID,
      categoryID,
    } = req.body;
    let { filename } = req.file;
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title,
          description,
          price,
          stockQuantity,
          photo: filename,
          owner:ownerID,
          category:categoryID,
        },
      },
      { upsert: true }
    );
    return res.json({ status: true, updateProduct: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    let deleteProduct = await Product.findOneAndDelete({ _id: req.params.id });
    if (deleteProduct) {
      return res.json({ status: true, message: "Successfully deleted" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
