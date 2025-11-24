const hakimModel = require(__dirname + "/../models/hakim.js");
const baseRepo = requier(__dirname + "./baseRepository.js");

const hakimRepository = baseRepo(hakimModel);


module.exports = hakimRepository;