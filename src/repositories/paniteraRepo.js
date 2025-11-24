const paniteraModel = require(__dirname + "/../models/panitera.js");
const baseRepository = require(__dirname + "./baseRepositoru.js");

const paniteraRepository = baseRepository(paniteraModel);

model.exports = paniteraRepository;