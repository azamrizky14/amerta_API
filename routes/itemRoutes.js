const express = require("express");
const multer = require("multer");
const Item = require("../models/itemModels.js");
const router = express.Router();
const itemController = require("../controllers/itemController");
// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // cb(null, '../uploads/') // Destinasi diluar project api & front-end
        cb(null, './images/admin_logistik') // Destinasi didalam project back end
    },
    filename: function (req, file, cb) {
        // Rename the file to avoid conflicts
        cb(null, Date.now() + '-LOGISTIK-AMERTA-' + file.originalname)
    }
});
const upload = multer({ storage: storage })
// GET
router.get("/getAllItem/:domain/:deleted?", itemController.getMasterItem);

// POST
router.post("/createImage", upload.single('item_gambar'), itemController.createMasterItemGambar);


// update a product







module.exports = router;