const penuntutUmumRepo = require(__dirname + "/../repositories/penuntutUmumRepo.js");
const baseService = require(__dirname + "./baseService.js");

const penuntutUmumService = baseService(penuntutUmumRepo);

module.exports = penuntutUmumService;