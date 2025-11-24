const kataKunciRepository = require(__dirname + "/../repositories/kataKunciRepo.js");
const baseService = require(__dirname + "./baseService.js");

const kataKunciService = baseService(kataKunciRepository);

module.exports = kataKunciService;