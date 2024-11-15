const Tr_teknis = require("../models/Tr_teknis.model");

// GET BY DOMAIN
const getTrTeknis = async (req, res) => {
    try {
        const { domain, deleted, type } = req.params;

        // Create a filter object dynamically
        const filter = { Tr_teknis_domain: domain };

        // Add optional filters if provided
        if (deleted) filter.Tr_teknis_deleted = deleted;
        if (type) filter.Tr_teknis_jenis = type;

        // Fetch the data based on the dynamic filter
        const TrTeknis = await Tr_teknis.find(filter);

        // Check if any data was found
        if (TrTeknis.length > 0) {
            return res.status(200).json(TrTeknis);
        } else {
            return res.status(404).json({ message: "DATA KOSONG" });
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return res.status(500).json({ message: error.message });
    }
};


// FIND ONE BY ID
const getTrTeknisById = async(req, res) => {
    try {
        const { id } = req.params;
        const TrTeknis = await Tr_teknis.findById(id);
        res.status(200).json(TrTeknis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// CREATE 
const createTrTeknis = async(req, res) => {
    try {
        const TrTeknis = await Tr_teknis.create(req.body);
        res.status(200).json(TrTeknis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// CREATE wiht gambar 
// const createTrTeknisGambar = async(req, res) => {
//     try {
//         // const TrTeknisBeforeNames = req.files['Tr_teknis_before'].map(file => file.filename);
//         // const TrTeknisAfterNames = req.files['Tr_teknis_after'][0].filename;
//         const {...dynamicFields } = req.body;
//         const {
//             Tr_teknis_evident_progress,
//             Tr_teknis_evident_redaman_odp_depan,
//             Tr_teknis_evident_redaman_odp_dalam,
//             Tr_teknis_evident_redaman_ont_depan,
//             Tr_teknis_evident_redaman_ont_belakang,
//             Tr_teknis_evident_adaptor,
//             Tr_teknis_evident_speed_test,
//             Tr_teknis_evident_pelanggan_dengan_pelanggan,
//             Tr_teknis_evident_pelanggan_depan_rumah,
//             Tr_teknis_evident_marking_dc_start,
//             Tr_teknis_evident_marking_dc_end,
//             Tr_teknis_evident_review_google,
//             Tr_teknis_evident_material_terpakai
//         } = req.files
//         const newData = new Tr_teknis({
//             ...dynamicFields,
//             Tr_teknis_evident_progress: Tr_teknis_evident_progress[0].filename,
//             Tr_teknis_evident_redaman_odp_depan: Tr_teknis_evident_redaman_odp_depan[0].filename,
//             Tr_teknis_evident_redaman_odp_dalam: Tr_teknis_evident_redaman_odp_dalam[0].filename,
//             Tr_teknis_evident_redaman_ont_depan: Tr_teknis_evident_redaman_ont_depan[0].filename,
//             Tr_teknis_evident_redaman_ont_belakang: Tr_teknis_evident_redaman_ont_belakang[0].filename,
//             Tr_teknis_evident_adaptor: Tr_teknis_evident_adaptor[0].filename,
//             Tr_teknis_evident_speed_test: Tr_teknis_evident_speed_test[0].filename,
//             Tr_teknis_evident_pelanggan_dengan_pelanggan: Tr_teknis_evident_pelanggan_dengan_pelanggan[0].filename,
//             Tr_teknis_evident_pelanggan_depan_rumah: Tr_teknis_evident_pelanggan_depan_rumah[0].filename,
//             Tr_teknis_evident_marking_dc_start: Tr_teknis_evident_marking_dc_start[0].filename,
//             Tr_teknis_evident_marking_dc_end: Tr_teknis_evident_marking_dc_end[0].filename,
//             Tr_teknis_evident_review_google: Tr_teknis_evident_review_google[0].filename,
//             Tr_teknis_evident_material_terpakai: Tr_teknis_evident_material_terpakai[0].filename
//         })
//         await newData.save()
//             // const TrTeknisBeforeImages = 
//         res.status(201).json({ message: 'Gambar sudah terupload' })
//     } catch (error) {
//         console.error('Gagal menyimpan data', error);
//         res.status(500).json({ message: error.message })
//     }
// }
const createTrTeknisGambar = async (req, res) => {
    try {
        const { Tr_teknis_jenis, ...dynamicFields } = req.body;

        // Define image fields based on Tr_teknis_jenis
        const imageFieldMapping = {
            PSB: [
                'Tr_teknis_evident_progress',
                'Tr_teknis_evident_odp_depan',
                'Tr_teknis_evident_odp_dalam',
                'Tr_teknis_evident_redaman_ont',
                'Tr_teknis_evident_redaman_odp',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end',
                'Tr_teknis_evident_kertas_psb',
                'Tr_teknis_evident_review_google',
                'Tr_teknis_evident_speed_test',
                'Tr_teknis_evident_pelanggan_dengan_pelanggan',
                'Tr_teknis_evident_pelanggan_depan_rumah'
            ],
            MT: [
                'Tr_teknis_redaman_sebelum',
                'Tr_teknis_evident_kendala_1',
                'Tr_teknis_evident_kendala_2',
                'Tr_teknis_evident_kendala_3',
                'Tr_teknis_evident_proses_sambung',
                'Tr_teknis_redaman_sesudah',
                'Tr_teknis_redaman_out_odp',
                'Tr_teknis_redaman_pelanggan',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end'
            ],
            INFRA: [
                'Tr_teknis_redaman_sebelum',
                'Tr_teknis_evident_kendala_1',
                'Tr_teknis_evident_kendala_2',
                'Tr_teknis_evident_kendala_3',
                'Tr_teknis_evident_proses_sambung',
                'Tr_teknis_redaman_sesudah',
                'Tr_teknis_redaman_out_odp',
                'Tr_teknis_redaman_pelanggan',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end'
            ]
        };

        const imageFields = imageFieldMapping[Tr_teknis_jenis];
        if (!imageFields) {
            return res.status(400).json({ message: "Invalid Tr_teknis_jenis value" });
        }

        // Initialize the Tr_teknis_images object with default empty strings
        const Tr_teknis_images = Object.fromEntries(
            imageFields.map(field => [field, ""])
        );

        // Populate Tr_teknis_images based on uploaded files
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const { fieldname, filename } = file;
                if (imageFields.includes(fieldname)) {
                    Tr_teknis_images[fieldname] = filename;
                }
            });
        }

        // Parse Tr_teknis_material_terpakai if it exists
        let materialTerpakai = [];
        if (dynamicFields.Tr_teknis_material_terpakai) {
            materialTerpakai = JSON.parse(dynamicFields.Tr_teknis_material_terpakai);
        }

        // Create a new Tr_teknis document
        const newData = new Tr_teknis({
            ...dynamicFields,
            Tr_teknis_jenis,
            Tr_teknis_images,
            Tr_teknis_material_terpakai: materialTerpakai
        });

        await newData.save();
        res.status(201).json({ message: 'Data created successfully with images if provided', newData });

    } catch (error) {
        console.error('Failed to save data:', error);
        res.status(500).json({ message: error.message });
    }
};

const updateTrTeknisGambar = async (req, res) => {
    try {
        const { _id, Tr_teknis_jenis, ...dynamicFields } = req.body;

        // Define image fields based on Tr_teknis_jenis
        const imageFieldMapping = {
            PSB: [
                'Tr_teknis_evident_progress',
                'Tr_teknis_evident_odp_depan',
                'Tr_teknis_evident_odp_dalam',
                'Tr_teknis_evident_redaman_ont',
                'Tr_teknis_evident_redaman_odp',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end',
                'Tr_teknis_evident_kertas_psb',
                'Tr_teknis_evident_review_google',
                'Tr_teknis_evident_speed_test',
                'Tr_teknis_evident_pelanggan_dengan_pelanggan',
                'Tr_teknis_evident_pelanggan_depan_rumah'
            ],
            MT: [
                'Tr_teknis_redaman_sebelum',
                'Tr_teknis_evident_kendala_1',
                'Tr_teknis_evident_kendala_2',
                'Tr_teknis_evident_kendala_3',
                'Tr_teknis_evident_proses_sambung',
                'Tr_teknis_redaman_sesudah',
                'Tr_teknis_redaman_out_odp',
                'Tr_teknis_redaman_pelanggan',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end'
            ],
            INFRA: [
                'Tr_teknis_redaman_sebelum',
                'Tr_teknis_evident_kendala_1',
                'Tr_teknis_evident_kendala_2',
                'Tr_teknis_evident_kendala_3',
                'Tr_teknis_evident_proses_sambung',
                'Tr_teknis_redaman_sesudah',
                'Tr_teknis_redaman_out_odp',
                'Tr_teknis_redaman_pelanggan',
                'Tr_teknis_evident_marking_dc_start',
                'Tr_teknis_evident_marking_dc_end'
            ]
        };

        const imageFields = imageFieldMapping[Tr_teknis_jenis];
        if (!imageFields) {
            return res.status(400).json({ message: "Invalid Tr_teknis_jenis value" });
        }

        // Fetch the existing document
        const existingData = await Tr_teknis.findById(_id);
        if (!existingData) {
            return res.status(404).json({ message: 'Data not found' });
        }

        // Convert the Map to an object
        const existingImages = Object.fromEntries(existingData.Tr_teknis_images);

        console.log('before', existingData);
        console.log('existing images', existingImages);

        // Merge the existing images with the updated ones
        const updatedImages = { ...existingImages };

        // Update images if new files are provided
        if (req.files && req.files.length > 0) {
            req.files.forEach(file => {
                const { fieldname, filename } = file;
                if (imageFields.includes(fieldname)) {
                    updatedImages[fieldname] = filename; // Only update the changed fields
                }
            });
        }

        // Merge the dynamic fields (non-image data) from the request
        const mergedData = {
            ...existingData.toObject(), // Include the current data
            ...dynamicFields, // Overwrite with the new dynamic fields
            Tr_teknis_images: updatedImages // Use the merged images object
        };

        // Parse Tr_teknis_material_terpakai if provided in dynamicFields
        if (dynamicFields.Tr_teknis_material_terpakai) {
            mergedData.Tr_teknis_material_terpakai = JSON.parse(dynamicFields.Tr_teknis_material_terpakai);
        }

        // Prepare the update object
        const updateData = {
            ...mergedData,
        };

        // Update the document using updateOne
        const updated = await Tr_teknis.updateOne(
            { _id },
            { $set: updateData },
            { new: true }
        );

        res.status(200).json({ message: 'Data updated successfully', updated });

    } catch (error) {
        console.error('Failed to update data:', error);
        res.status(500).json({ message: error.message });
    }
};

// Updated Logistik 
const updateTrTeknis = async(req, res) => {
    try {
        const { id } = req.params;

        const TrTeknis = await Tr_teknis.findByIdAndUpdate(id, req.body);

        if (!TrTeknis) {
            return res.status(404).json({ message: "TrTeknis not found" });
        }

        const updatedTrTeknis = await Tr_teknis.findById(id);
        res.status(200).json(updatedTrTeknis);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET BON PREFIX

const getBonPrefix = async (req, res) => {
    try {
      const { type, date } = req.params;
  
      // Buat prefix berdasarkan parameter `type` dan `date`
      const prefix = `${type}/${date}`;
  
      // Cari semua dokumen yang memiliki prefix sesuai di database
      const data = await Tr_teknis.find({
        Tr_teknis_logistik_id: { $regex: `^${prefix}` }
      });
  
      // Jika tidak ada data dengan prefix tersebut, kembalikan ID pertama dengan angka '001'
      if (data.length === 0) {
        return res.json({ nextId: `${prefix}/001` });
      }
  
      // Cari ID dengan angka terbesar dari hasil query
      const latestId = data.reduce((maxId, currentItem) => {
        const currentNumber = parseInt(currentItem.Tr_teknis_logistik_id.split("/").pop() || "0");
        const maxNumber = parseInt(maxId.split("/").pop() || "0");
        return currentNumber > maxNumber ? currentItem.Tr_teknis_logistik_id : maxId;
      }, "");
      
      // Ambil angka dari ID terbaru dan tambahkan 1
      const latestNumber = parseInt(latestId.split("/").pop() || "0");
      const nextNumber = (latestNumber + 1).toString().padStart(3, "0");
  
      // Gabungkan prefix dengan angka yang baru
      const nextId = `${prefix}/${nextNumber}`;
  
      // Kembalikan hasilnya
      res.json({ nextId });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  





module.exports = {
    getTrTeknis,
    getTrTeknisById,
    createTrTeknis,
    createTrTeknisGambar,
    updateTrTeknis,
    updateTrTeknisGambar,
    getBonPrefix
};