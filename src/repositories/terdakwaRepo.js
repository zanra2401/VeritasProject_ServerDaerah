const terdakwaModel = require(__dirname + "/../models/terdakwa.js");
const baseRepository = require(__dirname + "./baseRepositoru.js");

const terdakwaRepository = baseRepository(terdakwaModel);

model.exports = terdakwaRepository;