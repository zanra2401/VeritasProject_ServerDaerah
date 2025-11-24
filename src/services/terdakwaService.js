const terdakwaRepo = require(__dirname + "/../repositories/terdakwaRepo.js");
const baseService = require(__dirname + "./baseService.js");

const terdakwaService = baseService(terdakwaRepo);

module.exports = terdakwaService;