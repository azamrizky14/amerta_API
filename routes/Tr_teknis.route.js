const express = require("express");
const multer = require("multer");

const Trteknis = require("../models/Tr_teknis.model.js");
const router = express.Router();
const {
    getTrTeknis,
    getTrTeknisById,
    createTrTeknis,
    createTrTeknisGambar,
    updateTrTeknisWorkOrderTerpakai,
    updateTrTeknis,
    updateTrTeknisGambar,
    getBonPrefix
} = require('../controllers/Tr_teknis.controller.js');
// / Multer storage configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, '../uploads/') // Destinasi diluar project api & front-end
        cb(null, './images/admin_logistik') // Destinasi didalam project front end
    },
    filename: function(req, file, cb) {
        // Rename the file to avoid conflicts
        cb(null, Date.now() + '-TEKNIS-AMERTA-' + file.originalname)
    }
});
const upload = multer({ storage: storage })
    // ----

router.get("/Trteknis/getdata/:domain/:deleted?/:type?/:status?", getTrTeknis);
router.get("/Trteknis/getbyid/:id", getTrTeknisById);
router.get("/Trteknis/getBonPrefix/:type/:date", getBonPrefix);

router.post("/Trteknis/create", createTrTeknis);
router.post("/Trteknis/createimage", upload.any(), createTrTeknisGambar);

// update a product
router.put("/Trteknis/updatebyid/:id", updateTrTeknis);
router.put("/Trteknis/updateImageById/:id", upload.any(), updateTrTeknisGambar);
router.put("/Trteknis/updateWorkOrder", upload.any(), updateTrTeknisWorkOrderTerpakai);





module.exports = router;