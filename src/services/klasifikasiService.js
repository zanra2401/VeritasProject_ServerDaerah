const klasifikasiRepositori = require(__dirname + "/../repositories/klasifikasiRepo.js");
const baseService = require(__dirname + "./baseService.js");

const klasifikasiService = baseService(klasifikasiRepositori);

module.exports = klasifikasiService;