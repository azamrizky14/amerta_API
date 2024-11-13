const mongoose = require("mongoose");

const Tr_teknisSchema = mongoose.Schema({
    Tr_teknis_tanggal: {
        type: String,
        required: [true, "Tanggal tolong jangan dikosongi"],
    },
    Tr_teknis_pelanggan_id: {
        type: String,
        required: [true, "ID tolong jangan dikosongi"],
    },
    Tr_teknis_pelanggan_nama: {
        type: String,
        required: [true, "Nama tolong jangan dikosongi"],
    },
    Tr_teknis_status: {
        type: String,
        required: [true, "Status tolong jangan dikosongi"]
    },
    // New field for images
    Tr_teknis_images: {
        type: Map,
        of: String, // The key will be the image field name, and the value will be the filename
    },
    Tr_teknis_trouble: {
        type: String,
    },
    Tr_teknis_action: {
        type: String,
    },
    Tr_teknis_pelanggan_server: {
        type: String,
    },
    Tr_teknis_keterangan: {
        type: String
    },
    Tr_teknis_domain: {
        type: String,
        required: [true, "Domain tolong jangan dikosongi"],
    },
    Tr_teknis_created: {
        type: String,
        required: [true, "Created tolong jangan dikosongi"],
    },
    Tr_teknis_user_updated: {
        type: String,
        required: [true, "User tolong jangan dikosongi"],
    },
    Tr_teknis_jenis: {
        type: String,
        enum: ["PSB", "MT", "INFRA"],
        required: [true,  "Jenis tolong jangan dikosongi"]
    },
    Tr_teknis_material_terpakai: {
        type: Array,
    }
}, {
    timestamps: true,
});


const Tr_teknis = mongoose.model("Tr_teknis", Tr_teknisSchema);

module.exports = Tr_teknis;