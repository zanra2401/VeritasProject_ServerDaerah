const putusanRepo = require(__dirname + "/../repositories/putusanRepo.js");

module.exports = {
    getPutusanById: async (id) => {
        return await putusanRepo.getPutusanById(id);
    },

    createPutusan: async (putusan) => {
        
    }
}