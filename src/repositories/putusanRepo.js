// const putusan = require("../models/putusan");

const { Putusan, 
    Klasifikasi, 
    Hakim,
    Panitera,
    KataKunci,
    PenuntutUmum,
    Terdakwa
} = require(__dirname + "/../models");


module.exports = {
    getPutusanById: async (id) => {
        const putusan = await Putusan.findByPk(id, {
            include: [
                { model: Klasifikasi, as: "klasifikasi" },
                { model: Hakim, as: "hakim_ketua" },
                { model: Panitera, as: "panitera" },
                { model: PenuntutUmum, as: "penuntut_umum" },
                { model: KataKunci, as: "kata_kunci" },
                { model: PenuntutUmum, as: "penuntut_umum"},
                { model: Hakim, as: "hakim_anggota"},
                { model: Terdakwa, as: "terdakwa"}
            ]
        });

        return putusan; 
    },

    
}