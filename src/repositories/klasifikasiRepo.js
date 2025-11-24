const klasifikasiModel = require(__dirname + "/../models/klasifikasi.js");
const baseRepo = requier(__dirname + "./baseRepository.js");

const klasifikasiRepository = baseRepo(klasifikasiModel);

module.exports = klasifikasiRepository;