const penuntutUmumModel = require(__dirname + "/../models/penuntutUmum.js");
const baseRepository = require(__dirname + "./baseRepositoru.js");

const penuntutUmumRepository = baseRepository(penuntutUmumModel);

model.exports = penuntutUmumRepository;