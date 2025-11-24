const hakimRepo = require(__dirname + "/../repositories/hakimRepo.js");
const baseService = require(__dirname + "./baseService.js");

const hakimService = baseService(hakimRepo);

module.exports = hakimService;