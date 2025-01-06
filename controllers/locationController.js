const Location = require("../models/locationModels.js");
// GET BY DOMAIN
const getMasterLocation = async (req, res) => {
  try {
    const { domain, deleted } = req.params;

    // Create a filter object dynamicallysz
    const filter = { companyName: domain };  

    // Add optional filters if provided
    if (deleted) filter.lokasi_deleted = deleted;

    const MasterLocation = await Location.find(filter);
    res.status(200).json(MasterLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// FIND ONE BY ID
const getMasterLocationId = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = {_id: id}

    const MasterLocation = await Location.findById(filter);
    res.status(200).json(MasterLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE 
const createMasterLocation = async (req, res) => {
  try {
    const MasterLocation = await Location.create(req.body);
    res.status(200).json(MasterLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMasterLocation,
  getMasterLocationId,
  createMasterLocation
};
