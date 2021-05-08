const router = require("express").Router()
const Owner = require("../models/Owner")
const upload = require("../middlewares/upload-photo")

router.post("/owners", upload.single('photo') ,async(req,res)=>{
    try {
        let {name,about} = req.body
        let {filename} = req.file
        let owner = new Owner({name,about,photo:filename})
        await owner.save()
        return res.json({success:true, message:"Successfully saved"})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.get("/owners", async(req,res)=>{
    try {
        let owners = await Owner.find()
        return  res.json({ status: true, owners }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router