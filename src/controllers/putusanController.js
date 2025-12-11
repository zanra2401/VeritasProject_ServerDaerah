'use-strict'

const { Putusan, Hakim, Panitera, KataKunci, PenuntutUmum, Terdakwa } = require(__dirname + "/../models");
const { Op } = require('sequelize');

module.exports = {
    // Get all Putusan with pagination
    getAllPutusan: async (req, res) => {
        try {
            const { page = 1, limit = 10, search = '', year = '' } = req.query;
            const offset = (page - 1) * limit;
            
            const where = {};
            if (search) {
                where[Op.or] = [
                    { nomor: { [Op.like]: `%${search}%` } },
                    { amar_putusan: { [Op.like]: `%${search}%` } }
                ];
            }
            if (year) {
                where.tahun = parseInt(year);
            }
            
            const { count, rows } = await Putusan.findAndCountAll({
                where,
                include: [
                    { model: Hakim, as: "hakim_ketua" },
                    { model: Panitera, as: "panitera" },
                    { model: PenuntutUmum, as: "penuntut_umum" },
                    { model: KataKunci, as: "kata_kunci" }
                ],
                limit: parseInt(limit),
                offset: offset,
                order: [['created_at', 'DESC']]
            });
            
            return res.status(200).type("json").json({
                "error": false,
                "message": "Success",
                "data": rows,
                "pagination": {
                    "total": count,
                    "page": parseInt(page),
                    "limit": parseInt(limit),
                    "pages": Math.ceil(count / limit)
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Get Putusan by ID
    getPutusanById: async (req, res) => {
        const {id} = req.params;
        try {
            const putusan = await Putusan.findByPk(id, {
                include: [
                    { model: Hakim, as: "hakim_ketua" },
                    { model: Panitera, as: "panitera" },
                    { model: PenuntutUmum, as: "penuntut_umum" },
                    { model: KataKunci, as: "kata_kunci" },
                    { model: Hakim, as: "hakim_anggota" },
                    { model: Terdakwa, as: "terdakwa" }
                ]
            });
            
            if (!putusan) {
                return res.status(404).type("json").json({
                    "error": true,
                    "message": "Putusan not found",
                    "data": []
                });
            }
            
            return res.status(200).type("json").json({
                "error": false,
                "message": "Request Success",
                "data": putusan
            });
        } catch (err) {
            console.log(err);
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Create Putusan
    createPutusan: async (req, res) => {
        try {
            const payload = req.body;
            const putusan = await Putusan.create(payload);
            
            return res.status(201).type("json").json({
                "error": false,
                "message": "Putusan created successfully",
                "data": putusan
            });
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Update Putusan
    updatePutusan: async (req, res) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            
            const putusan = await Putusan.findByPk(id);
            if (!putusan) {
                return res.status(404).type("json").json({
                    "error": true,
                    "message": "Putusan not found",
                    "data": []
                });
            }
            
            await putusan.update(payload);
            
            return res.status(200).type("json").json({
                "error": false,
                "message": "Putusan updated successfully",
                "data": putusan
            });
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    },

    // Delete Putusan
    deletePutusan: async (req, res) => {
        try {
            const { id } = req.params;
            
            const putusan = await Putusan.findByPk(id);
            if (!putusan) {
                return res.status(404).type("json").json({
                    "error": true,
                    "message": "Putusan not found",
                    "data": []
                });
            }
            
            await putusan.destroy();
            
            return res.status(200).type("json").json({
                "error": false,
                "message": "Putusan deleted successfully",
                "data": []
            });
        } catch (err) {
            return res.status(500).type("json").json({
                "error": true,
                "message": "Server Error",
                "data": []
            });
        }
    }
}