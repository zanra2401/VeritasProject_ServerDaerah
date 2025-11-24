const paniteraRepositori = require(__dirname + "/../repositories/paniteraRepo.js");
const baseService = require(__dirname + "./baseService.js");

const paniteraService = baseService(paniteraRepositori);

module.exports = paniteraService;