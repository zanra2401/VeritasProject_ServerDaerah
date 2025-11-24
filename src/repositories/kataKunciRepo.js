const kataKunciModel = require(__dirname + "/../models/kataKunci.js");
const baseRepo = requier(__dirname + "./baseRepository.js");

const kataKunciRepository = baseRepo(kataKunciModel);


module.exports = kataKunciRepository;