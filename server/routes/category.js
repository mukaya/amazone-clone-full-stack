const router = require("express").Router()
const Category = require("../models/Category")

router.post("/category", async(req,res)=>{
    try {
        let {type} = req.body
        let category = new Category({type}) 
        await category.save()
        return  res.json({ status: true, message: "Successfully saved" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

})

router.get("/categories", async(req,res)=>{
    try {
        let categories = await Category.find()
        return  res.json({ status: true, categories }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router